import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import mongoose from "mongoose";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    
    // Check if we are using the SRV or Direct connection string
    // This is a bit of a hack to see which one reached the driver
    const connectionString = conn.connection.host;
    
    return NextResponse.json({
      status: "success",
      message: "Database connection established",
      details: {
        host: connectionString,
        readyState: mongoose.connection.readyState,
        dbName: conn.connection.db?.databaseName,
        // If it contains 'mongodb.net' and no dots before that, it's likely SRV cluster
        mode: connectionString.includes("mongodb.net") ? "SRV (Cluster)" : "Direct/Node",
      }
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: "error", 
        message: "Failed to connect to database",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

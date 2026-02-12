import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectToDatabase } from "@/lib/db";
import { generateUniquePseudonym } from "@/src/lib/pseudonym";
import User from "@/src/models/User";

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as {
      email?: string;
      password?: string;
    };

    const email = payload.email?.trim().toLowerCase();
    const password = payload.password ?? "";

    if (!email) {
      return NextResponse.json({ error: "E-mail is verplicht." }, { status: 400 });
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: "Wachtwoord moet minimaal 8 karakters zijn." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return NextResponse.json(
        { error: "Er bestaat al een account met dit e-mailadres." },
        { status: 409 }
      );
    }

    const pseudonym = await generateUniquePseudonym(async (candidate) => {
      const pseudonymExists = await User.exists({ pseudonym: candidate });
      return Boolean(pseudonymExists);
    });

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      pseudonym,
      passwordHash,
      role: "user",
    });

    return NextResponse.json(
      {
        message: "Account succesvol aangemaakt.",
        user: {
          id: user._id.toString(),
          email: user.email,
          pseudonym: user.pseudonym,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    const isSrvError =
      error instanceof Error &&
      (error.message.includes("querySrv") || error.message.includes("ECONNREFUSED"));

    if (isSrvError) {
      return NextResponse.json(
        {
          error:
            "Database niet bereikbaar via SRV-DNS. Voeg MONGODB_URI_DIRECT toe in .env.local of controleer netwerk/DNS.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Onverwachte serverfout bij registreren." },
      { status: 500 }
    );
  }
}

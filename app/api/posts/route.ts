import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import { fetchVerseByReference } from "@/src/lib/scriptura";
import Post from "@/src/models/Post";
import User from "@/src/models/User";

const FORBIDDEN_TERMS = [
  "kanker",
  "tering",
  "kut",
  "hoer",
  "slet",
  "nazi",
  "hitler",
  "hate",
  "racist",
  "kill",
];

type PostType = "GEBED" | "DANK" | "VRAAG";

function containsHatefulLanguage(content: string) {
  const normalized = content.toLowerCase();
  return FORBIDDEN_TERMS.some((term) => normalized.includes(term));
}

export async function GET(request: NextRequest) {
  await connectToDatabase();

  const type = request.nextUrl.searchParams.get("type") as PostType | "ALLES" | null;
  const filter: Record<string, unknown> = {
    status: { $in: ["APPROVED", "PENDING"] },
  };

  if (type && type !== "ALLES") {
    filter.type = type;
  }

  const posts = await Post.find(filter).sort({ createdAt: -1 }).limit(100).lean();

  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const body = (await request.json()) as {
    content?: string;
    type?: PostType;
    scriptureReference?: string;
  };

  const content = body.content?.trim();
  const type = body.type;
  const scriptureReference = body.scriptureReference?.trim() || undefined;

  if (!content || content.length > 500) {
    return NextResponse.json(
      { error: "Inhoud is verplicht en max 500 karakters." },
      { status: 400 }
    );
  }

  if (!type || !["GEBED", "DANK", "VRAAG"].includes(type)) {
    return NextResponse.json({ error: "Ongeldig type." }, { status: 400 });
  }

  await connectToDatabase();

  const dbUser = await User.findOne({ email: session.user.email }).lean();
  if (!dbUser) {
    return NextResponse.json({ error: "Gebruiker niet gevonden." }, { status: 404 });
  }

  // TODO: Connect OpenAI Moderation API here
  const autoRejected = containsHatefulLanguage(content);
  const scriptureText = scriptureReference
    ? await fetchVerseByReference(scriptureReference)
    : null;

  const post = await Post.create({
    content,
    type,
    authorId: dbUser._id,
    authorPseudonym: dbUser.pseudonym,
    scriptureReference: scriptureReference ?? null,
    scriptureText,
    status: autoRejected ? "REJECTED" : "PENDING",
  });

  return NextResponse.json({ post }, { status: 201 });
}

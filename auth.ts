import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import { connectToDatabase } from "@/lib/db";
import User from "@/src/models/User";

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      name: "E-mail en wachtwoord",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Wachtwoord", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials.email?.toString().trim().toLowerCase();
        const password = credentials.password?.toString() ?? "";

        if (!email || !password) {
          return null;
        }

        await connectToDatabase();

        const dbUser = await User.findOne({ email })
          .select("+passwordHash email pseudonym role image")
          .lean();

        if (!dbUser?.passwordHash) {
          return null;
        }

        const validPassword = await bcrypt.compare(password, dbUser.passwordHash);
        if (!validPassword) {
          return null;
        }

        return {
          id: dbUser._id.toString(),
          email: dbUser.email,
          name: dbUser.pseudonym,
          image: dbUser.image ?? undefined,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/inloggen",
    error: "/inloggen",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) {
        return false;
      }

      await connectToDatabase();

      const existingUser = await User.findOne({ email: user.email }).lean();

      if (account?.provider === "google") {
        if (!existingUser) {
          return `/registreren?email=${encodeURIComponent(user.email)}`;
        }

        return true;
      }

      if (!existingUser) {
        return false;
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.email) {
        return token;
      }

      await connectToDatabase();

      const dbUser = await User.findOne({ email: token.email }).lean();
      if (dbUser) {
        token.userId = dbUser._id.toString();
        token.pseudonym = dbUser.pseudonym;
        token.role = dbUser.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = typeof token.userId === "string" ? token.userId : "";
        session.user.pseudonym =
          typeof token.pseudonym === "string" ? token.pseudonym : "";
        session.user.role = (typeof token.role === "string" ? token.role : "user") as "user" | "admin";
        session.user.name =
          typeof token.pseudonym === "string" ? token.pseudonym : "Anonieme_Ziel";
      }

      return session;
    },
  },
  trustHost: true,
});

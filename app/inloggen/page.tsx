"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Flame, ShieldCheck, Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function InloggenPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCredentialsLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });

    if (result?.error) {
      setError("Inloggen mislukt. Controleer je gegevens.");
      setLoading(false);
    } else if (result?.ok) {
      window.location.href = "/";
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50/50 p-4 dark:bg-background">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border bg-card shadow-2xl lg:grid-cols-2">
        
        {/* Brand Panel */}
        <section className="relative hidden flex-col justify-between bg-zinc-50 p-10 lg:flex overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/5" />
          <div className="absolute top-0 right-0 -mr-20 -mt-20 size-80 rounded-full bg-primary/20 blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-60 rounded-full bg-primary/10 blur-2xl opacity-40" />
          
          <div className="relative z-10">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200">
              <Flame className="size-7 text-primary fill-current" />
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-zinc-900">Welkom terug</h1>
            <p className="mt-4 max-w-sm text-lg text-zinc-600 leading-relaxed">
              Jouw aanwezigheid versterkt onze gemeenschap. Log in om te bidden, te delen en anderen te bemoedigen.
            </p>
          </div>
          
          <div className="relative z-10 mt-auto rounded-3xl bg-white p-8 border border-zinc-100 shadow-sm">
            <div className="flex items-center gap-3 text-primary">
               <ShieldCheck className="size-6" />
               <span className="font-bold">Privacy gewaarborgd</span>
            </div>
            <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
               Je interacties zijn gekoppeld aan je anonieme pseudoniem, niet aan je echte naam. Veilig en vertrouwd.
            </p>
          </div>
        </section>

        {/* Login Form */}
        <section className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Inloggen</h2>
            <p className="mt-2 text-muted-foreground">
              Voor toegang tot je persoonlijke ruimte.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleCredentialsLogin}>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Emailadres</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 size-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none" htmlFor="password">Wachtwoord</label>
                  <Link href="#" className="text-xs text-primary hover:underline">Wachtwoord vergeten?</Link>
               </div>
               <div className="relative">
                <Lock className="absolute left-3 top-2.5 size-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive">
                {error}
              </div>
            )}

            <Button className="w-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90" size="lg" type="submit" disabled={loading}>
              {loading ? "Even geduld..." : "Inloggen"}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Of ga verder met</span>
            </div>
          </div>

          <Button variant="outline" size="lg" className="w-full" onClick={() => signIn("google", { callbackUrl: "/" })}>
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
               <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Google
          </Button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Nog geen account?{" "}
            <Link href="/registreren" className="font-semibold text-primary underline hover:text-primary/80">
              Maak een account aan
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

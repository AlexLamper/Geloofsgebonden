"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import { ShieldCheck, Mail, Lock, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegistrerenPage() {
  const params = useSearchParams();
  const suggestedEmail = useMemo(() => params.get("email") ?? "", [params]);

  const [email, setEmail] = useState(suggestedEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Registratie mislukt.");
      }

      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : "Onbekende fout.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50/50 p-4 dark:bg-background">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-4xl border bg-card shadow-2xl lg:grid-cols-2">
        
        {/* Brand Panel */}
        <section className="relative hidden flex-col justify-between bg-zinc-50 p-10 lg:flex overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-bl from-primary/10 via-transparent to-primary/5" />
          <div className="absolute top-0 left-0 -ml-20 -mt-20 size-80 rounded-full bg-primary/20 blur-3xl opacity-50" />
          
          <div className="relative z-10">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 text-primary">
              <UserPlus className="size-7 fill-current" />
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-zinc-900">Word lid van Geloofsgebonden</h1>
            <p className="mt-4 max-w-sm text-lg text-zinc-600 leading-relaxed">
              Start vandaag. Jouw reis in onze gemeenschap begint hier. Veilig, anoniem en betekenisvol.
            </p>
          </div>
          
          <div className="relative z-10 mt-auto rounded-3xl bg-white p-8 border border-zinc-100 shadow-sm">
            <div className="flex items-center gap-3 text-primary">
               <ShieldCheck className="size-6" />
               <span className="font-bold">Automatische Anonimiteit</span>
            </div>
            <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
               Ons systeem wijst je direct een veilig pseudoniem toe. Geen zorgen over zichtbaarheid of oordelen.
            </p>
          </div>
        </section>

        {/* Register Form */}
        <section className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Account aanmaken</h2>
            <p className="mt-2 text-muted-foreground">
              Vul je gegevens in om te starten.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleRegister}>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="email">Emailadres</label>
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
               <label className="text-sm font-medium leading-none" htmlFor="password">Wachtwoord (min. 8 tekens)</label>
               <div className="relative">
                <Lock className="absolute left-3 top-2.5 size-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </div>
            </div>

             <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
               <p>
                 Door je te registreren ga je akkoord met onze huisregels. We sturen geen spam.
               </p>
             </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm font-medium text-destructive">
                {error}
              </div>
            )}

            <Button className="w-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90" size="lg" type="submit" disabled={loading}>
              {loading ? "Account wordt aangemaakt..." : "Registreren"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Heb je al een account?{" "}
            <Link href="/inloggen" className="font-semibold text-primary underline hover:text-primary/80">
              Log hier in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { UserCircle2, ShieldCheck, Flame } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="inline-flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Flame className="size-4" />
          </div>
          <div className="leading-tight">
            <Link href="/" className="text-base font-bold tracking-tight text-primary">
              Geloofsgebonden
            </Link>
            <p className="text-xs text-muted-foreground">Anonieme christelijke community</p>
          </div>
        </div>

        <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          <Link className="hover:text-foreground" href="/">
            Feed
          </Link>
          <Link className="hover:text-foreground" href="/mijn-gebeden">
            Mijn gebeden
          </Link>
          <span className="inline-flex items-center gap-1 text-xs">
            <ShieldCheck className="size-3.5" />
            Gemodereerd
          </span>
        </nav>

        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Profiel menu">
                <UserCircle2 className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/mijn-gebeden">Mijn gebeden</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => signOut()}>
                Uitloggen
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/inloggen">Inloggen</Link>
            </Button>
            <Button asChild>
              <Link href="/registreren">Registreren</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

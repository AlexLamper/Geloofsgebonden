"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ShieldCheck, Flame, Home, LayoutGrid, Heart, Settings, HelpCircle, LogOut } from "lucide-react";

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
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur w-full">
      <div className="flex h-16 w-full items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 md:w-72">
            <div className="inline-flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Flame className="size-4" />
            </div>
            <div className="leading-tight">
              <Link href="/" className="text-base font-bold tracking-tight text-primary">
                Geloofsgebonden
              </Link>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Community</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <Link className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-zinc-100 transition-colors" href="/">
              <Home className="size-4" />
              Feed
            </Link>
            <Link className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-zinc-100 transition-colors" href="/mijn-gebeden">
              <Heart className="size-4" />
              Gebeden
            </Link>
            <Link className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-zinc-100 transition-colors" href="/categorieen">
              <LayoutGrid className="size-4" />
              Categorieën
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-zinc-100 px-3 py-1.5 rounded-full ring-1 ring-zinc-200">
            <ShieldCheck className="size-3 text-emerald-500" />
            Veilig & Anoniem
          </div>

          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 p-0 overflow-hidden ring-1 ring-primary/20">
                  {session.user.image ? (
                    <Image src={session.user.image} alt="Avatar" className="h-full w-full object-cover" width={40} height={40} />
                  ) : (
                    <span className="font-bold text-primary">{session.user.name?.[0] || session.user.email?.[0]}</span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl p-2 shadow-xl border-zinc-100">
                <div className="flex items-center gap-3 p-3 mb-2 bg-zinc-50 rounded-xl">
                   <div className="size-10 rounded-full bg-white flex items-center justify-center text-primary font-bold shadow-sm ring-1 ring-zinc-200 overflow-hidden">
                      {session.user.image ? <Image src={session.user.image} alt="User" width={40} height={40} /> : (session.user.name?.[0] || "U")}
                   </div>
                   <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-bold text-zinc-900 truncate">{session.user.name || "Gebruiker"}</span>
                      <span className="text-[10px] text-zinc-500 truncate lowercase">{session.user.email}</span>
                   </div>
                </div>
                <DropdownMenuItem asChild className="rounded-xl h-10 px-3 cursor-pointer">
                  <Link href="/mijn-gebeden" className="flex items-center gap-3 w-full">
                    <Heart className="size-4 text-muted-foreground" />
                    <span>Mijn gebeden</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl h-10 px-3 cursor-pointer">
                  <Link href="/instellingen" className="flex items-center gap-3 w-full">
                    <Settings className="size-4 text-muted-foreground" />
                    <span>Instellingen</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl h-10 px-3 cursor-pointer">
                  <Link href="/help" className="flex items-center gap-3 w-full">
                    <HelpCircle className="size-4 text-muted-foreground" />
                    <span>Hulp & FAQ</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => signOut()} className="rounded-xl h-10 px-3 cursor-pointer text-destructive focus:bg-destructive/5 focus:text-destructive">
                  <div className="flex items-center gap-3 w-full">
                    <LogOut className="size-4" />
                    <span>Uitloggen</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild className="rounded-full px-5 text-zinc-600 hover:text-zinc-900 border-none">
                <Link href="/inloggen">Inloggen</Link>
              </Button>
              <Button asChild className="rounded-full px-5 bg-primary hover:bg-primary/90 text-white shadow-sm transition-all hover:scale-105 active:scale-95">
                <Link href="/registreren">Registreren</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

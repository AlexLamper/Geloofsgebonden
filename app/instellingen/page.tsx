"use client";

import { useSession } from "next-auth/react";
import { 
  User, 
  Bell, 
  Lock, 
  ShieldCheck, 
  Globe,
} from "lucide-react";
import { Card, 
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12 w-full flex flex-col items-center">
      <div className="w-full text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Instellingen</h1>
        <p className="text-zinc-500">Beheer je account en voorkeuren voor Geloofsgebonden.</p>
      </div>

      <div className="w-full space-y-8">
        {/* Profile */}
        <div className="space-y-1">
          {[
            { label: "Account", icon: User, active: true },
            { label: "Notificaties", icon: Bell },
            { label: "Privacy", icon: ShieldCheck },
            { label: "Taal", icon: Globe },
            { label: "Beveiliging", icon: Lock },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-xl transition-all hover:cursor-pointer ${
                item.active 
                  ? "bg-primary/10 text-primary" 
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
              }`}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <div className="bg-white border-b border-zinc-100 p-6">
              <h2 className="text-lg font-semibold text-zinc-900">Openbaar Profiel</h2>
              <p className="text-sm text-zinc-500">Pas de details van je anonieme aanwezigheid aan.</p>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b border-zinc-100">
                <Avatar className="size-20 border-2 border-white shadow-sm">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user?.pseudonym}`} />
                  <AvatarFallback className="text-xl">{session?.user?.pseudonym?.[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" className="rounded-full hover:cursor-pointer">Avatar wijzigen</Button>
                    <Button size="sm" variant="ghost" className="rounded-full text-zinc-400 hover:cursor-pointer">Verwijderen</Button>
                  </div>
                  <p className="text-xs text-zinc-400">Wordt gebruikt als anonieme afbeelding bij je berichten.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-900">Pseudoniem</label>
                  <Input defaultValue={session?.user?.pseudonym || ""} className="rounded-xl bg-zinc-50 border-none h-11" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-900">Getuigenis (Bio)</label>
                  <Input placeholder="Iets over je geloof..." className="rounded-xl bg-zinc-50 border-none h-11" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <div className="bg-white border-b border-zinc-100 p-6">
              <h2 className="text-lg font-semibold text-zinc-900">Account Meldingen</h2>
              <p className="text-sm text-zinc-500">Blijf op de hoogte van gebeden van anderen.</p>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-zinc-900">Nieuwe Gebeden</p>
                  <p className="text-xs text-zinc-500">Ontvang een melding als iemand bidt voor jouw verzoek.</p>
                </div>
                <div className="size-6 bg-primary rounded-full" /> {/* Simulating a toggle */}
              </div>
              <div className="flex items-center justify-between py-2 border-t border-zinc-100">
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-zinc-900">Dagtekst Melding</p>
                  <p className="text-xs text-zinc-500">Elke ochtend een inspirerende Psalm in je inbox.</p>
                </div>
                <div className="size-6 bg-zinc-200 rounded-full" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" className="rounded-full hover:cursor-pointer">Annuleren</Button>
            <Button className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 hover:cursor-pointer px-8">Opslaan</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

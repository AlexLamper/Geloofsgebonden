"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Bookmark,
  Flame,
  HelpCircle,
  Home,
  LayoutGrid,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Overzicht", icon: Home },
  { href: "/populair", label: "Populair", icon: Flame },
  { href: "/categorieen", label: "Categorieën", icon: LayoutGrid },
];

const secondaryItems = [
  { href: "/volgend", label: "Volgend", icon: Users },
  { href: "/opgeslagen", label: "Opgeslagen", icon: Bookmark },
];

const bottomItems = [
  { href: "/instellingen", label: "Instellingen", icon: Settings },
  { href: "/help", label: "Hulp & FAQ", icon: HelpCircle },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-3 px-2 hover:cursor-pointer">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Flame className="size-6 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">Geloofsgebonden</span>
        </Link>

        {session?.user && (
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-sidebar-border bg-sidebar-accent/30 p-3 shadow-xs">
            <Avatar className="size-10 border-2 border-background shadow-sm">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.pseudonym}`} />
              <AvatarFallback className="bg-primary/10 text-primary">{session.user.pseudonym[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-semibold text-foreground">{session.user.pseudonym}</p>
              <p className="truncate text-xs text-muted-foreground">Ingelogd</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-full text-muted-foreground transition-colors hover:text-primary hover:cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/inloggen" })}
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup className="mt-4">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuButton 
                key={item.label} 
                asChild 
                isActive={pathname === item.href}
                className={cn(
                  "h-11 rounded-xl px-4 transition-all hover:cursor-pointer",
                  pathname === item.href 
                    ? "bg-primary text-white hover:bg-primary hover:text-white shadow-sm" 
                    : "hover:bg-sidebar-accent"
                )}
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon className={cn("size-5", pathname === item.href ? "text-white" : "text-muted-foreground")} />
                  <span className={cn("text-sm font-medium", pathname === item.href ? "text-white font-bold" : "text-foreground")}>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <div className="my-4 h-px bg-sidebar-border/60 mx-4" />

      </SidebarContent>

      <SidebarFooter className="p-3">
        {session?.user && (
          <div className="mb-4 px-4 py-2 flex items-center gap-3">
            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden">
               {session.user.image ? <img src={session.user.image} alt="User" /> : session.user.name?.[0] || "U"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground">{session.user.name || "Gebruiker"}</span>
              <span className="text-xs text-muted-foreground">{session.user.email}</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto size-8 text-muted-foreground hover:text-destructive" onClick={() => signOut()}>
              <LogOut className="size-4" />
            </Button>
          </div>
        )}

        <SidebarMenu>
          {[...secondaryItems, ...bottomItems].map((item) => (
            <SidebarMenuButton 
              key={item.label} 
              asChild 
              isActive={pathname === item.href}
              className={cn(
                "h-11 rounded-xl px-4 transition-all hover:cursor-pointer",
                pathname === item.href 
                  ? "bg-primary text-white hover:bg-primary hover:text-white shadow-sm" 
                  : "hover:bg-sidebar-accent"
              )}
            >
              <Link href={item.href} className="flex items-center gap-3">
                <item.icon className={cn("size-5", pathname === item.href ? "text-white" : "text-muted-foreground")} />
                <span className={cn("text-sm font-medium", pathname === item.href ? "text-white font-bold" : "text-foreground")}>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

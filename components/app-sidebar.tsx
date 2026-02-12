"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  Flame,
  HelpCircle,
  Home,
  LayoutGrid,
  Settings,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarGroup,
} from "@/components/ui/sidebar";
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

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar pt-4">
      <SidebarContent className="px-3">
        <SidebarGroup>
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

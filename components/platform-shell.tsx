"use client";

import { usePathname } from "next/navigation";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const authRoutes = ["/inloggen", "/registreren"];

export function PlatformShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = authRoutes.includes(pathname);

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider className="h-screen overflow-hidden">
      <div className="flex w-full bg-background text-foreground selection:bg-primary/20 h-full">
        <AppSidebar />
        <SidebarInset className="flex flex-col bg-background h-full overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur-sm px-4 sticky top-0 z-10 hidden md:flex">
             {/* Header content if any */}
          </header>
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-(--breakpoint-2xl) px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

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
    <SidebarProvider>
      <div className="flex w-full bg-background text-foreground selection:bg-primary/20 h-[calc(100vh-64px)] overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-col bg-background h-full overflow-hidden">
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

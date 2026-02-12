"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { PanelLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SidebarContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebarContext() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("Sidebar components must be used inside SidebarProvider.");
  }
  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  const value = React.useMemo(
    () => ({
      open,
      setOpen,
      toggle: () => setOpen((previous) => !previous),
    }),
    [open],
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function Sidebar({ children, className }: { children: React.ReactNode; className?: string }) {
  const { open, setOpen } = useSidebarContext();

  return (
    <>
      <aside
        className={cn(
          "hidden border-r bg-sidebar text-sidebar-foreground md:flex md:w-72 md:flex-col",
          className,
        )}
      >
        {children}
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] border-r bg-sidebar text-sidebar-foreground shadow-2xl transition-transform md:hidden",
          open ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        {children}
      </aside>
    </>
  );
}

export function SidebarHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("border-b p-4", className)}>{children}</div>;
}

export function SidebarContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex-1 overflow-y-auto p-3", className)}>{children}</div>;
}

export function SidebarFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("border-t p-3", className)}>{children}</div>;
}

export function SidebarGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn("mb-5", className)}>{children}</section>;
}

export function SidebarGroupLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-sidebar-foreground/60", className)}>
      {children}
    </p>
  );
}

export function SidebarMenu({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("space-y-1", className)}>{children}</div>;
}

export function SidebarMenuButton({
  asChild,
  isActive,
  className,
  children,
}: {
  asChild?: boolean;
  isActive?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(
        "group flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        className,
      )}
    >
      {children}
    </Component>
  );
}

export function SidebarInset({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("min-h-screen flex-1", className)}>{children}</div>;
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { toggle } = useSidebarContext();

  return (
    <Button variant="ghost" size="icon" onClick={toggle} className={className} aria-label="Open zijbalk">
      <PanelLeft className="size-5" />
    </Button>
  );
}

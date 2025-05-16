// components/ClientSidebar.tsx
'use client';

import { AppSidebar } from "@/components/app-sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@/hooks/use-user";

export function ClientSidebar() {
  const { user, isLoading } = useUser();

  if (isLoading || !user) return null;

  return <AppSidebar user={user} />;
}

export function HeaderControls() {
  const { user, isLoading } = useUser();

  if (isLoading || !user) return null;

  return (
    <div className="absolute right-4 top-4 flex gap-2 items-center">
      <SidebarTrigger className="-ml-1" />
      <ThemeSwitcher />
    </div>
  );
}

// components/ClientSidebar.tsx
'use client';

import { AppSidebar } from "@/components/app-sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/use-user";
import { BotIcon, Layers2Icon, PiggyBankIcon, SquareChartGanttIcon } from "lucide-react";
import { usePathname } from "next/navigation";

function SidebarSkeleton() {
  return (
    <Sidebar variant="floating" collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Skeleton className="h-10 w-full" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-2 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            <Skeleton className="h-6 w-20" />
          </h2>
          <div className="space-y-1">
            {[BotIcon, Layers2Icon, SquareChartGanttIcon, PiggyBankIcon].map((_, i) => (
              <Skeleton key={i} className="h-9 w-full" />
            ))}
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <Skeleton className="h-14 w-full" />
      </SidebarFooter>
    </Sidebar>
  );
}

export function ClientSidebar() {
  const pathName = usePathname();
  const { user, isLoading } = useUser();

  const publicPaths = ["/", "/sign-up", "/sign-in"];
  if (publicPaths.includes(pathName)) return null;
  if (isLoading || !user) return <SidebarSkeleton />;

  return <AppSidebar user={user} />;
}

export function HeaderControls() {
  const { user, isLoading } = useUser();

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="absolute right-4 top-4 flex gap-2 items-center">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    );
  }

  return (
    <div className="absolute right-4 top-4 flex gap-2 items-center">
      <SidebarTrigger className="-ml-1" />
      <ThemeSwitcher />
    </div>
  );
}

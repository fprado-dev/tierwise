"use client";

import {
  BotIcon,
  Layers2Icon,
  PiggyBankIcon,
  SquareChartGanttIcon
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { User } from "@supabase/supabase-js";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { ProjectSwitcher } from "./project-switcher";
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User;
}

const data = {
  navMain: [
    {
      title: "Models",
      url: "/models",
      icon: BotIcon,
    },
    {
      title: "Tier Builder",
      url: "/tiers",
      icon: Layers2Icon,
    },
    {
      title: "Summary",
      url: "/summary",
      icon: SquareChartGanttIcon,
    },
    {
      title: "Revenue Simulator",
      url: "/revenue-simulator",
      icon: PiggyBankIcon,
    },
  ],
  navSecondary: [

  ],
};


export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const userData = {
    name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User',
    email: user?.email || '',
    avatar: user?.user_metadata?.avatar_url || '',
  };



  return (
    <Sidebar variant="floating" collapsible="offcanvas"  {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 bg-red-100 w-full"
            >
              <ProjectSwitcher />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}



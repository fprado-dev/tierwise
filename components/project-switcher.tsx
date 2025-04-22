"use client";

import { ChevronsUpDown, FolderIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useProjects } from "@/hooks/use-projects";
import { cn } from "@/lib/utils";

export function ProjectSwitcher() {
  const { isMobile } = useSidebar();
  const { projects, loading, onSetUserActive } = useProjects();

  const handleSetActiveProject = async (project: { id: string; name: string; }) => {
    await onSetUserActive(project.id);
  };

  if (loading) {
    return <div className="flex items-center gap-2">
      <span className="animate-pulse h-3 w-3 rounded-full bg-gray-400"></span>
      <span className="h-3 w-12 rounded-full bg-gray-300"></span>
    </div>;
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex items-center gap-2 flex-1">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border bg-muted/50">
                  <FolderIcon className="h-4 w-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {projects.find(p => p.isActive)?.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">Active Project</span>
                </div>
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Projects
            </DropdownMenuLabel>
            {projects.map((project, index) => (
              <DropdownMenuItem
                key={project.name}
                onClick={() => handleSetActiveProject(project)}
                className="gap-2 p-2 hover:bg-muted/50 transition-colors"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border bg-muted/50">
                  <FolderIcon className="h-4 w-4" />
                </div>
                <div className="grid flex-1 gap-1">
                  <span className={cn(
                    "truncate font-medium",
                    project.isActive && "text-primary font-semibold"
                  )}>
                    {project.name}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}




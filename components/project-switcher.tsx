"use client";

import { CheckIcon, ChevronsUpDown, FolderIcon, Pencil, PlusIcon, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useProjects } from "@/hooks/use-projects";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

export function ProjectSwitcher() {
  const queryClient = useQueryClient();
  const { projects, loading, onSetUserActive, deleteProject: onDeleteProject, updateProject: onUpdateProject, createProject: onCreateProject } = useProjects();
  const [selectedProject, setSelectedProject] = useState<{ id: string; name: string; } | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [newProjectName, setNewProjectName] = useState("");

  const handleSetActiveProject = async (project: { id: string; name: string; }) => {
    await onSetUserActive(project.id);
    await queryClient.invalidateQueries();
  };

  const handleDeleteProject = async () => {
    if (selectedProject) {
      await onDeleteProject(selectedProject.id);
      setIsDeleteDialogOpen(false);
      setSelectedProject(null);
    }
  };

  const handleEditProject = async () => {
    if (selectedProject && editName.trim()) {
      await onUpdateProject(selectedProject.id, editName.trim());
      setIsEditDialogOpen(false);
      setSelectedProject(null);
      setEditName("");
    }
  };

  if (loading) {
    return <div className="flex items-center gap-2">
      <span className="animate-pulse h-8 w-12 rounded-md bg-brand/30"></span>
      <span className="animate-pulse  h-8 w-full rounded-md bg-brand/30"></span>
    </div>;
  }

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="min-w-56 w-full" asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center justify-between gap-2 h-9 px-3"
          >
            <div className="flex items-center gap-2">
              <FolderIcon className="h-2 w-2" />
              <span className="truncate font-medium">
                {projects.find(p => p.isActive)?.name || "Select Project"}
              </span>
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-[280px] p-2"
          align="start"
          sideOffset={4}
        >
          <div className="flex items-center justify-between px-2 py-1.5">
            <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">
              Projects
            </DropdownMenuLabel>
            <span className="text-[10px] bg-muted/50 text-muted-foreground px-1.5 py-0.5 rounded">
              {projects.length} {projects.length === 1 ? 'project' : 'projects'}
            </span>
          </div>

          <div className="my-1.5">
            {projects.map((project) => (
              <DropdownMenuItem
                key={project.name}
                onSelect={() => handleSetActiveProject(project)}
                className={cn(
                  "group flex items-center justify-between rounded-md px-2 py-2 cursor-pointer transition-colors",
                  project.isActive && "bg-primary/5"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex items-center justify-center w-5 h-5">
                    {project.isActive ? (
                      <CheckIcon className="h-4 w-4 text-primary" />
                    ) : (
                      <FolderIcon className="h-4 w-4 text-muted-foreground/70" />
                    )}
                  </div>
                  <span className={cn(
                    "truncate font-medium",
                    project.isActive && "text-primary font-semibold"
                  )}>
                    {project.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-muted"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                      setEditName(project.name);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-7 w-7 hover:bg-destructive/10 hover:text-destructive",
                      projects.length <= 1 && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (projects.length <= 1) {
                        return;
                      }
                      setSelectedProject(project);
                      setIsDeleteDialogOpen(true);
                    }}
                    disabled={projects.length <= 1}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </DropdownMenuItem>
            ))}
          </div>

          <DropdownMenuSeparator className="my-1.5" />
          <DropdownMenuItem
            onSelect={() => setIsCreateDialogOpen(true)}
            className="flex items-center gap-2 px-2 py-2 cursor-pointer text-primary hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
          >
            <div className="flex items-center justify-center w-5 h-5">
              <PlusIcon className="h-4 w-4" />
            </div>
            Create New Project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to delete {selectedProject?.name}?</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDeleteProject}>Delete</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Project name"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleEditProject}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Enter project name"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => {
                setIsCreateDialogOpen(false);
                setNewProjectName("");
              }}>Cancel</Button>
              <Button onClick={async () => {
                if (newProjectName.trim()) {
                  await onCreateProject(newProjectName.trim());
                  setIsCreateDialogOpen(false);
                  setNewProjectName("");
                }
              }}>Create</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}




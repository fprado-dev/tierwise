'use client';

import { useState } from 'react';
import { ProjectCreateSheet } from './components/project-create-sheet';
import { ProjectEditSheet } from './components/project-edit-sheet';
import { ProjectList } from './components/project-list';
import { useProjectMutations } from './hooks/use-project-mutations';

/**
 * ProjectsPage component serving as the main container for project management
 * Orchestrates the interaction between different components using React Query hooks
 */
export default function ProjectsPage() {
  // State for managing sheets visibility and editing project
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<{ id: string; name: string; } | null>(null);

  // Project mutations using React Query
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  const {
    createProject,
    updateProject,
    deleteProject,
    isCreating,
    isUpdating,
  } = useProjectMutations();

  // Handlers for project operations
  const handleCreateProject = async (name: string) => {
    try {
      await createProject(name);
      setIsCreateSheetOpen(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      setDeletingProjectId(id);
      await deleteProject(id);
    } catch (error) {
      console.error('Failed to delete project:', error);
    } finally {
      setDeletingProjectId(null);
    }
  };

  const handleUpdateProject = async (project: { id: string; name: string; }) => {
    try {
      await updateProject(project);
      setEditingProject(null);
      setIsEditSheetOpen(false);
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  const handleEditStart = (project: { id: string; name: string; }) => {
    setEditingProject(project);
    setIsEditSheetOpen(true);
  };

  return (
    <div className="w-full px-4 py-4">
      <div className="rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-sm text-muted-foreground">
              Manage your AI cost tracking projects
            </p>
          </div>

          <ProjectCreateSheet
            isOpen={isCreateSheetOpen}
            onOpenChange={setIsCreateSheetOpen}
            onSubmit={handleCreateProject}
            isCreating={isCreating}
          />
        </div>

        <ProjectList
          onEdit={handleEditStart}
          onDelete={handleDeleteProject}
          onUpdateProject={() => handleUpdateProject(editingProject!)}
          isEditSheetOpen={isEditSheetOpen}
          setIsEditSheetOpen={setIsEditSheetOpen}
          isUpdating={isUpdating}
          deletingProjectId={deletingProjectId}
          onCreateNew={() => setIsCreateSheetOpen(true)}
        />

        <ProjectEditSheet
          project={editingProject}
          isOpen={isEditSheetOpen}
          onOpenChange={setIsEditSheetOpen}
          onSubmit={handleUpdateProject}
          isUpdating={isUpdating}
        />
      </div>
    </div>
  );
}
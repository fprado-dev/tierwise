'use client';

import { Button } from '@/components/ui/button';
import { useProjectQueries } from '../hooks/use-project-queries';
import { ProjectCard } from './project-card';
import { ProjectSkeleton } from './project-skeleton';

type ProjectListProps = {
  onEdit: (project: { id: string; name: string; }) => void;
  onDelete: (id: string) => void;
  onUpdateProject: () => void;
  isEditSheetOpen: boolean;
  setIsEditSheetOpen: (open: boolean) => void;
  isUpdating: boolean;
  deletingProjectId: string | null;
  onCreateNew: () => void;
};

/**
 * ProjectList component responsible for rendering the list of projects
 * Handles loading states and empty states
 */
export function ProjectList({
  onEdit,
  onDelete,
  onUpdateProject,
  isEditSheetOpen,
  setIsEditSheetOpen,
  isUpdating,
  deletingProjectId,
  onCreateNew,
}: ProjectListProps) {
  const { projects, isLoading, isError } = useProjectQueries();

  if (isError) {
    return (
      <div className="text-center py-4 text-red-500">
        Error loading projects. Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return <ProjectSkeleton />;
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground mb-4">No projects found</p>
        <Button
          variant="outline"
          onClick={onCreateNew}
          className="transition-all hover:scale-105"
        >
          Create your first project
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          isEditing={isEditSheetOpen}
          setIsEditing={setIsEditSheetOpen}
          onEdit={onEdit}
          onUpdateProject={onUpdateProject}
          onDelete={onDelete}
          isUpdating={isUpdating}
          isDeleting={deletingProjectId === project.id}
        />
      ))}
    </div>
  );
}
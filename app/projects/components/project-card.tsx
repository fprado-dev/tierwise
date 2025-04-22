'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

type ProjectCardProps = {
  project: {
    id: string;
    name: string;
    created_at: string;
  };
  onEdit: (project: { id: string; name: string; }) => void;
  onDelete: (id: string) => void;
  onUpdateProject: VoidFunction;
  isEditing: boolean;
  setIsEditing: (open: boolean) => void;
  isUpdating: boolean;
  isDeleting: boolean;
};

/**
 * ProjectCard component for displaying individual project information
 * Handles project editing and deletion actions
 */
export function ProjectCard({
  project,
  onEdit,
  onDelete,
  isDeleting,
}: ProjectCardProps) {
  const handleEdit = () => {
    onEdit({ id: project.id, name: project.name });
  };

  return (
    <Card className="p-4 space-y-4 bg-sidebar transition-all hover:shadow-md">
      <div className="space-y-2">
        <h3 className="font-semibold truncate">{project.name}</h3>

      </div>

      <div className="flex justify-between space-x-2">
        <div className="flex items-center text-xs text-muted-foreground">
          <CalendarDays className="w-4 h-4 mr-2" />
          {new Date(project.created_at).toLocaleDateString()}
        </div>
        <div className='flex gap-2'>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            className="transition-all hover:scale-105"
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(project.id)}
            disabled={isDeleting}
            className="transition-all hover:scale-105"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
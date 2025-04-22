'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { useEffect, useState } from 'react';

type ProjectEditSheetProps = {
  project: {
    id: string;
    name: string;
  } | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (project: { id: string; name: string; }) => Promise<void>;
  isUpdating: boolean;
};

/**
 * ProjectEditSheet component for handling project editing
 * Manages its own state and provides a clean interface for project updates
 */
export function ProjectEditSheet({
  project,
  isOpen,
  onOpenChange,
  onSubmit,
  isUpdating,
}: ProjectEditSheetProps) {
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    if (project) {
      setProjectName(project.name);
    }
  }, [project]);

  const handleSubmit = async () => {
    if (!project || !projectName.trim()) return;
    await onSubmit({ id: project.id, name: projectName });
    setProjectName('');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Project</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <Input
            placeholder="Project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            disabled={isUpdating}
            maxLength={30}
            minLength={3}
          />
          <Button
            onClick={handleSubmit}
            disabled={isUpdating || !projectName.trim()}
            className="w-full"
          >
            {isUpdating ? 'Updating...' : 'Update Project'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
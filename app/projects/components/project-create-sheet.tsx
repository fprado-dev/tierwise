'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';

type ProjectCreateSheetProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => Promise<void>;
  isCreating: boolean;
};

/**
 * ProjectCreateSheet component for handling project creation
 * Manages its own state and provides a clean interface for project creation
 */
export function ProjectCreateSheet({
  isOpen,
  onOpenChange,
  onSubmit,
  isCreating,
}: ProjectCreateSheetProps) {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = async () => {
    if (!projectName.trim()) return;
    await onSubmit(projectName);
    setProjectName('');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button className="transition-all hover:scale-105">New Project</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Project</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <Input
            placeholder="Project name"
            value={projectName}
            maxLength={30}
            minLength={3}
            onChange={(e) => setProjectName(e.target.value)}
            disabled={isCreating}
          />
          <Button
            onClick={handleSubmit}
            disabled={isCreating || !projectName.trim()}
            className="w-full"
          >
            {isCreating ? 'Creating...' : 'Create Project'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
'use client';

import { ConfirmDialog } from '@/components/ui/confirm-dialog';

interface ModelConfirmProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  modelName?: string;
  isDeleting?: boolean;
}

export function ModelConfirmDelete({
  isOpen,
  onOpenChange,
  onConfirm,
  modelName = 'this model',
  isDeleting = false,
}: ModelConfirmProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onConfirm={handleConfirm}
      title={`Delete ${modelName}`}
      description={`Are you sure you want to delete ${modelName}? This action cannot be undone.`}
      confirmText={isDeleting ? 'Deleting...' : 'Delete'}
      cancelText="Cancel"
    />
  );
}
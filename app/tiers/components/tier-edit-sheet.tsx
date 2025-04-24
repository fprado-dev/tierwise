'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ProcessedTier } from '@/lib/tier.types';
import { useState } from 'react';

interface TierEditSheetProps {
  tier: ProcessedTier;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateTier: (id: string, name: string) => void;
}

export function TierEditSheet({ tier, isOpen, onOpenChange, onUpdateTier }: TierEditSheetProps) {
  const [name, setName] = useState(tier.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onUpdateTier(tier.id, name.trim());
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Tier</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Tier Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter tier name"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Save Changes
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
          <SheetTitle className='text-brand'>Customize Tier Settings</SheetTitle>
          <SheetDescription className='text-balance'>
            Customize the name of your tier and add or remove models.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-brand">
              Tier Name
            </label>
            <Input
              id="name"
              value={name}
              className='border-brand text-brand placeholder:text-brand/50'
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Basic, Pro, Enterprise"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button size="lg" type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Discard
            </Button>
            <Button size="lg" className='bg-brand hover:bg-brand/90' type="submit" disabled={!name.trim()}>
              Update Tier
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
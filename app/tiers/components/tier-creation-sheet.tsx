'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tier } from "@/lib/tier.types";
import { Plus } from "lucide-react";
import { useState } from "react";

type TierCreationSheetProps = {
  onAddTier: (name: string) => void;
  tiers?: Tier[];
};

export function TierCreationSheet({ onAddTier }: TierCreationSheetProps) {
  const [newTierName, setNewTierName] = useState('');
  const [isOpen, setIsOpen] = useState(false);




  const handleAddTier = () => {
    if (!newTierName) return;
    onAddTier(newTierName);
    setNewTierName('');
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="flex items-center gap-2 transition-all hover:scale-105"
        >
          <Plus size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Tier</SheetTitle>
          <SheetDescription>
            Create a new tier with the selected models.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="tierName" className="text-sm font-medium">
              Tier Name
            </Label>
            <Input
              id="tierName"
              type="text"
              value={newTierName}
              onChange={(e) => setNewTierName(e.target.value)}
              placeholder="e.g. Premium/Pro/Enterprise"
              className="focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <SheetFooter>
          <Button
            type="submit"
            onClick={handleAddTier}
            disabled={!newTierName}
          >
            Create Tier
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
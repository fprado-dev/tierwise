'use client';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useState } from "react";

type TierCreationSheetProps = {
  onAddTier: (name: string, inheritModels?: boolean) => void;
  tiers?: Tier[];
};

export function TierCreationSheet({ onAddTier, tiers }: TierCreationSheetProps) {
  const [newTierName, setNewTierName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [inheritModels, setInheritModels] = useState(false);

  // Check if there are existing tiers to inherit from
  const hasPreviousTier = tiers && tiers.length > 0;

  const handleAddTier = () => {
    if (!newTierName) return;
    onAddTier(newTierName, inheritModels);
    setNewTierName('');
    setInheritModels(false);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="bg-primary text-primary-foreground hover:bg-primary/90"


        >
          {tiers && tiers?.length <= 0 ? "Create Your First Tier" : "Create"}
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

          {hasPreviousTier && (
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                id="inheritModels"
                checked={inheritModels}
                onCheckedChange={(checked) => setInheritModels(checked as boolean)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label htmlFor="inheritModels" className="text-sm font-medium cursor-pointer">
                Inherit models from previous tier
              </Label>
            </div>
          )}
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
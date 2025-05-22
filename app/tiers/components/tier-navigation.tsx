"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProcessedTier } from "@/lib/tier.types";
import { cn } from "@/lib/utils";


type TiersNavigationProps = {
  tiers: ProcessedTier[];
  onSelectTier: (tierId: string) => void;
};
export function TiersNavigation({ tiers, onSelectTier }: TiersNavigationProps) {
  const [open, setOpen] = useState(false);



  if (!tiers || tiers.length === 0) {
    return null;
  }


  return (
    <div className="flex gap-2 items-center">
      <div className='bg-brand/20 px-4 py-2 rounded-md w-4 h-full' />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between border-brand/30 text-brand hover:text-brand-darker hover:bg-white"
          >
            {tiers.find((t) => t.isActive)?.name ?? "Select Tier"}
            <ChevronsUpDown className="text-brand" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No Tiers found.</CommandEmpty>
              <CommandGroup>
                {tiers.map((tier) => (
                  <CommandItem
                    key={tier.id}
                    value={tier.id}
                    onSelect={(currentValue) => {
                      onSelectTier(currentValue);
                      setOpen(false);
                    }}

                  >
                    <span className="text-brand">
                      {tier.name}
                    </span>
                    <Check
                      className={cn(
                        "ml-auto w-4 h-4 text-brand",
                        tier.isActive ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

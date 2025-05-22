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
import { cn } from "@/lib/utils";

type ModelType = "text" | "image" | "video";

import { Model } from "@/lib/supabase/model.service";

type ModelTypeNavigationProps = {
  models: Model[];
  activeModelType: ModelType;
  onSelectModelType: (modelType: ModelType) => void;
};

export function ModelTypeNavigation({ models, activeModelType, onSelectModelType, }: ModelTypeNavigationProps) {
  const [open, setOpen] = useState(false);

  // Extract unique model types from the models in the current tier
  const availableModelTypes = Array.from(new Set(models.map(model => model.model_type))) as ModelType[];

  // Use provided modelTypes if available, otherwise use the extracted types

  // If there are no model types to display, don't render the component
  if (!availableModelTypes || availableModelTypes.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2 items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="lg"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="flex w-[200px] items-center gap-4 justify-between px-3 border-brand/30 text-brand hover:bg-brand/10 hover:text-brand"
          >
            {activeModelType.charAt(0).toUpperCase() + activeModelType.slice(1)} Models
            <ChevronsUpDown className="text-brand" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No model types found.</CommandEmpty>
              <CommandGroup>
                {availableModelTypes.map((type) => (
                  <CommandItem
                    key={type}
                    value={type}
                    onSelect={(currentValue) => {
                      onSelectModelType(currentValue as ModelType);
                      setOpen(false);
                    }}
                  >
                    <span className="text-brand/80">
                      {type.charAt(0).toUpperCase() + type.slice(1)} Models
                    </span>
                    <Check
                      className={cn(
                        "ml-auto w-4 h-4 text-brand",
                        activeModelType === type ? "opacity-100" : "opacity-0"
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
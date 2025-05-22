import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { CogIcon, ImagesIcon, LetterTextIcon, PenSquareIcon, Trash2, VideoIcon } from "lucide-react";


type TActionsTier = {
  onClickModelOption: (modelType: "text" | "image" | "video") => void;
  onClickEditOption: () => void;
  onClickDeleteOption: () => void;
};
export function ActionsTier({ onClickModelOption, onClickEditOption, onClickDeleteOption }: TActionsTier) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="border-brand/40 text-brand hover:bg-brand/10 group/icon">
          <CogIcon className="h-4 w-4 transition-transform duration-200 group-hover/icon:rotate-90" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">



        <DropdownMenuLabel className="text-brand">Models Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup >
          <DropdownMenuItem onClick={() => onClickModelOption("text")} className="text-muted-foreground  text-xs">
            Text Models
            <DropdownMenuShortcut className="border border-brand/10 p-1 rounded-sm">
              <LetterTextIcon className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onClickModelOption("image")} className="text-muted-foreground hover:text-brand/90 text-xs">
            Image Models
            <DropdownMenuShortcut className="border border-brand/10 p-1 rounded-sm">
              <ImagesIcon className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onClickModelOption("video")} className="text-muted-foreground hover:text-brand/90 text-xs">
            Video Models
            <DropdownMenuShortcut className="border border-brand/10 p-1 rounded-sm">
              <VideoIcon className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onClickEditOption} className="text-muted-foreground hover:text-brand/90 text-xs">
            Edit
            <DropdownMenuShortcut className="border border-brand/10 p-1 rounded-sm">
              <PenSquareIcon className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>

          <DropdownMenuItem onClick={onClickDeleteOption} className="hover:bg-red-200">
            <span className="text-red-400 hover:text-red-400 " >

              Delete
            </span>
            <DropdownMenuShortcut className="border border-brand/10 p-1 rounded-sm">
              <Trash2 className="h-4 w-4 text-red-400" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

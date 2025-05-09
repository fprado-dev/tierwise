
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

export function Header() {
  return (
    <header className="flex h-16 bg-sidebar shrink-0 items-center gap-2 border-b justify-between px-4">
      <div className="flex items-center gap-1">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>
      <div className="flex items-center gap-2">
      </div>
    </header>
  );
}
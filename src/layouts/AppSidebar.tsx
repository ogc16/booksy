import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/ui/sidebar";
import { NavLinks } from "@/components/ui/nav-links";

export function AppSidebar() {
  return (
    <Sidebar>
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="md:hidden absolute left-4 top-4" />
        </SheetTrigger>
        <SheetContent className="w-full sm:w-64">
          <SheetHeader>
            <SheetTitle>Dashboard</SheetTitle>
            <SheetDescription>
              Manage your account preferences here.
            </SheetDescription>
          </SheetHeader>
          <NavLinks />
        </SheetContent>
      </Sheet>
    </Sidebar>
  );
}

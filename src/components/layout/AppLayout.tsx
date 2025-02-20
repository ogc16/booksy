
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 overflow-x-hidden">
          <div className="h-16 border-b bg-white flex items-center px-6">
            <div className="max-w-md w-full relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input 
                className="pl-10"
                type="search"
                placeholder="Search transactions, invoices, vendors..."
              />
            </div>
          </div>
          <div className="container py-6 mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

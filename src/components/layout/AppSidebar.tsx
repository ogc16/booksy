
import { ChartBar, CreditCard, File, Receipt, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", icon: ChartBar, url: "/" },
  { title: "Invoices", icon: File, url: "/invoices" },
  { title: "Expenses", icon: Receipt, url: "/expenses" },
  { title: "Banking", icon: CreditCard, url: "/banking" },
  { title: "Vendors", icon: Users, url: "/vendors" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="h-[60px] flex items-center px-6">
        <span className="text-xl font-semibold">Finance Books</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-primary transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

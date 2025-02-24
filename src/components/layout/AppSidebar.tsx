
import { ChartBar, CreditCard, File, Receipt, Users, FileText, DollarSign } from "lucide-react";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", icon: ChartBar, url: "/" },
  { title: "Banking", icon: CreditCard, url: "/banking" },
  { 
    title: "Sales", 
    icon: File,
    subItems: [
      { title: "Invoices", url: "/invoices" }
    ]
  },
  { 
    title: "Purchases", 
    icon: Receipt,
    subItems: [
      { title: "Expenses", url: "/expenses" }
    ]
  },
  { title: "Vendors", icon: Users, url: "/vendors" },
  { title: "Reports", icon: FileText, url: "/reports" },
  { title: "Pricing", icon: DollarSign, url: "/pricing" },
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
                  {item.subItems ? (
                    <>
                      <SidebarMenuButton>
                        <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-primary transition-colors">
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a
                                href={subItem.url}
                                className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-primary transition-colors"
                              >
                                {subItem.title}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:text-primary transition-colors"
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}


import { 
  Home, 
  Package, 
  Building2, 
  FileText, 
  Receipt, 
  Clock, 
  User, 
  BarChart, 
  File,
  FileBox,
  ClipboardList,
  FileStack
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Home", icon: Home, url: "/dashboard" },
  { title: "Items", icon: Package, url: "/items" },
  { title: "Banking", icon: Building2, url: "/banking" },
  { 
    title: "Sales", 
    icon: FileText,
    subItems: [
      { title: "Customers", url: "/customers" },
      { title: "Estimates", url: "/estimates" },
      { title: "Retainer Invoices", url: "/retainer-invoices" },
      { title: "Sales Orders", url: "/sales-orders" },
      { title: "Invoices", url: "/invoices" },
      { title: "Credit Notes", url: "/credit-notes" },
    ]
  },
  { title: "Purchases", icon: Receipt, url: "/purchases" },
  { title: "Time Tracking", icon: Clock, url: "/time-tracking" },
  { title: "Accountant", icon: User, url: "/accountant" },
  { title: "Reports", icon: BarChart, url: "/reports" },
  { title: "Documents", icon: FileBox, url: "/documents" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <>
                      <SidebarMenuButton>
                        <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
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
                                className="flex items-center gap-3 px-3 py-2 ml-8 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-sm"
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
                        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
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


import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Package, ShoppingCart, BarChart3, Tags } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const inventoryMenuItems = [
  {
    title: "Items",
    url: "/inventory?tab=items",
    icon: Package,
    param: "items"
  },
  {
    title: "Purchase Orders",
    url: "/inventory?tab=lpo",
    icon: ShoppingCart,
    param: "lpo"
  },
  {
    title: "Stock Levels",
    url: "/inventory?tab=stock",
    icon: BarChart3,
    param: "stock"
  },
  {
    title: "Categories",
    url: "/inventory?tab=categories",
    icon: Tags,
    param: "categories"
  }
];

export function InventorySidebar() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get('tab') || 'items';

  return (
    <Sidebar variant="inset" className="md:border-none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Inventory</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {inventoryMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={currentTab === item.param}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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


import {
  BarChart2,
  Building2,
  ClipboardEdit,
  LayoutDashboard,
  PackageCheck,
  Receipt,
  Settings,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export interface NavLink {
  title: string;
  href: string;
  icon:
    | "LayoutDashboard"
    | "Building2"
    | "Receipt"
    | "ClipboardEdit"
    | "PackageCheck"
    | "Truck"
    | "ShoppingCart"
    | "BarChart2"
    | "Settings";
  roles: string[];
}

export function getNavLinks(role: string | null | undefined): NavLink[] {
  const links: NavLink[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "LayoutDashboard",
      roles: ["user", "admin", "accountant", "manager"],
    },
    {
      title: "Banking",
      href: "/banking",
      icon: "Building2",
      roles: ["user", "admin", "accountant", "manager"],
    },
    {
      title: "Invoices",
      href: "/invoices",
      icon: "Receipt",
      roles: ["user", "admin", "accountant", "manager"],
    },
    {
      title: "Estimates",
      href: "/estimates",
      icon: "ClipboardEdit",
      roles: ["user", "admin", "manager"],
    },
    {
      title: "Inventory",
      href: "/inventory",
      icon: "PackageCheck",
      roles: ["user", "admin", "manager"],
    },
    {
      title: "Suppliers",
      href: "/suppliers",
      icon: "Truck",
      roles: ["user", "admin", "manager"],
    },
    {
      title: "Purchases",
      href: "/purchases",
      icon: "ShoppingCart",
      roles: ["user", "admin", "manager"],
    },
    {
      title: "Reports",
      href: "/reports",
      icon: "BarChart2",
      roles: ["accountant", "admin", "manager"],
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "Settings",
      roles: ["admin", "manager"],
    }
  ];

  // Filter links based on user role
  return links.filter((link) => {
    // Show all links if no role is specified (or include role validation logic)
    if (!role || link.roles.includes(role)) {
      return true;
    }
    return false;
  });
}

export function NavLinks() {
  const navigate = useNavigate();
  
  // Get links with null role - we'll filter in the AppSidebar component
  const links = getNavLinks(null);
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "LayoutDashboard":
        return <LayoutDashboard className="mr-2 h-4 w-4" />;
      case "Building2":
        return <Building2 className="mr-2 h-4 w-4" />;
      case "Receipt":
        return <Receipt className="mr-2 h-4 w-4" />;
      case "ClipboardEdit":
        return <ClipboardEdit className="mr-2 h-4 w-4" />;
      case "PackageCheck":
        return <PackageCheck className="mr-2 h-4 w-4" />;
      case "Truck":
        return <Truck className="mr-2 h-4 w-4" />;
      case "ShoppingCart":
        return <ShoppingCart className="mr-2 h-4 w-4" />;
      case "BarChart2":
        return <BarChart2 className="mr-2 h-4 w-4" />;
      case "Settings":
        return <Settings className="mr-2 h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            onClick={() => navigate(link.href)}
          >
            <Button variant="ghost" className="w-full justify-start">
              {getIconComponent(link.icon)}
              <span>{link.title}</span>
            </Button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

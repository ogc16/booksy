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


import { 
  BarChart, Briefcase, Calculator, Clock, CreditCard, FileText, 
  Home, Package, Receipt, ShieldCheck, ShoppingCart, Users 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/items", label: "Items", icon: Package },
  { href: "/banking", label: "Banking", icon: CreditCard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/estimates", label: "Estimates", icon: FileText },
  { href: "/retainer-invoices", label: "Retainer Invoices", icon: Receipt },
  { href: "/sales-orders", label: "Sales Orders", icon: ShoppingCart },
  { href: "/credit-notes", label: "Credit Notes", icon: Receipt },
  { href: "/purchases", label: "Purchases", icon: ShoppingCart },
  { href: "/time-tracking", label: "Time Tracking", icon: Clock },
  { href: "/accountant", label: "Accountant", icon: Calculator },
  { href: "/reports", label: "Reports", icon: BarChart },
  { href: "/admin", label: "Admin", icon: ShieldCheck },
];

export function NavLinks() {
  const location = useLocation();

  return (
    <nav className="space-y-1 px-2">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = location.pathname === link.href;

        return (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

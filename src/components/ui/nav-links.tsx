
import { 
  BarChart, Calculator, Clock, CreditCard, 
  Home, Package, ShieldCheck, ShoppingCart, Users 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/banking", label: "Banking", icon: CreditCard },
  { href: "/sales", label: "Sales", icon: ShoppingCart },
  { href: "/purchases", label: "Purchases", icon: ShoppingCart },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/time-tracking", label: "Time Tracking", icon: Clock },
  { href: "/accountant", label: "Accountant", icon: Calculator },
];

export function NavLinks() {
  const location = useLocation();
  const pathWithoutQuery = location.pathname.split('?')[0];

  return (
    <nav className="space-y-1 px-2">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathWithoutQuery === link.href;

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

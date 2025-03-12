
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { getNavLinks } from "@/components/ui/nav-links";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AppSidebar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Get nav links using the getNavLinks function
  const navLinks = getNavLinks(user?.role);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/placeholder.svg" 
            alt="Logo" 
            className="w-8 h-8"
          />
          <span className="font-semibold">Finance App</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      
      <SidebarContent>
        {user && (
          <div className="px-2 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Avatar>
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <div className="font-medium truncate">{user.name}</div>
                <div className="text-xs text-muted-foreground truncate capitalize">{user.role}</div>
              </div>
            </div>
          </div>
        )}
        <SidebarMenu>
          {navLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                onClick={() => navigate(link.href)}
              >
                <Button variant="ghost" className="w-full justify-start">
                  {link.icon === "LayoutDashboard" && <div className="w-4 h-4 mr-2"></div>}
                  {link.icon === "Building2" && <div className="w-4 h-4 mr-2"></div>}
                  {link.icon === "Receipt" && <div className="w-4 h-4 mr-2"></div>}
                  {link.icon === "ClipboardEdit" && <div className="w-4 h-4 mr-2"></div>}
                  {link.icon === "PackageCheck" && <div className="w-4 h-4 mr-2"></div>}
                  {link.icon === "Truck" && <div className="w-4 h-4 mr-2"></div>}
                  {link.icon === "ShoppingCart" && <div className="w-4 h-4 mr-2"></div>}
                  {link.icon === "BarChart2" && <div className="w-4 h-4 mr-2"></div>}
                  {link.icon === "Settings" && <div className="w-4 h-4 mr-2"></div>}
                  <span>{link.title}</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild onClick={handleLogout}>
              <Button variant="ghost" className="w-full justify-start">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

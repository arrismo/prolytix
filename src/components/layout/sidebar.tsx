
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BarChart4, 
  ClipboardList, 
  FileText, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  Settings, 
  Users, 
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Analytics",
      icon: BarChart4,
      href: "/analytics",
    },
    {
      title: "Surveys",
      icon: ClipboardList,
      href: "/surveys",
    },
    {
      title: "Providers",
      icon: Users,
      href: "/providers",
    },
    {
      title: "Assessments",
      icon: FileText,
      href: "/assessments",
    },
  ];
  
  const handleLogout = () => {
    // Remove authentication from session storage
    sessionStorage.removeItem("isAuthenticated");
    // Show success toast
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    // Navigate to login page
    navigate("/login");
  };
  
  const bottomNavItems = [
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
    {
      title: "Logout",
      icon: LogOut,
      onClick: handleLogout,
    },
  ];
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  // Close sidebar on mobile when clicking a link
  const handleLinkClick = () => {
    if (isMobile) {
      setCollapsed(true);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-4 w-4" />
      </Button>
    
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-all duration-200 lg:hidden",
          collapsed ? "hidden" : "block"
        )}
        onClick={toggleSidebar}
      />
    
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-card border-r border-border transition-all duration-200",
          collapsed ? "-translate-x-full" : "translate-x-0",
          "lg:translate-x-0",
          className
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b border-border px-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-prolytix-purple" />
              <span className="font-bold text-lg">Prolytix</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto lg:hidden"
              onClick={toggleSidebar}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        
          <nav className="flex-1 overflow-auto p-2">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </nav>
        
          <div className="border-t border-border p-2">
            <div className="space-y-1">
              {bottomNavItems.map((item) => (
                item.onClick ? (
                  <button
                    key={item.title}
                    onClick={() => {
                      handleLinkClick();
                      item.onClick();
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors text-muted-foreground hover:bg-muted text-left"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </button>
                ) : (
                  <Link
                    key={item.title}
                    to={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      location.pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

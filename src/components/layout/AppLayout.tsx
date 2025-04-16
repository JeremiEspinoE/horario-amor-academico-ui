
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { 
  Bell, 
  BookOpen, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Home, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  Settings, 
  Users, 
  BookText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const mainNavItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Faculty", path: "/faculty", icon: Users },
  { name: "Courses", path: "/courses", icon: BookOpen },
  { name: "Availability", path: "/availability", icon: Calendar },
  { name: "Schedule", path: "/schedule", icon: BookText },
  { name: "Settings", path: "/settings", icon: Settings }
];

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications",
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar text-sidebar-foreground fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border transition-all duration-300 ease-in-out",
          collapsed ? "w-[70px]" : "w-[250px]"
        )}
      >
        <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
          <Link 
            to="/dashboard"
            className="flex items-center gap-2 font-bold text-primary"
          >
            <Calendar className="h-6 w-6" />
            {!collapsed && <span>AcadScheduler</span>}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={toggleSidebar}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                  window.location.pathname === item.path && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Admin User</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/" className="flex items-center gap-2 w-full">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {!collapsed && <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@school.edu</p>
            </div>}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div 
        className={cn(
          "flex flex-col flex-1 transition-all duration-300 ease-in-out",
          collapsed ? "ml-[70px]" : "ml-[250px]"
        )}
      >
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center gap-4 px-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationClick}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

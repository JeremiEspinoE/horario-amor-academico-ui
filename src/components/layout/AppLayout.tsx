
import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
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
  BookText,
  UserCircle,
  FileSpreadsheet,
  TestTube
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
import { useAppContext } from "@/context/AppContext";

const getNavItems = (role: string) => {
  const adminItems = [
    { name: "Panel Principal", path: "/dashboard", icon: LayoutDashboard },
    { name: "Docentes", path: "/faculty", icon: Users },
    { name: "Asignaturas", path: "/courses", icon: BookOpen },
    { name: "Disponibilidad", path: "/availability", icon: Calendar },
    { name: "Horario", path: "/schedule", icon: BookText },
    { name: "Configuración", path: "/settings", icon: Settings }
  ];

  const teacherItems = [
    { name: "Mi Disponibilidad", path: "/availability", icon: Calendar },
    { name: "Mi Horario", path: "/schedule", icon: BookText },
    { name: "Mi Perfil", path: "/settings", icon: UserCircle }
  ];

  return role === "administrativo" ? adminItems : teacherItems;
};

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { userRole, isTestMode, setTestMode } = useAppContext();

  const mainNavItems = getNavItems(userRole || "");
  
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleTestModeToggle = () => {
    setTestMode(!isTestMode);
    toast({
      title: isTestMode ? "Modo normal activado" : "Modo de prueba activado",
      description: isTestMode ? "Has salido del modo de prueba" : "Ahora puedes hacer cambios sin afectar los datos reales"
    });
  };

  const handleNotificationClick = () => {
    toast({
      title: "Notificaciones",
      description: "No tienes notificaciones nuevas",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Banner de modo prueba */}
      {isTestMode && (
        <div className="bg-destructive text-destructive-foreground p-2 text-center font-medium">
          <TestTube className="inline-block mr-2 h-4 w-4" />
          Estás en modo prueba - Los cambios no afectarán los datos reales
        </div>
      )}

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={cn(
            "bg-sidebar text-sidebar-foreground fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border transition-all duration-300 ease-in-out",
            collapsed ? "w-[70px]" : "w-[250px]",
            isTestMode && "mt-10" // Ajustar posición si está en modo prueba
          )}
        >
          <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
            <Link 
              to="/dashboard"
              className="flex items-center gap-2 font-bold text-primary"
            >
              <Calendar className="h-6 w-6" />
              {!collapsed && <span>HorarioAcad</span>}
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
                      <AvatarImage src="" alt="Usuario" />
                      <AvatarFallback>
                        {userRole === "administrativo" ? "AD" : "DC"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {userRole === "administrativo" ? "Usuario Administrativo" : "Usuario Docente"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Configuración</DropdownMenuItem>
                  {userRole === "administrativo" && (
                    <DropdownMenuItem onClick={handleTestModeToggle}>
                      <div className="flex items-center gap-2 w-full">
                        <TestTube className="h-4 w-4" />
                        <span>{isTestMode ? "Desactivar modo prueba" : "Activar modo prueba"}</span>
                      </div>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <div className="flex items-center gap-2 w-full">
                      <LogOut className="h-4 w-4" />
                      <span>Cerrar sesión</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {!collapsed && <div>
                <p className="text-sm font-medium">
                  {userRole === "administrativo" ? "Usuario Administrativo" : "Usuario Docente"}
                </p>
                <p className="text-xs text-muted-foreground">usuario@escuela.edu</p>
              </div>}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div 
          className={cn(
            "flex flex-col flex-1 transition-all duration-300 ease-in-out",
            collapsed ? "ml-[70px]" : "ml-[250px]",
            isTestMode && "pt-10" // Ajustar contenido principal si está en modo prueba
          )}
        >
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
              {userRole === "administrativo" && (
                <Button
                  variant={isTestMode ? "destructive" : "outline"}
                  onClick={handleTestModeToggle}
                  size="sm"
                  className="mr-2"
                >
                  <TestTube className="mr-2 h-4 w-4" />
                  {isTestMode ? "Desactivar modo prueba" : "Modo prueba"}
                </Button>
              )}
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

          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

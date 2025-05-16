
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Book,
  Calendar,
  User,
  Settings,
  Menu,
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function ResponsiveNav() {
  const { userRole } = useAppContext();
  const isMobile = useIsMobile();
  const location = useLocation();

  const isTeacherView = userRole === "docente";

  const getActiveClass = (path: string) => {
    return location.pathname === path ? "bg-accent/50" : "";
  };

  const adminMenuItems = [
    {
      title: "Docentes",
      icon: <User className="w-4 h-4 mr-2" />,
      path: "/faculty",
      description: "Gestionar información de docentes",
    },
    {
      title: "Asignaturas y Programas",
      icon: <Book className="w-4 h-4 mr-2" />,
      path: "/courses",
      description: "Administrar asignaturas y programas académicos",
    },
    {
      title: "Disponibilidad",
      icon: <Calendar className="w-4 h-4 mr-2" />,
      path: "/availability",
      description: "Configurar disponibilidad de docentes",
    },
    {
      title: "Horarios",
      icon: <Calendar className="w-4 h-4 mr-2" />,
      path: "/schedule",
      description: "Gestionar programación de clases",
    },
    {
      title: "Configuración",
      icon: <Settings className="w-4 h-4 mr-2" />,
      path: "/settings",
      description: "Ajustes generales del sistema",
    },
  ];

  const teacherMenuItems = [
    {
      title: "Mi Horario",
      icon: <Calendar className="w-4 h-4 mr-2" />,
      path: "/schedule",
      description: "Ver mi horario asignado",
    },
    {
      title: "Mi Disponibilidad",
      icon: <Calendar className="w-4 h-4 mr-2" />,
      path: "/availability",
      description: "Configurar mi disponibilidad",
    },
    {
      title: "Mi Perfil",
      icon: <User className="w-4 h-4 mr-2" />,
      path: "/settings",
      description: "Gestionar información personal",
    },
  ];

  const menuItems = isTeacherView ? teacherMenuItems : adminMenuItems;

  // For small screen devices (mobile)
  if (isMobile) {
    return (
      <div className="w-full relative">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="px-2">
              <Menu className="h-5 w-5" />
              <span className="ml-2">Menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[75vw] sm:w-[350px]">
            <SheetHeader>
              <SheetTitle>Menú</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 py-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center py-2 px-4 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground",
                    getActiveClass(item.path)
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex overflow-x-auto py-2 hide-scrollbar">
          <div className="flex space-x-1 px-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                  getActiveClass(item.path)
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // For desktop view
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {isTeacherView ? (
          // Menú simplificado para docentes
          <>
            {teacherMenuItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <Link to={item.path}>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      getActiveClass(item.path),
                      "group flex items-center"
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </>
        ) : (
          // Menú completo para administradores
          <>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Académico
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] grid-cols-1 md:grid-cols-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/faculty"
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          getActiveClass("/faculty")
                        )}
                      >
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          <div className="text-sm font-medium leading-none">
                            Docentes
                          </div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Gestionar información de docentes
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/courses"
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          getActiveClass("/courses")
                        )}
                      >
                        <div className="flex items-center">
                          <Book className="w-4 h-4 mr-2" />
                          <div className="text-sm font-medium leading-none">
                            Asignaturas y Programas
                          </div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Administrar asignaturas y programas académicos
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Programación
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] grid-cols-1 md:grid-cols-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/availability"
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          getActiveClass("/availability")
                        )}
                      >
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <div className="text-sm font-medium leading-none">
                            Disponibilidad
                          </div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Configurar disponibilidad de docentes
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/schedule"
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          getActiveClass("/schedule")
                        )}
                      >
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <div className="text-sm font-medium leading-none">
                            Horarios
                          </div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Gestionar programación de clases
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/settings">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    getActiveClass("/settings"),
                    "flex items-center"
                  )}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configuración
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, LogOut } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AccountSettings() {
  const { userRole } = useAppContext();
  // Determine if we're showing teacher view or admin view
  const isTeacherView = userRole === "docente";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isTeacherView ? "Mi Perfil" : "Configuración de Cuenta"}</CardTitle>
        <CardDescription>
          {isTeacherView 
            ? "Administra tu información personal y preferencias" 
            : "Gestiona los detalles de tu cuenta y preferencias"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium">
                {isTeacherView ? "Usuario Docente" : "Usuario Administrador"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isTeacherView ? "docente@escuela.edu" : "admin@escuela.edu"}
              </p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">
              Cambiar Foto
            </Button>
          </div>
        </div>
        
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-medium">Información Personal</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">Nombre Completo</Label>
              <Input
                id="full-name"
                placeholder="Tu nombre"
                defaultValue={isTeacherView ? "Usuario Docente" : "Usuario Administrador"}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="Tu correo electrónico"
                defaultValue={isTeacherView ? "docente@escuela.edu" : "admin@escuela.edu"}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-medium">Contraseña</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Contraseña Actual</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Contraseña actual"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password">Nueva Contraseña</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Nueva contraseña"
              />
            </div>
          </div>
          
          <Button size="sm" className="w-full sm:w-auto">Cambiar Contraseña</Button>
        </div>
        
        {isTeacherView && (
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-medium">Información Académica</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidad</Label>
                <Input
                  id="specialty"
                  placeholder="Tu especialidad"
                  defaultValue="Matemáticas"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                <Input
                  id="department"
                  placeholder="Tu departamento"
                  defaultValue="Ciencias Exactas"
                />
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4 border-t pt-4">
          <h3 className="font-medium">Preferencias de Interfaz</h3>
          <div className="space-y-2">
            <Label htmlFor="language">Idioma</Label>
            <Select defaultValue="es">
              <SelectTrigger id="language">
                <SelectValue placeholder="Seleccionar idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">Inglés</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Francés</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full sm:w-auto">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar Cierre de Sesión</AlertDialogTitle>
                <AlertDialogDescription>
                  ¿Estás seguro de que deseas cerrar sesión en el sistema?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                <AlertDialogCancel className="w-full sm:w-auto">Cancelar</AlertDialogCancel>
                <AlertDialogAction className="w-full sm:w-auto">Cerrar Sesión</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}

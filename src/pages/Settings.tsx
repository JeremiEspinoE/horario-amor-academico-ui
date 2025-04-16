
import { useState } from "react";
import {
  Check,
  LogOut,
  Save,
  Settings as SettingsIcon,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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

export default function Settings() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("academic-periods");
  
  const handleSaveSettings = () => {
    toast({
      title: "Configuración Guardada",
      description: "La configuración se ha guardado correctamente.",
      action: (
        <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
          <Check className="h-4 w-4 text-primary" />
        </div>
      ),
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Configuración</h1>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="academic-periods">Periodos Académicos</TabsTrigger>
          <TabsTrigger value="room-types">Tipos de Aula</TabsTrigger>
          <TabsTrigger value="general">Configuración General</TabsTrigger>
          <TabsTrigger value="account">Cuenta</TabsTrigger>
        </TabsList>
        
        <TabsContent value="academic-periods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Periodos Académicos</CardTitle>
              <CardDescription>
                Gestiona periodos académicos y de programación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Periodo Actual</h3>
                  <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    Activo
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-period-name">Nombre del Periodo</Label>
                    <Input
                      id="current-period-name"
                      placeholder="Nombre del periodo"
                      defaultValue="Primavera 2025"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-period-status">Estado</Label>
                    <Select defaultValue="active">
                      <SelectTrigger id="current-period-status">
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planificación</SelectItem>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="completed">Completado</SelectItem>
                        <SelectItem value="archived">Archivado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-period-start">Fecha de Inicio</Label>
                    <Input
                      id="current-period-start"
                      type="date"
                      defaultValue="2025-01-15"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="current-period-end">Fecha de Fin</Label>
                    <Input
                      id="current-period-end"
                      type="date"
                      defaultValue="2025-05-15"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-4">Próximos Periodos</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-md p-4">
                    <div>
                      <Label className="mb-1 block">Nombre del Periodo</Label>
                      <Input defaultValue="Otoño 2025" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="mb-1 block">Fecha de Inicio</Label>
                        <Input type="date" defaultValue="2025-09-01" />
                      </div>
                      <div>
                        <Label className="mb-1 block">Fecha de Fin</Label>
                        <Input type="date" defaultValue="2025-12-15" />
                      </div>
                    </div>
                    
                    <div className="flex items-end">
                      <Button className="w-full" variant="outline">
                        Configurar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-md p-4">
                    <div>
                      <Label className="mb-1 block">Nombre del Periodo</Label>
                      <Input defaultValue="Primavera 2026" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="mb-1 block">Fecha de Inicio</Label>
                        <Input type="date" defaultValue="2026-01-15" />
                      </div>
                      <div>
                        <Label className="mb-1 block">Fecha de Fin</Label>
                        <Input type="date" defaultValue="2026-05-15" />
                      </div>
                    </div>
                    
                    <div className="flex items-end">
                      <Button className="w-full" variant="outline">
                        Configurar
                      </Button>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Agregar Nuevo Periodo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="room-types" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Aula e Instalaciones</CardTitle>
              <CardDescription>
                Configura tipos de aulas y sus capacidades
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3 border-b">Tipo de Aula</th>
                      <th className="text-left p-3 border-b">Capacidad</th>
                      <th className="text-left p-3 border-b">Instalaciones</th>
                      <th className="text-left p-3 border-b">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3">
                        <Input defaultValue="Auditorio" />
                      </td>
                      <td className="p-3">
                        <Input type="number" defaultValue="120" />
                      </td>
                      <td className="p-3">
                        <Input defaultValue="Proyector, Sistema de Audio, Computadora" />
                      </td>
                      <td className="p-3">
                        <Button variant="outline" size="sm">Editar</Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">
                        <Input defaultValue="Laboratorio" />
                      </td>
                      <td className="p-3">
                        <Input type="number" defaultValue="30" />
                      </td>
                      <td className="p-3">
                        <Input defaultValue="Computadoras, Equipo Especializado" />
                      </td>
                      <td className="p-3">
                        <Button variant="outline" size="sm">Editar</Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">
                        <Input defaultValue="Aula Regular" />
                      </td>
                      <td className="p-3">
                        <Input type="number" defaultValue="40" />
                      </td>
                      <td className="p-3">
                        <Input defaultValue="Pizarrón, Proyector" />
                      </td>
                      <td className="p-3">
                        <Button variant="outline" size="sm">Editar</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3">
                        <Input placeholder="Agregar nuevo tipo..." />
                      </td>
                      <td className="p-3">
                        <Input type="number" placeholder="Capacidad" />
                      </td>
                      <td className="p-3">
                        <Input placeholder="Instalaciones (separadas por comas)" />
                      </td>
                      <td className="p-3">
                        <Button size="sm">Agregar</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>
                Configura ajustes generales del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="institution-name">Nombre de la Institución</Label>
                  <Input
                    id="institution-name"
                    placeholder="Nombre de la institución"
                    defaultValue="Universidad Académica"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="schedule-slots">Duración Predeterminada de Hora Clase (minutos)</Label>
                  <Select defaultValue="60">
                    <SelectTrigger id="schedule-slots">
                      <SelectValue placeholder="Selecciona duración" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="45">45 minutos</SelectItem>
                      <SelectItem value="60">60 minutos</SelectItem>
                      <SelectItem value="90">90 minutos</SelectItem>
                      <SelectItem value="120">120 minutos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="schedule-start">Hora de Inicio de Horario</Label>
                  <Select defaultValue="8">
                    <SelectTrigger id="schedule-start">
                      <SelectValue placeholder="Selecciona hora de inicio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7:00 AM</SelectItem>
                      <SelectItem value="8">8:00 AM</SelectItem>
                      <SelectItem value="9">9:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="schedule-end">Hora de Fin de Horario</Label>
                  <Select defaultValue="21">
                    <SelectTrigger id="schedule-end">
                      <SelectValue placeholder="Selecciona hora de fin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="17">5:00 PM</SelectItem>
                      <SelectItem value="18">6:00 PM</SelectItem>
                      <SelectItem value="19">7:00 PM</SelectItem>
                      <SelectItem value="20">8:00 PM</SelectItem>
                      <SelectItem value="21">9:00 PM</SelectItem>
                      <SelectItem value="22">10:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="week-days">Días Laborables</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="bg-primary/20">Lunes</Button>
                    <Button size="sm" variant="outline" className="bg-primary/20">Martes</Button>
                    <Button size="sm" variant="outline" className="bg-primary/20">Miércoles</Button>
                    <Button size="sm" variant="outline" className="bg-primary/20">Jueves</Button>
                    <Button size="sm" variant="outline" className="bg-primary/20">Viernes</Button>
                    <Button size="sm" variant="outline">Sábado</Button>
                    <Button size="sm" variant="outline">Domingo</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Cuenta</CardTitle>
              <CardDescription>
                Gestiona los detalles de tu cuenta y preferencias
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Usuario Administrador</h3>
                    <p className="text-sm text-muted-foreground">admin@escuela.edu</p>
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
                      defaultValue="Usuario Administrador"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Tu correo electrónico"
                      defaultValue="admin@escuela.edu"
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
                
                <Button size="sm">Cambiar Contraseña</Button>
              </div>
              
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
                    <Button variant="destructive">
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
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction>Cerrar Sesión</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

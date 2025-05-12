
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
import { ClassroomType, ClassroomTypes } from "@/components/Classroom/ClassroomTypes";
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from "@/context/AppContext";
import InstitucionNombre from "./gestion_academica/InstitucionNombre";
import PeriodoAcademico from "./gestion_academica/PeriodoAcademico";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Settings() {
  const { toast } = useToast();
  const { userRole, classroomTypes: contextClassroomTypes, setClassroomTypes: setContextClassroomTypes } = useAppContext();
  const isMobile = useIsMobile();
  
  // Only admin can see all tabs, teachers will only see account tab
  const [activeTab, setActiveTab] = useState(userRole === "administrativo" ? "academic-periods" : "account");
  
  // Convertir los tipos de aula del contexto al formato requerido por el componente ClassroomTypes
  const [classroomTypes, setClassroomTypes] = useState<ClassroomType[]>([
    { id: "type1", name: "Aula de Teoría", description: "Para clases teóricas regulares", count: 3, color: "#4f46e5" },
    { id: "type2", name: "Laboratorio", description: "Para prácticas y experimentos", count: 2, color: "#06b6d4" }
  ]);

  const handleAddClassroomType = (type: Omit<ClassroomType, "id">) => {
    const newType = {
      ...type,
      id: uuidv4()
    };
    setClassroomTypes([...classroomTypes, newType]);
    
    // Actualizar también en el contexto global
    const newContextType = {
      id: newType.id,
      name: newType.name,
      availableCount: newType.count
    };
    setContextClassroomTypes([...contextClassroomTypes, newContextType]);
  };

  const handleEditClassroomType = (id: string, updatedData: Partial<ClassroomType>) => {
    const updatedTypes = classroomTypes.map(type => 
      type.id === id ? { ...type, ...updatedData } : type
    );
    setClassroomTypes(updatedTypes);
    
    // Actualizar también en el contexto global
    if (updatedData.name || updatedData.count !== undefined) {
      const updatedContextTypes = contextClassroomTypes.map(type => 
        type.id === id ? { 
          ...type, 
          name: updatedData.name || type.name,
          availableCount: updatedData.count !== undefined ? updatedData.count : type.availableCount
        } : type
      );
      setContextClassroomTypes(updatedContextTypes);
    }
  };

  const handleDeleteClassroomType = (id: string) => {
    const filteredTypes = classroomTypes.filter(type => type.id !== id);
    setClassroomTypes(filteredTypes);
    
    // Actualizar también en el contexto global
    const filteredContextTypes = contextClassroomTypes.filter(type => type.id !== id);
    setContextClassroomTypes(filteredContextTypes);
  };
  
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

  // Determine if we're showing teacher view or admin view
  const isTeacherView = userRole === "docente";

  return (
    <div className="space-y-6 animate-fade-in px-2 sm:px-4 md:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold">
          {isTeacherView ? "Mi Perfil" : "Configuración"}
        </h1>
        {!isTeacherView && (
          <Button onClick={handleSaveSettings} className="w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        {/* Only show all tabs for administrators */}
        {!isTeacherView ? (
          <TabsList className="w-full overflow-x-auto flex-nowrap flex justify-start sm:justify-center">
            <TabsTrigger value="academic-periods" className="whitespace-nowrap">Periodos Académicos</TabsTrigger>
            <TabsTrigger value="room-types" className="whitespace-nowrap">Tipos de Aula</TabsTrigger>
            <TabsTrigger value="general" className="whitespace-nowrap">Configuración General</TabsTrigger>
            <TabsTrigger value="account" className="whitespace-nowrap">Cuenta</TabsTrigger>
          </TabsList>
        ) : (
          <TabsList>
            <TabsTrigger value="account">Mi Perfil</TabsTrigger>
          </TabsList>
        )}
        
        {!isTeacherView && (
          <>
            {/* Gestion de Periodo */}
             {/* Gestion de Periodo */}
            <TabsContent value="academic-periods" className="space-y-4">
              <PeriodoAcademico />
            </TabsContent>
            <TabsContent value="room-types" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tipos de Aula</CardTitle>
                  <CardDescription>
                    Configura tipos de aulas, cantidades y asigna nombres a cada aula
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ClassroomTypes
                    classroomTypes={classroomTypes}
                    onAddType={handleAddClassroomType}
                    onEditType={handleEditClassroomType}
                    onDeleteType={handleDeleteClassroomType}
                  />
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
                    {/*Configuracion de Institucion */}
                    <InstitucionNombre />
                    
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
          </>
        )}
        
        <TabsContent value="account" className="space-y-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

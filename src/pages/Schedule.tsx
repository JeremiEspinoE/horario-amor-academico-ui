import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Info,
  Search,
  TestTube,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
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
import { ExcelExport } from "@/components/Schedule/ExcelExport";
import { useAppContext } from "@/context/AppContext";
import { HierarchicalSelect, Institution, Career, Subject } from "@/components/Hierarchical/HierarchicalSelect";
import { useToast } from "@/hooks/use-toast";
import ManualScheduleCreator from "@/components/Schedule/ManualScheduleCreator";

// ... keep existing code (Course, TimeSlot, ScheduleType interfaces)

export default function Schedule() {
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const timeSlots = Array.from({ length: 14 }, (_, i) => 8 + i); // 8 AM to 9 PM
  const { toast } = useToast();

  const formatTimeSlot = (hour: number) => {
    return `${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`;
  };

  // Sample schedule data with some conflicts
  const initialSchedule: ScheduleType = {
    Lunes: Array.from({ length: 14 }, () => ({ courses: [] })),
    Martes: Array.from({ length: 14 }, () => ({ courses: [] })),
    Miércoles: Array.from({ length: 14 }, () => ({ courses: [] })),
    Jueves: Array.from({ length: 14 }, () => ({ courses: [] })),
    Viernes: Array.from({ length: 14 }, () => ({ courses: [] })),
  };

  // Añadir algunos cursos de ejemplo
  initialSchedule.Lunes[1].courses.push({
    code: "CS101",
    name: "Intro a Programación",
    room: "CIE-101",
    faculty: "Dra. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Lunes[2].courses.push({
    code: "CS101",
    name: "Intro a Programación",
    room: "CIE-101",
    faculty: "Dra. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Miércoles[1].courses.push({
    code: "CS101",
    name: "Intro a Programación",
    room: "CIE-101",
    faculty: "Dra. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Miércoles[2].courses.push({
    code: "CS101",
    name: "Intro a Programación",
    room: "CIE-101",
    faculty: "Dra. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Martes[3].courses.push({
    code: "MATH201",
    name: "Cálculo I",
    room: "CIE-203",
    faculty: "Dra. Sarah Williams",
    colorClass: "bg-faculty-600 text-white",
  });

  initialSchedule.Martes[4].courses.push({
    code: "MATH201",
    name: "Cálculo I",
    room: "CIE-203",
    faculty: "Dra. Sarah Williams",
    colorClass: "bg-faculty-600 text-white",
  });

  initialSchedule.Jueves[3].courses.push({
    code: "MATH201",
    name: "Cálculo I",
    room: "CIE-203",
    faculty: "Dra. Sarah Williams",
    colorClass: "bg-faculty-600 text-white",
  });

  initialSchedule.Jueves[4].courses.push({
    code: "MATH201",
    name: "Cálculo I",
    room: "CIE-203",
    faculty: "Dra. Sarah Williams",
    colorClass: "bg-faculty-600 text-white",
  });

  initialSchedule.Martes[6].courses.push({
    code: "BUS101",
    name: "Intro a Negocios",
    room: "NEG-301",
    faculty: "Prof. Michael Johnson",
    colorClass: "bg-course-600 text-white",
  });

  initialSchedule.Martes[7].courses.push({
    code: "BUS101",
    name: "Intro a Negocios",
    room: "NEG-301",
    faculty: "Prof. Michael Johnson",
    colorClass: "bg-course-600 text-white",
  });

  initialSchedule.Jueves[6].courses.push({
    code: "BUS101",
    name: "Intro a Negocios",
    room: "NEG-301",
    faculty: "Prof. Michael Johnson",
    colorClass: "bg-course-600 text-white",
  });

  initialSchedule.Jueves[7].courses.push({
    code: "BUS101",
    name: "Intro a Negocios",
    room: "NEG-301",
    faculty: "Prof. Michael Johnson",
    colorClass: "bg-course-600 text-white",
  });

  // Add a conflict
  initialSchedule.Lunes[5].courses.push({
    code: "CS201",
    name: "Estructura de Datos",
    room: "CIE-102",
    faculty: "Dra. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Lunes[5].courses.push({
    code: "PHYS101",
    name: "Física I",
    room: "CIE-102",
    faculty: "Dr. Robert Lee",
    colorClass: "bg-room-600 text-white",
    hasConflict: true,
  });

  initialSchedule.Lunes[6].courses.push({
    code: "CS201",
    name: "Estructura de Datos",
    room: "CIE-102",
    faculty: "Dra. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Lunes[6].courses.push({
    code: "PHYS101",
    name: "Física I",
    room: "CIE-102",
    faculty: "Dr. Robert Lee",
    colorClass: "bg-room-600 text-white",
    hasConflict: true,
  });

  const [schedule, setSchedule] = useState<ScheduleType>(initialSchedule);
  const [currentPeriod, setCurrentPeriod] = useState("Primavera 2025");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasErrors, setHasErrors] = useState(true); // Para el botón de publicación
  const { userRole, isTestMode, sections } = useAppContext();

  // Estado para filtrar por sección
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>("");

  // Datos de ejemplo para el selector jerárquico
  const [institutions] = useState<Institution[]>([
    { id: "inst1", name: "Universidad Central" },
    { id: "inst2", name: "Instituto Tecnológico" }
  ]);
  
  const [careers] = useState<Career[]>([
    { id: "car1", name: "Ingeniería de Software", institutionId: "inst1" },
    { id: "car2", name: "Ciencias de la Computación", institutionId: "inst1" },
    { id: "car3", name: "Administración de Empresas", institutionId: "inst2" },
    { id: "car4", name: "Marketing Digital", institutionId: "inst2" }
  ]);
  
  const [subjects] = useState<Subject[]>([
    { id: "sub1", code: "CS101", name: "Introducción a la Programación", careerId: "car1", hoursPerWeek: 6, requiredRoomType: "Laboratorio" },
    { id: "sub2", code: "CS201", name: "Estructura de Datos", careerId: "car1", hoursPerWeek: 4, requiredRoomType: "Laboratorio" },
    { id: "sub3", code: "MATH101", name: "Cálculo I", careerId: "car1", hoursPerWeek: 6 },
    { id: "sub4", code: "MATH201", name: "Cálculo II", careerId: "car2", hoursPerWeek: 4, specialty: "Matemáticas" },
    { id: "sub5", code: "BUS101", name: "Introducción a los Negocios", careerId: "car3", hoursPerWeek: 4, specialty: "Negocios" },
    { id: "sub6", code: "MKT101", name: "Fundamentos de Marketing", careerId: "car4", hoursPerWeek: 4 }
  ]);
  
  // Estado para la selección jerárquica
  const [currentSelection, setCurrentSelection] = useState<{
    institution: Institution | null;
    career: Career | null;
    subject: Subject | null;
  }>({
    institution: null,
    career: null,
    subject: null
  });

  // Verificar si hay errores en el horario (conflictos)
  useEffect(() => {
    let conflicts = false;
    
    for (const day in schedule) {
      for (const slot of schedule[day]) {
        if (slot.courses.length > 1) {
          conflicts = true;
          break;
        }
      }
      if (conflicts) break;
    }
    
    setHasErrors(conflicts);
  }, [schedule]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Generar horario automáticamente (placeholder)
  const generateAutomaticSchedule = () => {
    if (!currentSelection.career) {
      toast({
        title: "Selección incompleta",
        description: "Debe seleccionar una carrera antes de generar el horario automáticamente.",
        variant: "destructive"
      });
      return;
    }
    
    // En un caso real, aquí tendríamos un algoritmo complejo
    // Por ahora, solo simularemos que limpia los conflictos
    
    const newSchedule = JSON.parse(JSON.stringify(schedule)) as ScheduleType;
    
    // Elimina conflictos colocando solo un curso por slot
    for (const day in newSchedule) {
      for (const slot of newSchedule[day]) {
        if (slot.courses.length > 1) {
          // Mantén solo el primer curso
          slot.courses = [slot.courses[0]];
        }
      }
    }
    
    setSchedule(newSchedule);

    toast({
      title: "Horario generado",
      description: `Horario automático generado para ${currentSelection.career.name}`,
    });
  };

  // Manejar la creación de un nuevo horario manual
  const handleManualScheduleCreate = (courseItem: any) => {
    const { day, hour, ...courseDetails } = courseItem;
    
    // Crear una copia del horario actual
    const newSchedule = JSON.parse(JSON.stringify(schedule)) as ScheduleType;
    
    // Verificar si ya hay un curso en ese horario para esa aula o docente
    const existingCourses = newSchedule[day][hour - 8].courses;
    
    const conflictWithRoom = existingCourses.some(course => course.room === courseDetails.classroom);
    const conflictWithTeacher = existingCourses.some(course => course.faculty === courseDetails.teacher);
    
    if (conflictWithRoom || conflictWithTeacher) {
      // Marcar el conflicto
      newSchedule[day][hour - 8].courses.push({
        ...courseDetails,
        code: courseDetails.code,
        name: courseDetails.name,
        room: courseDetails.classroom,
        faculty: courseDetails.teacher,
        colorClass: courseDetails.colorClass,
        hasConflict: true
      });
    } else {
      // Agregar el curso sin conflicto
      newSchedule[day][hour - 8].courses.push({
        ...courseDetails,
        code: courseDetails.code,
        name: courseDetails.name,
        room: courseDetails.classroom,
        faculty: courseDetails.teacher,
        colorClass: courseDetails.colorClass
      });
    }
    
    setSchedule(newSchedule);
  };

  // Preparar datos para exportar a Excel
  const prepareDataForExcel = () => {
    const excelData = [];
    
    for (const day of daysOfWeek) {
      for (let i = 0; i < timeSlots.length; i++) {
        const slot = schedule[day][i];
        if (slot.courses.length > 0) {
          for (const course of slot.courses) {
            excelData.push({
              Día: day,
              Hora: formatTimeSlot(timeSlots[i]),
              Curso: `${course.code} - ${course.name}`,
              Aula: course.room,
              Docente: course.faculty,
              Sección: course.section || "General",
              Conflicto: slot.courses.length > 1 ? "Sí" : "No"
            });
          }
        }
      }
    }
    
    return excelData;
  };

  // Filter schedule based on search query and section
  const filteredSchedule = () => {
    let filteredSch = JSON.parse(JSON.stringify(schedule)) as ScheduleType;
    
    // Aplicar filtro de búsqueda
    if (searchQuery) {
      for (const day in filteredSch) {
        for (let i = 0; i < filteredSch[day].length; i++) {
          filteredSch[day][i].courses = filteredSch[day][i].courses.filter(
            (course) =>
              course.code.toLowerCase().includes(searchQuery) ||
              course.name.toLowerCase().includes(searchQuery) ||
              course.room.toLowerCase().includes(searchQuery) ||
              course.faculty.toLowerCase().includes(searchQuery) ||
              (course.section && course.section.toLowerCase().includes(searchQuery))
          );
        }
      }
    }
    
    // Aplicar filtro de sección si está seleccionado
    if (selectedSectionFilter) {
      for (const day in filteredSch) {
        for (let i = 0; i < filteredSch[day].length; i++) {
          filteredSch[day][i].courses = filteredSch[day][i].courses.filter(
            (course) => course.section === selectedSectionFilter
          );
        }
      }
    }
    
    // Si es un docente, solo mostrar sus cursos
    if (userRole === "docente") {
      const teacherName = "Dra. Jane Smith"; // En un caso real, esto vendría del usuario logueado
      
      for (const day in filteredSch) {
        for (let i = 0; i < filteredSch[day].length; i++) {
          filteredSch[day][i].courses = filteredSch[day][i].courses.filter(
            (course) => course.faculty === teacherName
          );
        }
      }
    }
    
    return filteredSch;
  };

  // Verificar si se ha seleccionado una carrera para habilitar funciones
  const isScheduleEnabled = currentSelection.career !== null;

  // Obtener secciones disponibles para la carrera seleccionada
  const availableSections = currentSelection.career 
    ? sections.filter(section => section.careerId === currentSelection.career.id).map(s => s.name)
    : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Horario</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-3 font-medium">{currentPeriod}</span>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Botón para generar horario automático (solo para administradores) */}
          {userRole === "administrativo" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  disabled={!isScheduleEnabled}
                  className="relative"
                  onClick={(e) => {
                    if (!isScheduleEnabled) {
                      e.preventDefault();
                      toast({
                        title: "Selección requerida",
                        description: "Seleccione una institución y una carrera antes de generar el horario",
                        variant: "destructive"
                      });
                    }
                  }}
                >
                  <TestTube className="mr-2 h-4 w-4" />
                  Generar automáticamente
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Generar horario automático</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción intentará generar un horario automático optimizado sin conflictos.
                    {isTestMode
                      ? "No se preocupe, estás en modo prueba, por lo que no afectará los datos reales."
                      : "Esta acción modificará el horario actual."}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={generateAutomaticSchedule}>
                    Generar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                disabled={(hasErrors && !isTestMode) || !isScheduleEnabled}
                onClick={(e) => {
                  if (!isScheduleEnabled) {
                    e.preventDefault();
                    toast({
                      title: "Selección requerida",
                      description: "Seleccione una institución y una carrera antes de publicar el horario",
                      variant: "destructive"
                    });
                  }
                }}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                Publicar Horario
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Publicar Horario</AlertDialogTitle>
                <AlertDialogDescription>
                  ¿Estás seguro de que deseas publicar el horario de {currentPeriod}? Esto lo hará
                  visible para todos los docentes y estudiantes.
                  {hasErrors && (
                    <div className="mt-2 p-2 bg-destructive/10 text-destructive rounded-md flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span>
                        Hay conflictos en el horario que deben resolverse antes de publicar.
                        {isTestMode && " Sin embargo, en modo prueba puedes publicar de todos modos."}
                      </span>
                    </div>
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction>Publicar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <ExcelExport 
            data={prepareDataForExcel()} 
            title={currentPeriod} 
            filename={`horario_${currentPeriod.replace(/\s+/g, '_').toLowerCase()}`} 
          />
        </div>
      </div>

      {/* Selector Jerárquico */}
      <div className="mb-6">
        <HierarchicalSelect
          institutions={institutions}
          careers={careers}
          subjects={subjects}
          onSelectionChange={setCurrentSelection}
        />
      </div>

      {/* Componente de creación manual de horario (solo para administradores) */}
      {userRole === "administrativo" && isScheduleEnabled && (
        <ManualScheduleCreator 
          institutions={institutions}
          careers={careers}
          subjects={subjects}
          onScheduleCreate={handleManualScheduleCreate}
        />
      )}

      {!isScheduleEnabled && (
        <div className="bg-muted/70 border rounded-md p-4 mb-4 flex items-center gap-2">
          <Info className="h-5 w-5 text-muted-foreground" />
          <p className="text-muted-foreground">Seleccione una institución y carrera para habilitar el diseño del horario.</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar en horario..." className="pl-10" onChange={handleSearch} disabled={!isScheduleEnabled} />
        </div>
        <Popover open={showFilters} onOpenChange={setShowFilters}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-[150px]" disabled={!isScheduleEnabled}>
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] p-4">
            <div className="grid gap-4">
              {/* Filtro por sección si es administrador */}
              {userRole === "administrativo" && isScheduleEnabled && availableSections.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Sección</h4>
                  <Select
                    value={selectedSectionFilter}
                    onValueChange={setSelectedSectionFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todas las secciones" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas las secciones</SelectItem>
                      {availableSections.map((section, index) => (
                        <SelectItem key={index} value={section}>
                          {section}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium text-sm">Departamento</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="comp-sci" />
                    <label
                      htmlFor="comp-sci"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Informática
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="business" />
                    <label
                      htmlFor="business"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Negocios
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="math" />
                    <label
                      htmlFor="math"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Matemáticas
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Opciones de visualización</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="show-conflicts" defaultChecked />
                    <label
                      htmlFor="show-conflicts"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Resaltar conflictos
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="show-empty" />
                    <label
                      htmlFor="show-empty"
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Ocultar espacios vacíos
                    </label>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setShowFilters(false)}
              >
                Aplicar Filtros
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className={cn("border rounded-md overflow-auto", !isScheduleEnabled && "opacity-50 pointer-events-none")}>
        <div className="grid grid-cols-[auto_repeat(5,1fr)] min-w-[800px]">
          <div className="bg-muted/50 border-b border-r p-3 font-medium">Hora</div>
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="bg-muted/50 border-b last:border-r-0 border-r p-3 text-center font-medium"
            >
              {day}
            </div>
          ))}

          {timeSlots.map((hour, timeIndex) => (
            <React.Fragment key={hour}>
              <div className="border-b last:border-b-0 border-r bg-muted/25 p-3 whitespace-nowrap">
                {formatTimeSlot(hour)}
              </div>

              {daysOfWeek.map((day) => {
                const slot = filteredSchedule()[day][timeIndex];
                const hasConflict = slot.courses.length > 1;

                return (
                  <div
                    key={`${day}-${hour}`}
                    className={cn(
                      "border-b last:border-b-0 border-r last:border-r-0 p-2",
                      "schedule-cell",
                      hasConflict && "bg-destructive/10"
                    )}
                  >
                    {slot.courses.map((course, idx) => (
                      <div
                        key={`${course.code}-${idx}`}
                        className={cn(
                          "schedule-item",
                          course.colorClass,
                          course.hasConflict && "border-2 border-destructive"
                        )}
                      >
                        <div className="font-semibold">{course.code}</div>
                        <div className="text-[10px] md:text-xs truncate">{course.name}</div>
                        <div className="text-[10px] md:text-xs opacity-90">
                          {course.room} • {course.faculty}
                        </div>
                        {course.section && (
                          <div className="text-[10px] md:text-xs opacity-80">
                            Sección: {course.section}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-academic-600"></div>
          <span className="text-sm">Informática</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-faculty-600"></div>
          <span className="text-sm">Matemáticas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-course-600"></div>
          <span className="text-sm">Negocios</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-room-600"></div>
          <span className="text-sm">Física</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-destructive"></div>
          <span className="text-sm">Conflictos</span>
        </div>
      </div>
    </div>
  );
}

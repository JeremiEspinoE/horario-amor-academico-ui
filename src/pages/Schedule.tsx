import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
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

type Course = {
  code: string;
  name: string;
  room: string;
  faculty: string;
  colorClass: string;
  hasConflict?: boolean;
};

type TimeSlot = {
  courses: Course[];
};

type ScheduleType = Record<string, TimeSlot[]>;

export default function Schedule() {
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const timeSlots = Array.from({ length: 14 }, (_, i) => 8 + i); // 8 AM to 9 PM

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
  const { isTestMode } = useAppContext();

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
              Conflicto: slot.courses.length > 1 ? "Sí" : "No"
            });
          }
        }
      }
    }
    
    return excelData;
  };

  // Filter schedule based on search query
  const filteredSchedule = () => {
    if (!searchQuery) return schedule;

    const filteredSch = JSON.parse(JSON.stringify(schedule)) as ScheduleType;

    for (const day in filteredSch) {
      for (let i = 0; i < filteredSch[day].length; i++) {
        filteredSch[day][i].courses = filteredSch[day][i].courses.filter(
          (course) =>
            course.code.toLowerCase().includes(searchQuery) ||
            course.name.toLowerCase().includes(searchQuery) ||
            course.room.toLowerCase().includes(searchQuery) ||
            course.faculty.toLowerCase().includes(searchQuery)
        );
      }
    }

    return filteredSch;
  };

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
          {useAppContext().userRole === "administrativo" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
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
              <Button variant="outline" disabled={hasErrors && !isTestMode}>
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

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar en horario..." className="pl-10" onChange={handleSearch} />
        </div>
        <Popover open={showFilters} onOpenChange={setShowFilters}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-[150px]">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] p-4">
            <div className="grid gap-4">
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

      <div className="border rounded-md overflow-auto">
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


import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";
import { HierarchicalSelect, Institution, Career, Subject } from '@/components/Hierarchical/HierarchicalSelect';
import ManualScheduleCreator from "@/components/Schedule/ManualScheduleCreator";
import ScheduleHeader from "@/components/Schedule/ScheduleHeader";
import ScheduleFilters from "@/components/Schedule/ScheduleFilters";
import ScheduleDisplay from "@/components/Schedule/ScheduleDisplay";
import ScheduleLegend from "@/components/Schedule/ScheduleLegend";
import SelectionNotice from "@/components/Schedule/SelectionNotice";
import { ScheduleType } from "@/types/schedule";
import { createInitialSchedule } from "@/utils/sampleScheduleData";
import { careers, subjects } from "@/utils/sampleScheduleData";

export default function Schedule() {
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const timeSlots = Array.from({ length: 14 }, (_, i) => 8 + i); // 8 AM to 9 PM
  const { toast } = useToast();

  // Use the sample schedule data without passing arguments
  const [schedule, setSchedule] = useState<ScheduleType>(createInitialSchedule());
  const [currentPeriod, setCurrentPeriod] = useState("Primavera 2025");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasErrors, setHasErrors] = useState(true); // Para el botón de publicación
  const { userRole, isTestMode, sections, semesters } = useAppContext();

  // Estado para filtrar por sección y semestre
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>("");
  const [selectedSemesterFilter, setSelectedSemesterFilter] = useState<string>("");

  // Datos de ejemplo para el selector jerárquico
  const [institutions] = useState<Institution[]>([
    { id: "inst1", name: "Universidad Central" },
    { id: "inst2", name: "Instituto Tecnológico" }
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

  // Función para formatear la hora
  const formatTimeSlot = (hour: number) => {
    return `${hour % 12 || 12}:00 ${hour < 12 ? "AM" : "PM"}`;
  };

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

  // Generar horario automáticamente 
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
        section: courseDetails.section,
        semester: courseDetails.semester,
        colorClass: courseDetails.colorClass,
        startHour: courseDetails.startHour,
        endHour: courseDetails.endHour,
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
        section: courseDetails.section,
        semester: courseDetails.semester,
        colorClass: courseDetails.colorClass,
        startHour: courseDetails.startHour,
        endHour: courseDetails.endHour
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
              Semestre: course.semester || "No especificado",
              Conflicto: slot.courses.length > 1 ? "Sí" : "No"
            });
          }
        }
      }
    }
    
    return excelData;
  };

  // Filter schedule based on search query, section, and semester
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
              (course.section && course.section.toLowerCase().includes(searchQuery)) ||
              (course.semester && course.semester.toLowerCase().includes(searchQuery))
          );
        }
      }
    }
    
    // Aplicar filtro de semestre si está seleccionado
    if (selectedSemesterFilter) {
      for (const day in filteredSch) {
        for (let i = 0; i < filteredSch[day].length; i++) {
          filteredSch[day][i].courses = filteredSch[day][i].courses.filter(
            (course) => course.semester === selectedSemesterFilter
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

  // Obtener semestres disponibles para la carrera seleccionada
  const availableSemesters = currentSelection.career && semesters
    ? semesters.filter(semester => semester.careerId === currentSelection.career!.id).map(s => s.name)
    : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <ScheduleHeader
        currentPeriod={currentPeriod}
        userRole={userRole}
        isTestMode={isTestMode}
        hasErrors={hasErrors}
        isScheduleEnabled={isScheduleEnabled}
        generateAutomaticSchedule={generateAutomaticSchedule}
        prepareDataForExcel={prepareDataForExcel}
      />

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

      <SelectionNotice isScheduleEnabled={isScheduleEnabled} />

      <ScheduleFilters
        isScheduleEnabled={isScheduleEnabled}
        handleSearch={handleSearch}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        selectedSectionFilter={selectedSectionFilter}
        setSelectedSectionFilter={setSelectedSectionFilter}
        selectedSemesterFilter={selectedSemesterFilter}
        setSelectedSemesterFilter={setSelectedSemesterFilter}
        availableSections={availableSections}
        availableSemesters={availableSemesters}
        userRole={userRole}
      />

      <ScheduleDisplay
        daysOfWeek={daysOfWeek}
        timeSlots={timeSlots}
        schedule={filteredSchedule()}
        isScheduleEnabled={isScheduleEnabled}
        formatTimeSlot={formatTimeSlot}
      />

      <ScheduleLegend />
    </div>
  );
}

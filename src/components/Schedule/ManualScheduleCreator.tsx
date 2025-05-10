
import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Building, User, GraduationCap } from "lucide-react";
import { HierarchicalSelect, Institution, Career, Subject } from '@/components/Hierarchical/HierarchicalSelect';
import { useAppContext, ClassroomType, Classroom, Section } from '@/context/AppContext';
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Teacher {
  id: string;
  name: string;
  specialties: string[];
}

interface Semester {
  id: string;
  name: string;
  careerId: string;
}

interface ManualScheduleCreatorProps {
  institutions: Institution[];
  careers: Career[];
  subjects: Subject[];
  onScheduleCreate: (scheduleItem: any) => void;
}

const ManualScheduleCreator: React.FC<ManualScheduleCreatorProps> = ({
  institutions,
  careers,
  subjects,
  onScheduleCreate
}) => {
  const { toast } = useToast();
  const { sections, classroomTypes, classrooms, semesters } = useAppContext();
  
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
  
  // Estados adicionales para el formulario
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedStartHour, setSelectedStartHour] = useState<string>("");
  const [selectedEndHour, setSelectedEndHour] = useState<string>("");
  const [selectedClassroom, setSelectedClassroom] = useState<string>("");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  
  // Datos filtrados
  const [filteredSections, setFilteredSections] = useState<Section[]>([]);
  const [filteredSemesters, setFilteredSemesters] = useState<Semester[]>([]);
  const [filteredClassrooms, setFilteredClassrooms] = useState<Classroom[]>([]);
  const [availableEndHours, setAvailableEndHours] = useState<number[]>([]);

  // Datos de ejemplo de profesores
  const [teachers] = useState<Teacher[]>([
    { id: "t1", name: "Dr. Juan Pérez", specialties: ["Matemáticas", "Física"] },
    { id: "t2", name: "Dra. María López", specialties: ["Informática", "Matemáticas"] },
    { id: "t3", name: "Prof. Carlos Rodríguez", specialties: ["Negocios"] },
    { id: "t4", name: "Dra. Ana Martínez", specialties: ["Informática"] }
  ]);
  
  // Filtrar semestres cuando cambia la carrera seleccionada
  useEffect(() => {
    if (currentSelection.career) {
      // En un caso real, esto vendría de la base de datos
      const filtered = semesters ? semesters.filter(semester => 
        semester.careerId === currentSelection.career!.id
      ) : [];
      
      setFilteredSemesters(filtered);
      setSelectedSemester("");
      setSelectedSection("");
    } else {
      setFilteredSemesters([]);
      setSelectedSemester("");
      setFilteredSections([]);
      setSelectedSection("");
    }
  }, [currentSelection.career, semesters]);
  
  // Filtrar secciones cuando cambia la carrera y el semestre seleccionado
  useEffect(() => {
    if (currentSelection.career && selectedSemester) {
      const filtered = sections.filter(section => 
        section.careerId === currentSelection.career!.id
      );
      setFilteredSections(filtered);
    } else {
      setFilteredSections([]);
    }
    setSelectedSection("");
  }, [currentSelection.career, selectedSemester, sections]);
  
  // Filtrar aulas cuando cambia la asignatura seleccionada
  useEffect(() => {
    if (currentSelection.subject) {
      // Si la asignatura requiere un tipo específico de aula, filtramos por ese tipo
      if (currentSelection.subject.requiredRoomType) {
        const requiredTypeId = classroomTypes.find(
          type => type.name === currentSelection.subject!.requiredRoomType
        )?.id;
        
        if (requiredTypeId) {
          const filtered = classrooms.filter(classroom => classroom.typeId === requiredTypeId);
          setFilteredClassrooms(filtered);
        } else {
          setFilteredClassrooms(classrooms);
        }
      } else {
        setFilteredClassrooms(classrooms);
      }
      
      setSelectedClassroom("");
    } else {
      setFilteredClassrooms([]);
      setSelectedClassroom("");
    }
  }, [currentSelection.subject, classrooms, classroomTypes]);
  
  // Actualizar horas de fin disponibles cuando cambia la hora de inicio
  useEffect(() => {
    if (selectedStartHour) {
      const startHour = parseInt(selectedStartHour);
      const endHours = Array.from({ length: 22 - startHour }, (_, i) => startHour + i + 1)
        .filter(hour => hour <= 22); // Limitar a 10 PM
      setAvailableEndHours(endHours);
      setSelectedEndHour("");
    } else {
      setAvailableEndHours([]);
      setSelectedEndHour("");
    }
  }, [selectedStartHour]);
  
  // Filtrar profesores con especialidad adecuada
  const getEligibleTeachers = () => {
    if (currentSelection.subject?.specialty) {
      return teachers.filter(teacher => 
        teacher.specialties.includes(currentSelection.subject!.specialty!)
      );
    }
    return teachers;
  };
  
  // Función para crear horario manualmente
  const handleCreateSchedule = () => {
    // Validar que todos los campos necesarios estén seleccionados
    if (!currentSelection.institution || !currentSelection.career || 
        !currentSelection.subject || !selectedSemester || !selectedSection || !selectedDay || 
        !selectedStartHour || !selectedEndHour || !selectedClassroom || !selectedTeacher) {
      toast({
        title: "Faltan campos",
        description: "Debe completar todos los campos para crear el horario.",
        variant: "destructive"
      });
      return;
    }
    
    const startHour = parseInt(selectedStartHour);
    const endHour = parseInt(selectedEndHour);
    
    // Validar que la hora de fin sea mayor que la de inicio
    if (startHour >= endHour) {
      toast({
        title: "Error en horario",
        description: "La hora de fin debe ser posterior a la hora de inicio.",
        variant: "destructive"
      });
      return;
    }
    
    // Crear el objeto de horario para cada hora en el rango seleccionado
    for (let hour = startHour; hour < endHour; hour++) {
      const scheduleItem = {
        code: currentSelection.subject.code,
        name: currentSelection.subject.name,
        day: selectedDay,
        hour: hour,
        classroom: classrooms.find(room => room.id === selectedClassroom)?.code || "",
        classroomType: classroomTypes.find(type => 
          type.id === classrooms.find(room => room.id === selectedClassroom)?.typeId
        )?.name || "",
        teacher: teachers.find(teacher => teacher.id === selectedTeacher)?.name || "",
        section: filteredSections.find(section => section.id === selectedSection)?.name || "",
        semester: filteredSemesters.find(sem => sem.id === selectedSemester)?.name || "",
        specialty: currentSelection.subject.specialty || "",
        colorClass: "bg-academic-600 text-white",
        startHour: startHour,
        endHour: endHour
      };
      
      // Notificar al componente padre
      onScheduleCreate(scheduleItem);
    }
    
    // Mostrar mensaje de éxito
    toast({
      title: "Horario creado",
      description: `Se ha creado el horario para ${currentSelection.subject.name} exitosamente.`,
    });
    
    // Limpiar formulario excepto la selección jerárquica básica y semestre/sección
    setSelectedDay("");
    setSelectedStartHour("");
    setSelectedEndHour("");
    setSelectedClassroom("");
    setSelectedTeacher("");
  };
  
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Crear Horario Manual</CardTitle>
        <CardDescription>Complete la información para crear un horario manualmente</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selector Jerárquico */}
        <HierarchicalSelect
          institutions={institutions}
          careers={careers}
          subjects={subjects}
          onSelectionChange={setCurrentSelection}
        />
        
        {/* Selector de Semestre */}
        {currentSelection.career && (
          <div className="grid grid-cols-[auto_1fr] items-center gap-2 pt-4">
            <GraduationCap className="h-5 w-5 text-muted-foreground" />
            <Select 
              value={selectedSemester}
              onValueChange={setSelectedSemester}
              disabled={filteredSemesters.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar Semestre" />
              </SelectTrigger>
              <SelectContent>
                {filteredSemesters.map(semester => (
                  <SelectItem key={semester.id} value={semester.id}>{semester.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {/* Selector de Sección */}
        {currentSelection.career && selectedSemester && (
          <div className="grid grid-cols-[auto_1fr] items-center gap-2">
            <Building className="h-5 w-5 text-muted-foreground" />
            <Select 
              value={selectedSection}
              onValueChange={setSelectedSection}
              disabled={filteredSections.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar Sección" />
              </SelectTrigger>
              <SelectContent>
                {filteredSections.map(section => (
                  <SelectItem key={section.id} value={section.id}>{section.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {/* Selectores adicionales (solo visibles si se seleccionó asignatura) */}
        {currentSelection.subject && selectedSection && (
          <>
            {/* Selector de Día */}
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <Select 
                value={selectedDay}
                onValueChange={setSelectedDay}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar Día" />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map(day => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Selector de Hora de Inicio */}
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <Select 
                value={selectedStartHour}
                onValueChange={setSelectedStartHour}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar Hora de Inicio" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 14 }, (_, i) => 8 + i).map(hour => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {`${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Selector de Hora de Fin */}
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <Select 
                value={selectedEndHour}
                onValueChange={setSelectedEndHour}
                disabled={availableEndHours.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar Hora de Fin" />
                </SelectTrigger>
                <SelectContent>
                  {availableEndHours.map(hour => (
                    <SelectItem key={hour} value={hour.toString()}>
                      {`${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Selector de Aula */}
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <Building className="h-5 w-5 text-muted-foreground" />
              <Select 
                value={selectedClassroom}
                onValueChange={setSelectedClassroom}
                disabled={filteredClassrooms.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar Aula" />
                </SelectTrigger>
                <SelectContent>
                  {filteredClassrooms.map(classroom => {
                    const type = classroomTypes.find(t => t.id === classroom.typeId);
                    return (
                      <SelectItem key={classroom.id} value={classroom.id}>
                        {`${classroom.code} (${type?.name || 'Desconocido'})`}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            
            {/* Selector de Docente */}
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <Select 
                value={selectedTeacher}
                onValueChange={setSelectedTeacher}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar Docente" />
                </SelectTrigger>
                <SelectContent>
                  {getEligibleTeachers().map(teacher => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {`${teacher.name} (${teacher.specialties.join(', ')})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleCreateSchedule} 
          disabled={!currentSelection.subject || !selectedSemester || !selectedSection || !selectedDay || !selectedStartHour || !selectedEndHour || !selectedClassroom || !selectedTeacher}
        >
          Crear horario manual
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ManualScheduleCreator;

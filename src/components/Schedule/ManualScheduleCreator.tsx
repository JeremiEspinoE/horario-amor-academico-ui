
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { HierarchicalSelect, Institution, Career, Subject } from '@/components/Hierarchical/HierarchicalSelect';
import { useAppContext } from '@/context/AppContext';
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sampleTeachers } from '@/types/teacher';
import DaySelector from './DaySelector';
import TimeSelector from './TimeSelector';
import ClassroomSelector from './ClassroomSelector';
import TeacherSelector from './TeacherSelector';
import SemesterSectionSelector from './SemesterSectionSelector';

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
  
  // Form states
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedStartHour, setSelectedStartHour] = useState<string>("");
  const [selectedEndHour, setSelectedEndHour] = useState<string>("");
  const [selectedClassroom, setSelectedClassroom] = useState<string>("");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  
  // Filtered data states
  const [filteredSections, setFilteredSections] = useState([]);
  const [filteredSemesters, setFilteredSemesters] = useState([]);
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const [availableEndHours, setAvailableEndHours] = useState<number[]>([]);

  // Days of week
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  // Filtrar semestres cuando cambia la carrera seleccionada
  useEffect(() => {
    if (currentSelection.career) {
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
      return sampleTeachers.filter(teacher => 
        teacher.specialties.includes(currentSelection.subject!.specialty!)
      );
    }
    return sampleTeachers;
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
        teacher: sampleTeachers.find(teacher => teacher.id === selectedTeacher)?.name || "",
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
        
        {/* Selector de Semestre y Sección */}
        {currentSelection.career && (
          <SemesterSectionSelector
            selectedSemester={selectedSemester}
            onSemesterChange={setSelectedSemester}
            selectedSection={selectedSection}
            onSectionChange={setSelectedSection}
            filteredSemesters={filteredSemesters}
            filteredSections={filteredSections}
          />
        )}
        
        {/* Selectores adicionales (solo visibles si se seleccionó asignatura) */}
        {currentSelection.subject && selectedSection && (
          <>
            {/* Selector de Día */}
            <DaySelector
              selectedDay={selectedDay}
              onDayChange={setSelectedDay}
              daysOfWeek={daysOfWeek}
            />
            
            {/* Selectores de Hora */}
            <TimeSelector
              startHour={selectedStartHour}
              endHour={selectedEndHour}
              onStartHourChange={setSelectedStartHour}
              onEndHourChange={setSelectedEndHour}
              availableEndHours={availableEndHours}
            />
            
            {/* Selector de Aula */}
            <ClassroomSelector
              selectedClassroom={selectedClassroom}
              onClassroomChange={setSelectedClassroom}
              filteredClassrooms={filteredClassrooms}
              classroomTypes={classroomTypes}
            />
            
            {/* Selector de Docente */}
            <TeacherSelector
              selectedTeacher={selectedTeacher}
              onTeacherChange={setSelectedTeacher}
              eligibleTeachers={getEligibleTeachers()}
            />
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

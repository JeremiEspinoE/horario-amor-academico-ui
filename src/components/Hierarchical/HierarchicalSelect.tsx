
import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, School, GraduationCap, BookOpen } from "lucide-react";

// Tipos para la jerarquía
export interface Institution {
  id: string;
  name: string;
}

export interface Career {
  id: string;
  name: string;
  institutionId: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  careerId: string;
  requiredRoomType?: string;
  hoursPerWeek: number;
  specialty?: string;
}

interface HierarchicalSelectProps {
  institutions: Institution[];
  careers: Career[];
  subjects: Subject[];
  onSelectionChange?: (selection: {
    institution: Institution | null;
    career: Career | null;
    subject: Subject | null;
  }) => void;
}

export const HierarchicalSelect: React.FC<HierarchicalSelectProps> = ({
  institutions,
  careers,
  subjects,
  onSelectionChange
}) => {
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);

  // Actualizar carreras cuando cambie la institución
  useEffect(() => {
    if (selectedInstitution) {
      const filtered = careers.filter(career => career.institutionId === selectedInstitution.id);
      setFilteredCareers(filtered);
      setSelectedCareer(null);
      setSelectedSubject(null);
    } else {
      setFilteredCareers([]);
      setSelectedCareer(null);
      setSelectedSubject(null);
    }
  }, [selectedInstitution, careers]);

  // Actualizar asignaturas cuando cambie la carrera
  useEffect(() => {
    if (selectedCareer) {
      const filtered = subjects.filter(subject => subject.careerId === selectedCareer.id);
      setFilteredSubjects(filtered);
      setSelectedSubject(null);
    } else {
      setFilteredSubjects([]);
      setSelectedSubject(null);
    }
  }, [selectedCareer, subjects]);

  // Notificar cambios en la selección
  useEffect(() => {
    onSelectionChange?.({
      institution: selectedInstitution,
      career: selectedCareer,
      subject: selectedSubject
    });
  }, [selectedInstitution, selectedCareer, selectedSubject, onSelectionChange]);

  const handleInstitutionChange = (value: string) => {
    const institution = institutions.find(inst => inst.id === value) || null;
    setSelectedInstitution(institution);
  };

  const handleCareerChange = (value: string) => {
    const career = careers.find(car => car.id === value) || null;
    setSelectedCareer(career);
  };

  const handleSubjectChange = (value: string) => {
    const subject = subjects.find(subj => subj.id === value) || null;
    setSelectedSubject(subject);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Selección Jerárquica</CardTitle>
        <CardDescription>Seleccione institución, carrera y asignatura</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-[auto_1fr] items-center gap-2">
            <School className="h-5 w-5 text-muted-foreground" />
            <Select
              value={selectedInstitution?.id}
              onValueChange={handleInstitutionChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar Institución" />
              </SelectTrigger>
              <SelectContent>
                {institutions.map(institution => (
                  <SelectItem key={institution.id} value={institution.id}>
                    {institution.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-[auto_auto_1fr] items-center gap-2">
            <div className="w-5" />
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
              <Select
                value={selectedCareer?.id}
                onValueChange={handleCareerChange}
                disabled={!selectedInstitution}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar Carrera" />
                </SelectTrigger>
                <SelectContent>
                  {filteredCareers.map(career => (
                    <SelectItem key={career.id} value={career.id}>
                      {career.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-[auto_auto_auto_auto_1fr] items-center gap-2">
            <div className="w-5" />
            <div className="w-4" />
            <div className="w-5" />
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <Select
                value={selectedSubject?.id}
                onValueChange={handleSubjectChange}
                disabled={!selectedCareer}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar Asignatura" />
                </SelectTrigger>
                <SelectContent>
                  {filteredSubjects.map(subject => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.code} - {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
      
      {selectedSubject && (
        <CardFooter className="bg-muted/50 flex flex-col items-start text-sm">
          <p><strong>Asignatura:</strong> {selectedSubject.code} - {selectedSubject.name}</p>
          <p><strong>Horas por semana:</strong> {selectedSubject.hoursPerWeek}</p>
          {selectedSubject.requiredRoomType && (
            <p><strong>Tipo de aula requerida:</strong> {selectedSubject.requiredRoomType}</p>
          )}
          {selectedSubject.specialty && (
            <p><strong>Especialidad requerida:</strong> {selectedSubject.specialty}</p>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

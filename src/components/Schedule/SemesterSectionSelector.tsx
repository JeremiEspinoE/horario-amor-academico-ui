
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap, Building } from "lucide-react";
import { Section, Semester } from '@/context/AppContext';

interface SemesterSectionSelectorProps {
  selectedSemester: string;
  onSemesterChange: (value: string) => void;
  selectedSection: string;
  onSectionChange: (value: string) => void;
  filteredSemesters: Semester[];
  filteredSections: Section[];
}

const SemesterSectionSelector: React.FC<SemesterSectionSelectorProps> = ({
  selectedSemester,
  onSemesterChange,
  selectedSection,
  onSectionChange,
  filteredSemesters,
  filteredSections
}) => {
  return (
    <>
      {/* Selector de Semestre */}
      <div className="grid grid-cols-[auto_1fr] items-center gap-2 pt-4">
        <GraduationCap className="h-5 w-5 text-muted-foreground" />
        <Select 
          value={selectedSemester}
          onValueChange={onSemesterChange}
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
      
      {/* Selector de Sección */}
      <div className="grid grid-cols-[auto_1fr] items-center gap-2">
        <Building className="h-5 w-5 text-muted-foreground" />
        <Select 
          value={selectedSection}
          onValueChange={onSectionChange}
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
    </>
  );
};

export default SemesterSectionSelector;

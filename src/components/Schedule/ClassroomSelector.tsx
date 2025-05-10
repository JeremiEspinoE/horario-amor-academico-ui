
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building } from "lucide-react";
import { Classroom, ClassroomType } from '@/context/AppContext';

interface ClassroomSelectorProps {
  selectedClassroom: string;
  onClassroomChange: (value: string) => void;
  filteredClassrooms: Classroom[];
  classroomTypes: ClassroomType[];
}

const ClassroomSelector: React.FC<ClassroomSelectorProps> = ({
  selectedClassroom,
  onClassroomChange,
  filteredClassrooms,
  classroomTypes
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-2">
      <Building className="h-5 w-5 text-muted-foreground" />
      <Select 
        value={selectedClassroom}
        onValueChange={onClassroomChange}
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
  );
};

export default ClassroomSelector;

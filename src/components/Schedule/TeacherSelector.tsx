
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "lucide-react";
import { Teacher } from '@/types/teacher';

interface TeacherSelectorProps {
  selectedTeacher: string;
  onTeacherChange: (value: string) => void;
  eligibleTeachers: Teacher[];
}

const TeacherSelector: React.FC<TeacherSelectorProps> = ({
  selectedTeacher,
  onTeacherChange,
  eligibleTeachers
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-2">
      <User className="h-5 w-5 text-muted-foreground" />
      <Select 
        value={selectedTeacher}
        onValueChange={onTeacherChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar Docente" />
        </SelectTrigger>
        <SelectContent>
          {eligibleTeachers.map(teacher => (
            <SelectItem key={teacher.id} value={teacher.id}>
              {`${teacher.name} (${teacher.specialties.join(', ')})`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TeacherSelector;

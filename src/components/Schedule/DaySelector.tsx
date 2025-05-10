
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface DaySelectorProps {
  selectedDay: string;
  onDayChange: (value: string) => void;
  daysOfWeek: string[];
}

const DaySelector: React.FC<DaySelectorProps> = ({
  selectedDay,
  onDayChange,
  daysOfWeek
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-2">
      <Calendar className="h-5 w-5 text-muted-foreground" />
      <Select 
        value={selectedDay}
        onValueChange={onDayChange}
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
  );
};

export default DaySelector;

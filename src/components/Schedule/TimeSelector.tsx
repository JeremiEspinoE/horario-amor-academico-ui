
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock } from "lucide-react";

interface TimeSelectorProps {
  startHour: string;
  endHour: string;
  onStartHourChange: (value: string) => void;
  onEndHourChange: (value: string) => void;
  availableEndHours: number[];
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  startHour,
  endHour,
  onStartHourChange,
  onEndHourChange,
  availableEndHours
}) => {
  return (
    <>
      {/* Selector de Hora de Inicio */}
      <div className="grid grid-cols-[auto_1fr] items-center gap-2">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <Select 
          value={startHour}
          onValueChange={onStartHourChange}
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
          value={endHour}
          onValueChange={onEndHourChange}
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
    </>
  );
};

export default TimeSelector;

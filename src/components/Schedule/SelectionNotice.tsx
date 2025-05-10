
import React from "react";
import { Info } from "lucide-react";

interface SelectionNoticeProps {
  isScheduleEnabled: boolean;
}

const SelectionNotice: React.FC<SelectionNoticeProps> = ({ isScheduleEnabled }) => {
  if (isScheduleEnabled) return null;
  
  return (
    <div className="bg-muted/70 border rounded-md p-4 mb-4 flex items-center gap-2">
      <Info className="h-5 w-5 text-muted-foreground" />
      <p className="text-muted-foreground">Seleccione una institución y carrera para habilitar el diseño del horario.</p>
    </div>
  );
};

export default SelectionNotice;

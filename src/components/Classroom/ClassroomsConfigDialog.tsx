
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClassroomType } from './types';

interface ClassroomsConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentType: ClassroomType | null;
  classroomNames: Record<string, string[]>;
  onClassroomNameChange: (index: number, value: string) => void;
}

export const ClassroomsConfigDialog: React.FC<ClassroomsConfigDialogProps> = ({
  open,
  onOpenChange,
  currentType,
  classroomNames,
  onClassroomNameChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {currentType?.name} - Configuración de Aulas
          </DialogTitle>
          <DialogDescription>
            Asigna nombres a cada aula disponible.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          {currentType && classroomNames[currentType.id]?.map((name, index) => (
            <div key={index} className="flex items-center gap-2 mb-3">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: currentType.color }}
              ></div>
              <Input
                value={name}
                onChange={(e) => onClassroomNameChange(index, e.target.value)}
                placeholder={`Aula ${index + 1}`}
                className="flex-1"
              />
            </div>
          ))}
          
          {currentType && (!classroomNames[currentType.id] || classroomNames[currentType.id].length === 0) && (
            <p className="text-muted-foreground text-center py-4">
              No hay aulas configuradas. Ajusta la cantidad disponible para agregar aulas.
            </p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

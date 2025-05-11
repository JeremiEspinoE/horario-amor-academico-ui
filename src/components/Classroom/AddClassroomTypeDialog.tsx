
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
import { Label } from "@/components/ui/label";
import { ClassroomType } from './types';
import { useToast } from "@/hooks/use-toast";

interface AddClassroomTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newType: Omit<ClassroomType, "id">;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddType: () => void;
}

export const AddClassroomTypeDialog: React.FC<AddClassroomTypeDialogProps> = ({
  open,
  onOpenChange,
  newType,
  onInputChange,
  onAddType,
}) => {
  const { toast } = useToast();

  const handleAddType = () => {
    if (!newType.name) {
      toast({
        title: "Error",
        description: "El nombre del tipo de aula es requerido",
        variant: "destructive"
      });
      return;
    }
    
    onAddType();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir nuevo tipo de aula</DialogTitle>
          <DialogDescription>
            Añade un nuevo tipo de aula para la gestión de horarios.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              value={newType.name}
              onChange={onInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              name="description"
              value={newType.description}
              onChange={onInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="count">Cantidad disponible</Label>
            <Input
              id="count"
              name="count"
              type="number"
              min="0"
              value={newType.count}
              onChange={onInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="color">Color</Label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                id="color"
                name="color"
                value={newType.color}
                onChange={onInputChange}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <p className="text-sm text-muted-foreground">{newType.color}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleAddType}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

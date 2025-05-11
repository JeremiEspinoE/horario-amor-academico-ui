
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

interface EditClassroomTypeDialogProps {
  editingType: ClassroomType | null;
  onClose: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

export const EditClassroomTypeDialog: React.FC<EditClassroomTypeDialogProps> = ({
  editingType,
  onClose,
  onInputChange,
  onSave,
}) => {
  return (
    <Dialog open={!!editingType} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tipo de aula</DialogTitle>
          <DialogDescription>
            Actualiza la información del tipo de aula.
          </DialogDescription>
        </DialogHeader>
        {editingType && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nombre</Label>
              <Input
                id="edit-name"
                name="name"
                value={editingType.name}
                onChange={onInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Descripción</Label>
              <Input
                id="edit-description"
                name="description"
                value={editingType.description}
                onChange={onInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-count">Cantidad disponible</Label>
              <Input
                id="edit-count"
                name="count"
                type="number"
                min="0"
                value={editingType.count}
                onChange={onInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-color">Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="edit-color"
                  name="color"
                  value={editingType.color}
                  onChange={onInputChange}
                  className="w-10 h-10 rounded cursor-pointer"
                />
                <p className="text-sm text-muted-foreground">{editingType.color}</p>
              </div>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onSave}>Actualizar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

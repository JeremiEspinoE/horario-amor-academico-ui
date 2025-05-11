
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Plus, MoreHorizontal, Edit2, Trash2, School } from "lucide-react";

// Tipos de aulas
export type ClassroomType = {
  id: string;
  name: string;
  description: string;
  count: number;
  color: string;
};

export type Classroom = {
  id: string;
  name: string;
  typeId: string;
};

interface ClassroomTypesProps {
  classroomTypes: ClassroomType[];
  onAddType?: (type: Omit<ClassroomType, "id">) => void;
  onEditType?: (id: string, data: Partial<ClassroomType>) => void;
  onDeleteType?: (id: string) => void;
}

export const ClassroomTypes: React.FC<ClassroomTypesProps> = ({
  classroomTypes,
  onAddType,
  onEditType,
  onDeleteType,
}) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingType, setEditingType] = useState<ClassroomType | null>(null);
  const [newType, setNewType] = useState<Omit<ClassroomType, "id">>({
    name: "",
    description: "",
    count: 0,
    color: "#3B82F6" // Default blue color
  });
  
  // Estado para el diálogo de aulas individuales
  const [showClassroomsDialog, setShowClassroomsDialog] = useState(false);
  const [currentClassroomType, setCurrentClassroomType] = useState<ClassroomType | null>(null);
  const [classrooms, setClassrooms] = useState<Record<string, string[]>>({});
  
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingType) {
      setEditingType({
        ...editingType,
        [name]: name === "count" ? parseInt(value) || 0 : value
      });
    } else {
      setNewType({
        ...newType,
        [name]: name === "count" ? parseInt(value) || 0 : value
      });
    }
  };

  const handleAddType = () => {
    if (!newType.name) {
      toast({
        title: "Error",
        description: "El nombre del tipo de aula es requerido",
        variant: "destructive"
      });
      return;
    }
    
    onAddType?.(newType);
    setNewType({
      name: "",
      description: "",
      count: 0,
      color: "#3B82F6"
    });
    setShowAddDialog(false);
    
    toast({
      title: "Tipo de aula añadido",
      description: `Se ha añadido el tipo de aula "${newType.name}"`
    });
  };

  const handleEditType = () => {
    if (!editingType || !editingType.name) return;
    
    const oldCount = classroomTypes.find(t => t.id === editingType.id)?.count || 0;
    const newCount = editingType.count;
    
    onEditType?.(editingType.id, editingType);
    
    // Si cambia la cantidad, actualizar el arreglo de aulas
    if (newCount !== oldCount) {
      const currentNames = classrooms[editingType.id] || [];
      
      // Si la nueva cantidad es mayor, agregar nuevas aulas con nombres por defecto
      if (newCount > oldCount) {
        const newClassrooms = [...currentNames];
        for (let i = oldCount; i < newCount; i++) {
          newClassrooms.push(`Aula ${i + 1}`);
        }
        setClassrooms({
          ...classrooms,
          [editingType.id]: newClassrooms
        });
      } 
      // Si la nueva cantidad es menor, truncar la lista de aulas
      else if (newCount < oldCount && newCount >= 0) {
        setClassrooms({
          ...classrooms,
          [editingType.id]: currentNames.slice(0, newCount)
        });
      }
    }
    
    setEditingType(null);
    
    toast({
      title: "Tipo de aula actualizado",
      description: `Se ha actualizado el tipo de aula "${editingType.name}"`
    });
  };

  const handleDeleteType = (id: string, name: string) => {
    onDeleteType?.(id);
    
    // Eliminar también las aulas asociadas
    const updatedClassrooms = { ...classrooms };
    delete updatedClassrooms[id];
    setClassrooms(updatedClassrooms);
    
    toast({
      title: "Tipo de aula eliminado",
      description: `Se ha eliminado el tipo de aula "${name}"`,
      variant: "destructive"
    });
  };

  const openClassroomsList = (type: ClassroomType) => {
    setCurrentClassroomType(type);
    
    // Inicializar la lista de aulas si no existe
    if (!classrooms[type.id]) {
      const initialClassrooms = Array.from({ length: type.count }, (_, i) => `Aula ${i + 1}`);
      setClassrooms({
        ...classrooms,
        [type.id]: initialClassrooms
      });
    }
    
    setShowClassroomsDialog(true);
  };

  const handleClassroomNameChange = (index: number, value: string) => {
    if (!currentClassroomType) return;
    
    const updatedClassrooms = [...(classrooms[currentClassroomType.id] || [])];
    updatedClassrooms[index] = value;
    
    setClassrooms({
      ...classrooms,
      [currentClassroomType.id]: updatedClassrooms
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classroomTypes.map((type) => (
          <Card key={type.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{type.name}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Acciones</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setEditingType(type)}
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openClassroomsList(type)}
                    >
                      <School className="mr-2 h-4 w-4" />
                      <span>Configurar Aulas</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDeleteType(type.id, type.name)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Eliminar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className="w-full h-2 rounded-full mt-1 mb-3" 
                style={{ backgroundColor: type.color }}
              />
              <p className="text-lg font-semibold">
                {type.count} {type.count === 1 ? 'aula' : 'aulas'} disponibles
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground mt-2"
                onClick={() => openClassroomsList(type)}
              >
                <School className="mr-1 h-4 w-4" />
                Ver aulas
              </Button>
            </CardContent>
          </Card>
        ))}
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Card className="flex flex-col items-center justify-center cursor-pointer h-full border-dashed">
              <CardContent className="flex flex-col items-center justify-center h-full py-8">
                <Plus className="h-8 w-8 opacity-50" />
                <p className="mt-2 font-medium text-muted-foreground">Añadir tipo de aula</p>
              </CardContent>
            </Card>
          </DialogTrigger>
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
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  name="description"
                  value={newType.description}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <p className="text-sm text-muted-foreground">{newType.color}</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddType}>Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Diálogo de edición */}
      <Dialog open={!!editingType} onOpenChange={(open) => !open && setEditingType(null)}>
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
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Input
                  id="edit-description"
                  name="description"
                  value={editingType.description}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <p className="text-sm text-muted-foreground">{editingType.color}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingType(null)}>
              Cancelar
            </Button>
            <Button onClick={handleEditType}>Actualizar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo de configuración de aulas individuales */}
      <Dialog open={showClassroomsDialog} onOpenChange={setShowClassroomsDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentClassroomType?.name} - Configuración de Aulas
            </DialogTitle>
            <DialogDescription>
              Asigna nombres a cada aula disponible.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            {currentClassroomType && classrooms[currentClassroomType.id]?.map((name, index) => (
              <div key={index} className="flex items-center gap-2 mb-3">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: currentClassroomType.color }}
                ></div>
                <Input
                  value={name}
                  onChange={(e) => handleClassroomNameChange(index, e.target.value)}
                  placeholder={`Aula ${index + 1}`}
                  className="flex-1"
                />
              </div>
            ))}
            
            {currentClassroomType && (!classrooms[currentClassroomType.id] || classrooms[currentClassroomType.id].length === 0) && (
              <p className="text-muted-foreground text-center py-4">
                No hay aulas configuradas. Ajusta la cantidad disponible para agregar aulas.
              </p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowClassroomsDialog(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

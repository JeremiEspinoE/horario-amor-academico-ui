
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { ClassroomType, ClassroomTypesProps } from './types';
import { ClassroomTypesList } from './ClassroomTypesList';
import { AddClassroomTypeDialog } from './AddClassroomTypeDialog';
import { EditClassroomTypeDialog } from './EditClassroomTypeDialog';
import { ClassroomsConfigDialog } from './ClassroomsConfigDialog';

export { type ClassroomType } from './types';

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
      <ClassroomTypesList 
        classroomTypes={classroomTypes}
        onEdit={setEditingType}
        onDelete={handleDeleteType}
        onConfigureClassrooms={openClassroomsList}
        onAddClick={() => setShowAddDialog(true)}
      />

      <AddClassroomTypeDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        newType={newType}
        onInputChange={handleInputChange}
        onAddType={handleAddType}
      />
      
      <EditClassroomTypeDialog
        editingType={editingType}
        onClose={() => setEditingType(null)}
        onInputChange={handleInputChange}
        onSave={handleEditType}
      />
      
      <ClassroomsConfigDialog
        open={showClassroomsDialog}
        onOpenChange={setShowClassroomsDialog}
        currentType={currentClassroomType}
        classroomNames={classrooms}
        onClassroomNameChange={handleClassroomNameChange}
      />
    </>
  );
};

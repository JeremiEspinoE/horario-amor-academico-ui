
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClassroomType, ClassroomTypes } from "@/components/Classroom/ClassroomTypes";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { v4 as uuidv4 } from 'uuid';

export default function RoomTypeSettings() {
  const { classroomTypes: contextClassroomTypes, setClassroomTypes: setContextClassroomTypes } = useAppContext();
  
  // Convertir los tipos de aula del contexto al formato requerido por el componente ClassroomTypes
  const [classroomTypes, setClassroomTypes] = useState<ClassroomType[]>([
    { id: "type1", name: "Aula de Teoría", description: "Para clases teóricas regulares", count: 3, color: "#4f46e5" },
    { id: "type2", name: "Laboratorio", description: "Para prácticas y experimentos", count: 2, color: "#06b6d4" }
  ]);

  const handleAddClassroomType = (type: Omit<ClassroomType, "id">) => {
    const newType = {
      ...type,
      id: uuidv4()
    };
    setClassroomTypes([...classroomTypes, newType]);
    
    // Actualizar también en el contexto global
    const newContextType = {
      id: newType.id,
      name: newType.name,
      availableCount: newType.count
    };
    setContextClassroomTypes([...contextClassroomTypes, newContextType]);
  };

  const handleEditClassroomType = (id: string, updatedData: Partial<ClassroomType>) => {
    const updatedTypes = classroomTypes.map(type => 
      type.id === id ? { ...type, ...updatedData } : type
    );
    setClassroomTypes(updatedTypes);
    
    // Actualizar también en el contexto global
    if (updatedData.name || updatedData.count !== undefined) {
      const updatedContextTypes = contextClassroomTypes.map(type => 
        type.id === id ? { 
          ...type, 
          name: updatedData.name || type.name,
          availableCount: updatedData.count !== undefined ? updatedData.count : type.availableCount
        } : type
      );
      setContextClassroomTypes(updatedContextTypes);
    }
  };

  const handleDeleteClassroomType = (id: string) => {
    const filteredTypes = classroomTypes.filter(type => type.id !== id);
    setClassroomTypes(filteredTypes);
    
    // Actualizar también en el contexto global
    const filteredContextTypes = contextClassroomTypes.filter(type => type.id !== id);
    setContextClassroomTypes(filteredContextTypes);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tipos de Aula</CardTitle>
        <CardDescription>
          Configura tipos de aulas, cantidades y asigna nombres a cada aula
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ClassroomTypes
          classroomTypes={classroomTypes}
          onAddType={handleAddClassroomType}
          onEditType={handleEditClassroomType}
          onDeleteType={handleDeleteClassroomType}
        />
      </CardContent>
    </Card>
  );
}

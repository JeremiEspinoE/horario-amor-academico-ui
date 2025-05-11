
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit2, Trash2, School } from "lucide-react";
import { ClassroomType } from './types';

interface ClassroomCardProps {
  type: ClassroomType;
  onEdit: (type: ClassroomType) => void;
  onDelete: (id: string, name: string) => void;
  onConfigureClassrooms: (type: ClassroomType) => void;
}

export const ClassroomCard: React.FC<ClassroomCardProps> = ({
  type,
  onEdit,
  onDelete,
  onConfigureClassrooms,
}) => {
  return (
    <Card>
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
              <DropdownMenuItem onClick={() => onEdit(type)}>
                <Edit2 className="mr-2 h-4 w-4" />
                <span>Editar</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onConfigureClassrooms(type)}>
                <School className="mr-2 h-4 w-4" />
                <span>Configurar Aulas</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(type.id, type.name)}
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
          onClick={() => onConfigureClassrooms(type)}
        >
          <School className="mr-1 h-4 w-4" />
          Ver aulas
        </Button>
      </CardContent>
    </Card>
  );
};

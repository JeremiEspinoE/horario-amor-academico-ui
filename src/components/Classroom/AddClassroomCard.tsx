
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface AddClassroomCardProps {
  onClick: () => void;
}

export const AddClassroomCard: React.FC<AddClassroomCardProps> = ({ onClick }) => {
  return (
    <Card className="flex flex-col items-center justify-center cursor-pointer h-full border-dashed" onClick={onClick}>
      <CardContent className="flex flex-col items-center justify-center h-full py-8">
        <Plus className="h-8 w-8 opacity-50" />
        <p className="mt-2 font-medium text-muted-foreground">Añadir tipo de aula</p>
      </CardContent>
    </Card>
  );
};

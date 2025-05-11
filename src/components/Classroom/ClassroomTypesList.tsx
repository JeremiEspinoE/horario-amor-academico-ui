
import React from 'react';
import { ClassroomType } from './types';
import { ClassroomCard } from './ClassroomCard';
import { AddClassroomCard } from './AddClassroomCard';

interface ClassroomTypesListProps {
  classroomTypes: ClassroomType[];
  onEdit: (type: ClassroomType) => void;
  onDelete: (id: string, name: string) => void;
  onConfigureClassrooms: (type: ClassroomType) => void;
  onAddClick: () => void;
}

export const ClassroomTypesList: React.FC<ClassroomTypesListProps> = ({
  classroomTypes,
  onEdit,
  onDelete,
  onConfigureClassrooms,
  onAddClick
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {classroomTypes.map((type) => (
        <ClassroomCard
          key={type.id}
          type={type}
          onEdit={onEdit}
          onDelete={onDelete}
          onConfigureClassrooms={onConfigureClassrooms}
        />
      ))}
      <AddClassroomCard onClick={onAddClick} />
    </div>
  );
};


// Types for classroom management
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

export interface ClassroomTypesProps {
  classroomTypes: ClassroomType[];
  onAddType?: (type: Omit<ClassroomType, "id">) => void;
  onEditType?: (id: string, data: Partial<ClassroomType>) => void;
  onDeleteType?: (id: string) => void;
}

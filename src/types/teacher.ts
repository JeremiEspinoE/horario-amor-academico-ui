
// Define types for teachers
export interface Teacher {
  id: string;
  name: string;
  specialties: string[];
}

// Sample data for teachers
export const sampleTeachers: Teacher[] = [
  { id: "t1", name: "Dr. Juan Pérez", specialties: ["Matemáticas", "Física"] },
  { id: "t2", name: "Dra. María López", specialties: ["Informática", "Matemáticas"] },
  { id: "t3", name: "Prof. Carlos Rodríguez", specialties: ["Negocios"] },
  { id: "t4", name: "Dra. Ana Martínez", specialties: ["Informática"] }
];

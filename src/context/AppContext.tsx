
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Tipos para las aulas
export interface ClassroomType {
  id: string;
  name: string; // "Teoría" o "Laboratorio"
  availableCount: number;
}

export interface Classroom {
  id: string;
  code: string;
  typeId: string;
}

// Tipos para las secciones
export interface Section {
  id: string;
  name: string;
  careerId: string;
}

// Add Semester type definition
export interface Semester {
  id: string;
  name: string;
  careerId: string;
}

interface AppContextType {
  userRole: string | null;
  setUserRole: (role: string) => void;
  isTestMode: boolean;
  setTestMode: (mode: boolean) => void;
  currentPeriod: string;
  setCurrentPeriod: (period: string) => void;
  periodStatus: 'active' | 'inactive' | 'unpublished';
  setPeriodStatus: (status: 'active' | 'inactive' | 'unpublished') => void;
  classroomTypes: ClassroomType[];
  setClassroomTypes: (types: ClassroomType[]) => void;
  classrooms: Classroom[];
  setClassrooms: (classrooms: Classroom[]) => void;
  sections: Section[];
  setSections: (sections: Section[]) => void;
  semesters: Semester[];  // Add semesters property to the context
  setSemesters: (semesters: Semester[]) => void;  // Add setter for semesters
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isTestMode, setTestMode] = useState<boolean>(false);
  const [currentPeriod, setCurrentPeriod] = useState<string>('Primavera 2025');
  const [periodStatus, setPeriodStatus] = useState<'active' | 'inactive' | 'unpublished'>('active');
  
  // Nuevos estados para aulas y secciones
  const [classroomTypes, setClassroomTypes] = useState<ClassroomType[]>([
    { id: 'type1', name: 'Teoría', availableCount: 10 },
    { id: 'type2', name: 'Laboratorio', availableCount: 5 }
  ]);
  
  const [classrooms, setClassrooms] = useState<Classroom[]>([
    { id: 'c1', code: 'A101', typeId: 'type1' },
    { id: 'c2', code: 'A102', typeId: 'type1' },
    { id: 'c3', code: 'A103', typeId: 'type1' },
    { id: 'c4', code: 'B201', typeId: 'type1' },
    { id: 'c5', code: 'B202', typeId: 'type1' },
    { id: 'c6', code: 'L101', typeId: 'type2' },
    { id: 'c7', code: 'L102', typeId: 'type2' },
    { id: 'c8', code: 'L103', typeId: 'type2' }
  ]);
  
  const [sections, setSections] = useState<Section[]>([
    { id: 'sec1', name: 'Sección A', careerId: 'car1' },
    { id: 'sec2', name: 'Sección B', careerId: 'car1' },
    { id: 'sec3', name: 'Sección C', careerId: 'car2' },
    { id: 'sec4', name: 'Sección A', careerId: 'car3' },
    { id: 'sec5', name: 'Sección B', careerId: 'car3' }
  ]);
  
  // Add semesters state
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: 'sem1', name: 'Semestre 1', careerId: 'car1' },
    { id: 'sem2', name: 'Semestre 2', careerId: 'car1' },
    { id: 'sem3', name: 'Semestre 3', careerId: 'car2' },
    { id: 'sem4', name: 'Semestre 1', careerId: 'car3' },
    { id: 'sem5', name: 'Semestre 2', careerId: 'car3' }
  ]);

  // Cargar el rol del usuario de localStorage al iniciar
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  // Guardar el rol del usuario en localStorage cuando cambie
  const handleSetUserRole = (role: string) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  const value = {
    userRole,
    setUserRole: handleSetUserRole,
    isTestMode,
    setTestMode,
    currentPeriod,
    setCurrentPeriod,
    periodStatus,
    setPeriodStatus,
    classroomTypes,
    setClassroomTypes,
    classrooms,
    setClassrooms,
    sections,
    setSections,
    semesters,
    setSemesters
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext debe ser usado dentro de un AppProvider');
  }
  return context;
};


import { ScheduleType, TimeSlot } from "@/types/schedule";

// Sample data for institutions, careers, and subjects
export const careers = [
  { id: 'car1', name: 'Ingeniería de Sistemas', institutionId: 'inst1' },
  { id: 'car2', name: 'Administración de Empresas', institutionId: 'inst1' },
  { id: 'car3', name: 'Diseño Gráfico', institutionId: 'inst2' }
];

export const subjects = [
  { 
    id: 'sub1', 
    code: 'MAT101', 
    name: 'Cálculo I', 
    careerId: 'car1', 
    requiredRoomType: 'Teoría',
    hoursPerWeek: 4,
    specialty: 'Matemáticas'
  },
  { 
    id: 'sub2', 
    code: 'PRG102', 
    name: 'Programación I', 
    careerId: 'car1', 
    requiredRoomType: 'Laboratorio',
    hoursPerWeek: 6,
    specialty: 'Informática'
  },
  { 
    id: 'sub3', 
    code: 'ADM101', 
    name: 'Introducción a la Administración', 
    careerId: 'car2',
    requiredRoomType: 'Teoría',
    hoursPerWeek: 4,
    specialty: 'Negocios'
  },
  { 
    id: 'sub4', 
    code: 'DIS101', 
    name: 'Fundamentos del Diseño', 
    careerId: 'car3',
    requiredRoomType: 'Laboratorio',
    hoursPerWeek: 6,
    specialty: 'Diseño'
  }
];

// Function to create initial empty schedule
export const createInitialSchedule = (): ScheduleType => {
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const scheduleObj: ScheduleType = {};

  daysOfWeek.forEach(day => {
    // 14 time slots (8 AM to 9 PM)
    scheduleObj[day] = Array(14).fill(null).map(() => ({ courses: [] }));
  });

  return scheduleObj;
};

// Sample schedule data for testing
export const getSampleScheduleData = (): ScheduleType => {
  const schedule = createInitialSchedule();
  
  // Add some sample courses
  schedule["Lunes"][0].courses.push({
    code: "MAT101",
    name: "Cálculo I",
    room: "A101",
    faculty: "Dr. John Smith",
    section: "A",
    semester: "Semestre 1", 
    colorClass: "bg-blue-100 text-blue-800"
  });
  
  schedule["Martes"][2].courses.push({
    code: "PRG102",
    name: "Programación I",
    room: "L102",
    faculty: "Dra. Jane Smith",
    section: "A",
    semester: "Semestre 1",
    colorClass: "bg-green-100 text-green-800"
  });
  
  // Add a conflict example
  schedule["Miércoles"][4].courses.push({
    code: "ADM101",
    name: "Introducción a la Administración",
    room: "A103",
    faculty: "Prof. Robert Johnson",
    section: "B",
    semester: "Semestre 2",
    colorClass: "bg-purple-100 text-purple-800",
    hasConflict: true
  });
  
  schedule["Miércoles"][4].courses.push({
    code: "DIS101",
    name: "Fundamentos del Diseño",
    room: "A103", // Conflict with the same room
    faculty: "Prof. Alice Brown",
    section: "A",
    semester: "Semestre 1",
    colorClass: "bg-amber-100 text-amber-800",
    hasConflict: true
  });

  return schedule;
};

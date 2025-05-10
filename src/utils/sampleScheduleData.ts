
import { ScheduleType } from "@/types/schedule";

export const createInitialSchedule = (): ScheduleType => {
  const initialSchedule: ScheduleType = {
    Lunes: Array.from({ length: 14 }, () => ({ courses: [] })),
    Martes: Array.from({ length: 14 }, () => ({ courses: [] })),
    Miércoles: Array.from({ length: 14 }, () => ({ courses: [] })),
    Jueves: Array.from({ length: 14 }, () => ({ courses: [] })),
    Viernes: Array.from({ length: 14 }, () => ({ courses: [] })),
  };

  // Añadir algunos cursos de ejemplo
  initialSchedule.Lunes[1].courses.push({
    code: "CS101",
    name: "Intro a Programación",
    room: "CIE-101",
    faculty: "Dra. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Lunes[2].courses.push({
    code: "CS101",
    name: "Intro a Programación",
    room: "CIE-101",
    faculty: "Dra. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Miércoles[1].courses.push({
    code: "CS101",
    name: "Intro a Programación",
    room: "CIE-101",
    faculty: "Dra. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Miércoles[2].courses.push({
    code: "CS101",
    name: "Intro a Programación",
    room: "CIE-101",
    faculty: "Dra. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Martes[3].courses.push({
    code: "MATH201",
    name: "Cálculo I",
    room: "CIE-203",
    faculty: "Dra. Sarah Williams",
    colorClass: "bg-faculty-600 text-white",
  });

  initialSchedule.Martes[4].courses.push({
    code: "MATH201",
    name: "Cálculo I",
    room: "CIE-203",
    faculty: "Dra. Sarah Williams",
    colorClass: "bg-faculty-600 text-white",
  });

  initialSchedule.Jueves[3].courses.push({
    code: "MATH201",
    name: "Cálculo I",
    room: "CIE-203",
    faculty: "Dra. Sarah Williams",
    colorClass: "bg-faculty-600 text-white",
  });

  initialSchedule.Jueves[4].courses.push({
    code: "MATH201",
    name: "Cálculo I",
    room: "CIE-203",
    faculty: "Dra. Sarah Williams",
    colorClass: "bg-faculty-600 text-white",
  });

  initialSchedule.Martes[6].courses.push({
    code: "BUS101",
    name: "Intro a Negocios",
    room: "NEG-301",
    faculty: "Prof. Michael Johnson",
    colorClass: "bg-course-600 text-white",
  });

  initialSchedule.Martes[7].courses.push({
    code: "BUS101",
    name: "Intro a Negocios",
    room: "NEG-301",
    faculty: "Prof. Michael Johnson",
    colorClass: "bg-course-600 text-white",
  });

  initialSchedule.Jueves[6].courses.push({
    code: "BUS101",
    name: "Intro a Negocios",
    room: "NEG-301",
    faculty: "Prof. Michael Johnson",
    colorClass: "bg-course-600 text-white",
  });

  initialSchedule.Jueves[7].courses.push({
    code: "BUS101",
    name: "Intro a Negocios",
    room: "NEG-301",
    faculty: "Prof. Michael Johnson",
    colorClass: "bg-course-600 text-white",
  });

  // Add a conflict
  initialSchedule.Lunes[5].courses.push({
    code: "CS201",
    name: "Estructura de Datos",
    room: "CIE-102",
    faculty: "Dra. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Lunes[5].courses.push({
    code: "PHYS101",
    name: "Física I",
    room: "CIE-102",
    faculty: "Dr. Robert Lee",
    colorClass: "bg-room-600 text-white",
    hasConflict: true,
  });

  initialSchedule.Lunes[6].courses.push({
    code: "CS201",
    name: "Estructura de Datos",
    room: "CIE-102",
    faculty: "Dra. Jane Smith",
    colorClass: "bg-academic-600 text-white",
  });

  initialSchedule.Lunes[6].courses.push({
    code: "PHYS101",
    name: "Física I",
    room: "CIE-102",
    faculty: "Dr. Robert Lee",
    colorClass: "bg-room-600 text-white",
    hasConflict: true,
  });

  return initialSchedule;
};

export const careers = [
  { id: "car1", name: "Ingeniería de Software", institutionId: "inst1" },
  { id: "car2", name: "Ciencias de la Computación", institutionId: "inst1" },
  { id: "car3", name: "Administración de Empresas", institutionId: "inst2" },
  { id: "car4", name: "Marketing Digital", institutionId: "inst2" }
];

export const subjects = [
  { id: "sub1", code: "CS101", name: "Introducción a la Programación", careerId: "car1", hoursPerWeek: 6, requiredRoomType: "Laboratorio" },
  { id: "sub2", code: "CS201", name: "Estructura de Datos", careerId: "car1", hoursPerWeek: 4, requiredRoomType: "Laboratorio" },
  { id: "sub3", code: "MATH101", name: "Cálculo I", careerId: "car1", hoursPerWeek: 6 },
  { id: "sub4", code: "MATH201", name: "Cálculo II", careerId: "car2", hoursPerWeek: 4, specialty: "Matemáticas" },
  { id: "sub5", code: "BUS101", name: "Introducción a los Negocios", careerId: "car3", hoursPerWeek: 4, specialty: "Negocios" },
  { id: "sub6", code: "MKT101", name: "Fundamentos de Marketing", careerId: "car4", hoursPerWeek: 4 }
];

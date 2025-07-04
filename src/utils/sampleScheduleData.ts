
import { ScheduleType, TimeSlot } from "@/types/schedule";

// Create sample schedule with realistic data
export const createInitialSchedule = (): ScheduleType => {
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const scheduleObj: ScheduleType = {};

  daysOfWeek.forEach(day => {
    // 14 time slots (8 AM to 9 PM)
    scheduleObj[day] = Array(14).fill(null).map(() => ({ courses: [] }));
  });

  // Agregar algunos cursos de ejemplo
  // Lunes
  scheduleObj["Lunes"][0].courses.push({
    code: "SIS-101",
    name: "Programación I",
    room: "A-101",
    faculty: "Dr. Juan Pérez",
    section: "Sección A",
    semester: "Semestre 1",
    colorClass: "bg-blue-100 border-blue-300 text-blue-800"
  });

  scheduleObj["Lunes"][2].courses.push({
    code: "MAT-101",
    name: "Álgebra Lineal",
    room: "A-102",
    faculty: "Dra. María López",
    section: "Sección B",
    semester: "Semestre 1",
    colorClass: "bg-green-100 border-green-300 text-green-800"
  });

  // Martes
  scheduleObj["Martes"][1].courses.push({
    code: "CIV-101",
    name: "Cálculo I",
    room: "A-103",
    faculty: "Prof. Carlos Rodríguez",
    section: "Sección A",
    semester: "Semestre 1",
    colorClass: "bg-yellow-100 border-yellow-300 text-yellow-800"
  });

  scheduleObj["Martes"][4].courses.push({
    code: "MED-101",
    name: "Anatomía Humana",
    room: "B-201",
    faculty: "Dra. Ana Martínez",
    section: "Sección A",
    semester: "Semestre 1",
    colorClass: "bg-red-100 border-red-300 text-red-800"
  });

  // Miércoles
  scheduleObj["Miércoles"][0].courses.push({
    code: "SIS-102",
    name: "Algoritmos y Estructuras",
    room: "L-101",
    faculty: "Dr. Juan Pérez",
    section: "Sección A",
    semester: "Semestre 2",
    colorClass: "bg-purple-100 border-purple-300 text-purple-800"
  });

  scheduleObj["Miércoles"][3].courses.push({
    code: "ADM-101",
    name: "Fundamentos de Administración",
    room: "B-202",
    faculty: "Prof. Roberto Silva",
    section: "Sección B",
    semester: "Semestre 1",
    colorClass: "bg-orange-100 border-orange-300 text-orange-800"
  });

  // Jueves
  scheduleObj["Jueves"][2].courses.push({
    code: "CIV-201",
    name: "Mecánica de Suelos",
    room: "L-102",
    faculty: "Prof. Carlos Rodríguez",
    section: "Sección A",
    semester: "Semestre 3",
    colorClass: "bg-teal-100 border-teal-300 text-teal-800"
  });

  // Viernes
  scheduleObj["Viernes"][1].courses.push({
    code: "SIS-201",
    name: "Base de Datos",
    room: "L-103",
    faculty: "Dr. Juan Pérez",
    section: "Sección A",
    semester: "Semestre 3",
    colorClass: "bg-indigo-100 border-indigo-300 text-indigo-800"
  });

  scheduleObj["Viernes"][5].courses.push({
    code: "ADM-201",
    name: "Marketing",
    room: "A-101",
    faculty: "Prof. Roberto Silva",
    section: "Sección B",
    semester: "Semestre 3",
    colorClass: "bg-pink-100 border-pink-300 text-pink-800"
  });

  return scheduleObj;
};

// Datos de ejemplo para carreras y materias
export const careers = [
  { id: "car1", name: "Ingeniería en Sistemas", institutionId: "inst1" },
  { id: "car2", name: "Ingeniería Civil", institutionId: "inst1" },
  { id: "car3", name: "Administración", institutionId: "inst2" },
  { id: "car4", name: "Medicina", institutionId: "inst2" },
  { id: "car5", name: "Matemáticas", institutionId: "inst1" }
];

export const subjects = [
  // Ingeniería en Sistemas
  { id: "sub1", name: "Programación I", code: "SIS-101", careerId: "car1" },
  { id: "sub2", name: "Algoritmos y Estructuras", code: "SIS-102", careerId: "car1" },
  { id: "sub3", name: "Base de Datos", code: "SIS-201", careerId: "car1" },
  { id: "sub4", name: "Ingeniería de Software", code: "SIS-301", careerId: "car1" },
  
  // Ingeniería Civil
  { id: "sub5", name: "Cálculo I", code: "CIV-101", careerId: "car2" },
  { id: "sub6", name: "Física I", code: "CIV-102", careerId: "car2" },
  { id: "sub7", name: "Mecánica de Suelos", code: "CIV-201", careerId: "car2" },
  
  // Administración
  { id: "sub8", name: "Fundamentos de Administración", code: "ADM-101", careerId: "car3" },
  { id: "sub9", name: "Marketing", code: "ADM-201", careerId: "car3" },
  { id: "sub10", name: "Finanzas", code: "ADM-301", careerId: "car3" },
  
  // Medicina
  { id: "sub11", name: "Anatomía Humana", code: "MED-101", careerId: "car4" },
  { id: "sub12", name: "Fisiología", code: "MED-102", careerId: "car4" },
  
  // Matemáticas
  { id: "sub13", name: "Álgebra Lineal", code: "MAT-101", careerId: "car5" },
  { id: "sub14", name: "Cálculo Diferencial", code: "MAT-102", careerId: "car5" }
];

// Returns sample schedule with data
export const getSampleScheduleData = (): ScheduleType => {
  return createInitialSchedule();
};

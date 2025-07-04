
// Datos de ejemplo para el sistema académico

export const sampleUnidadesAcademicas = [
  { id: 1, nombre: "Facultad de Ingeniería" },
  { id: 2, nombre: "Facultad de Ciencias" },
  { id: 3, nombre: "Facultad de Humanidades" },
  { id: 4, nombre: "Facultad de Medicina" },
  { id: 5, nombre: "Facultad de Economía" }
];

export const sampleCarreras = [
  { id: 1, nombre_carrera: "Ingeniería en Sistemas", unidad: 1 },
  { id: 2, nombre_carrera: "Ingeniería Civil", unidad: 1 },
  { id: 3, nombre_carrera: "Ingeniería Industrial", unidad: 1 },
  { id: 4, nombre_carrera: "Matemáticas", unidad: 2 },
  { id: 5, nombre_carrera: "Física", unidad: 2 },
  { id: 6, nombre_carrera: "Química", unidad: 2 },
  { id: 7, nombre_carrera: "Literatura", unidad: 3 },
  { id: 8, nombre_carrera: "Historia", unidad: 3 },
  { id: 9, nombre_carrera: "Medicina General", unidad: 4 },
  { id: 10, nombre_carrera: "Administración", unidad: 5 },
  { id: 11, nombre_carrera: "Contaduría", unidad: 5 }
];

export const sampleMaterias = [
  // Ingeniería en Sistemas
  { id: 1, materia_id: 1, nombre_materia: "Programación I", codigo_materia: "SIS-101" },
  { id: 2, materia_id: 2, nombre_materia: "Algoritmos y Estructuras de Datos", codigo_materia: "SIS-102" },
  { id: 3, materia_id: 3, nombre_materia: "Base de Datos", codigo_materia: "SIS-201" },
  { id: 4, materia_id: 4, nombre_materia: "Ingeniería de Software", codigo_materia: "SIS-301" },
  { id: 5, materia_id: 5, nombre_materia: "Redes de Computadoras", codigo_materia: "SIS-302" },
  
  // Ingeniería Civil
  { id: 6, materia_id: 6, nombre_materia: "Cálculo I", codigo_materia: "CIV-101" },
  { id: 7, materia_id: 7, nombre_materia: "Física I", codigo_materia: "CIV-102" },
  { id: 8, materia_id: 8, nombre_materia: "Mecánica de Suelos", codigo_materia: "CIV-201" },
  { id: 9, materia_id: 9, nombre_materia: "Estructuras", codigo_materia: "CIV-301" },
  
  // Matemáticas
  { id: 10, materia_id: 10, nombre_materia: "Álgebra Lineal", codigo_materia: "MAT-101" },
  { id: 11, materia_id: 11, nombre_materia: "Cálculo Diferencial", codigo_materia: "MAT-102" },
  { id: 12, materia_id: 12, nombre_materia: "Geometría Analítica", codigo_materia: "MAT-201" },
  
  // Medicina
  { id: 13, materia_id: 13, nombre_materia: "Anatomía Humana", codigo_materia: "MED-101" },
  { id: 14, materia_id: 14, nombre_materia: "Fisiología", codigo_materia: "MED-102" },
  { id: 15, materia_id: 15, nombre_materia: "Farmacología", codigo_materia: "MED-201" },
  
  // Administración
  { id: 16, materia_id: 16, nombre_materia: "Fundamentos de Administración", codigo_materia: "ADM-101" },
  { id: 17, materia_id: 17, nombre_materia: "Contabilidad General", codigo_materia: "ADM-102" },
  { id: 18, materia_id: 18, nombre_materia: "Marketing", codigo_materia: "ADM-201" },
  { id: 19, materia_id: 19, nombre_materia: "Finanzas", codigo_materia: "ADM-301" },
  { id: 20, materia_id: 20, nombre_materia: "Recursos Humanos", codigo_materia: "ADM-302" }
];

export const sampleDocentes = [
  { 
    id: 1, 
    nombre: "Juan Carlos", 
    apellido: "Pérez López", 
    especialidades: ["Programación", "Algoritmos", "Base de Datos"],
    departamento: "Ingeniería en Sistemas"
  },
  { 
    id: 2, 
    nombre: "María Elena", 
    apellido: "García Rodríguez", 
    especialidades: ["Cálculo", "Álgebra", "Geometría"],
    departamento: "Matemáticas"
  },
  { 
    id: 3, 
    nombre: "Roberto", 
    apellido: "Martínez Silva", 
    especialidades: ["Estructuras", "Mecánica de Suelos"],
    departamento: "Ingeniería Civil"
  },
  { 
    id: 4, 
    nombre: "Ana Sofía", 
    apellido: "López Hernández", 
    especialidades: ["Anatomía", "Fisiología"],
    departamento: "Medicina"
  },
  { 
    id: 5, 
    nombre: "Carlos Eduardo", 
    apellido: "Ramírez Torres", 
    especialidades: ["Administración", "Marketing", "Finanzas"],
    departamento: "Administración"
  },
  { 
    id: 6, 
    nombre: "Laura Patricia", 
    apellido: "Morales Vega", 
    especialidades: ["Física", "Química"],
    departamento: "Ciencias Exactas"
  },
  { 
    id: 7, 
    nombre: "Miguel Ángel", 
    apellido: "Flores Castro", 
    especialidades: ["Literatura", "Historia"],
    departamento: "Humanidades"
  },
  { 
    id: 8, 
    nombre: "Sandra Isabel", 
    apellido: "Jiménez Moreno", 
    especialidades: ["Contabilidad", "Auditoría"],
    departamento: "Contaduría"
  }
];

export const sampleHorarios = [
  // Lunes
  { id: 1, docente_id: 1, curso_id: 1, aula_id: 1, dia: "Lunes", hora_inicio: "08:00", hora_fin: "10:00" },
  { id: 2, docente_id: 2, curso_id: 6, aula_id: 2, dia: "Lunes", hora_inicio: "10:00", hora_fin: "12:00" },
  { id: 3, docente_id: 3, curso_id: 8, aula_id: 3, dia: "Lunes", hora_inicio: "14:00", hora_fin: "16:00" },
  
  // Martes
  { id: 4, docente_id: 1, curso_id: 2, aula_id: 1, dia: "Martes", hora_inicio: "08:00", hora_fin: "10:00" },
  { id: 5, docente_id: 4, curso_id: 13, aula_id: 4, dia: "Martes", hora_inicio: "10:00", hora_fin: "12:00" },
  { id: 6, docente_id: 5, curso_id: 16, aula_id: 5, dia: "Martes", hora_inicio: "16:00", hora_fin: "18:00" },
  
  // Miércoles
  { id: 7, docente_id: 2, curso_id: 10, aula_id: 2, dia: "Miércoles", hora_inicio: "08:00", hora_fin: "10:00" },
  { id: 8, docente_id: 6, curso_id: 7, aula_id: 6, dia: "Miércoles", hora_inicio: "14:00", hora_fin: "16:00" },
  
  // Jueves
  { id: 9, docente_id: 3, curso_id: 9, aula_id: 3, dia: "Jueves", hora_inicio: "10:00", hora_fin: "12:00" },
  { id: 10, docente_id: 7, curso_id: 17, aula_id: 7, dia: "Jueves", hora_inicio: "16:00", hora_fin: "18:00" },
  
  // Viernes
  { id: 11, docente_id: 1, curso_id: 3, aula_id: 1, dia: "Viernes", hora_inicio: "08:00", hora_fin: "10:00" },
  { id: 12, docente_id: 8, curso_id: 19, aula_id: 8, dia: "Viernes", hora_inicio: "14:00", hora_fin: "16:00" }
];

export const sampleAulas = [
  { id: 1, codigo: "A-101", tipo: "Teoría", capacidad: 40 },
  { id: 2, codigo: "A-102", tipo: "Teoría", capacidad: 35 },
  { id: 3, codigo: "A-103", tipo: "Teoría", capacidad: 45 },
  { id: 4, codigo: "B-201", tipo: "Teoría", capacidad: 50 },
  { id: 5, codigo: "B-202", tipo: "Teoría", capacidad: 30 },
  { id: 6, codigo: "L-101", tipo: "Laboratorio", capacidad: 25 },
  { id: 7, codigo: "L-102", tipo: "Laboratorio", capacidad: 20 },
  { id: 8, codigo: "L-103", tipo: "Laboratorio", capacidad: 30 }
];

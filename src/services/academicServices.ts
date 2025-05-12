
import api from "./api";

// Interfaces para entidades académicas
export interface UnidadAcademica {
  id: number;
  nombre: string;
}

export interface Carrera {
  id: number;
  nombre: string;
  unidad_academica: number;
}

export interface PeriodoAcademico {
  id: number;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  activo: boolean;
}

export interface TipoEspacio {
  id: number;
  nombre: string;
}

export interface EspacioFisico {
  id: number;
  nombre: string;
  capacidad: number;
  tipo: number;
}

export interface Especialidad {
  id: number;
  nombre: string;
}

export interface Materia {
  id: number;
  nombre: string;
  codigo: string;
}

export interface CarreraMateria {
  id: number;
  carrera: number;
  materia: number;
  semestre: number;
}

export interface MateriaEspecialidad {
  id: number;
  materia: number;
  especialidad: number;
}

// Servicios para endpoints públicos académicos
export const academicServices = {
  // Unidades Académicas
  getUnidadesAcademicas: async () => {
    const response = await api.get("/api/academic/unidades-academicas/");
    return response.data;
  },

  // Carreras
  getCarreras: async () => {
    const response = await api.get("/api/academic/carreras/");
    return response.data;
  },

  // Períodos Académicos
  getPeriodosAcademicos: async () => {
    const response = await api.get("/api/academic/periodos-academicos/");
    return response.data;
  },

  // Tipos de Espacio
  getTiposEspacio: async () => {
    const response = await api.get("/api/academic/tipos-espacio/");
    return response.data;
  },

  // Espacios Físicos
  getEspaciosFisicos: async () => {
    const response = await api.get("/api/academic/espacios-fisicos/");
    return response.data;
  },

  // Especialidades
  getEspecialidades: async () => {
    const response = await api.get("/api/academic/especialidades/");
    return response.data;
  },

  // Materias
  getMaterias: async () => {
    const response = await api.get("/api/academic/materias/");
    return response.data;
  },

  // Relación Carrera-Materias
  getCarreraMaterias: async () => {
    const response = await api.get("/api/academic/carrera-materias/");
    return response.data;
  },

  // Especialidades requeridas por materia
  getMateriaEspecialidadesRequeridas: async () => {
    const response = await api.get("/api/academic/materia-especialidades-requeridas/");
    return response.data;
  }
};


import api from "./api";
import { 
  sampleUnidadesAcademicas, 
  sampleCarreras, 
  sampleMaterias 
} from "@/utils/sampleData";

export interface UnidadAcademica { id: number; nombre: string; }
export interface Carrera { id: number; nombre_carrera: string; unidad: number; }
export interface Materia { id: number; materia_id: number; nombre_materia: string; codigo_materia: string; }
export interface CarreraMateria { id: number; carrera: number; materia: number; ciclo_sugerido?: number | null; }

// Modo de desarrollo - usar datos de ejemplo
const DEV_MODE = true;

function normalizeDataArray<T>(data: any): T[] {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export const academicServices = {
  getUnidadesAcademicas: async (): Promise<UnidadAcademica[]> => {
    if (DEV_MODE) {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 300));
      return sampleUnidadesAcademicas;
    }
    
    const response = await api.get("/api/academic/unidades-academicas/");
    const raw = Array.isArray(response.data.results) ? response.data.results : [];
    return raw.map((u: any) => ({
      id: u.unidad_id,
      nombre: u.nombre_unidad
    }));
  },

  getCarreras: async (): Promise<Carrera[]> => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return sampleCarreras;
    }
    
    const res = await api.get("/api/academic/carreras/");
    return normalizeDataArray<Carrera>(res.data);
  },

  createCarrera: async (nombre_carrera: string, unidad: number) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const newId = Math.max(...sampleCarreras.map(c => c.id)) + 1;
      const newCarrera = { id: newId, nombre_carrera, unidad };
      sampleCarreras.push(newCarrera);
      return { data: newCarrera };
    }
    
    return api.post("/api/academic/carreras/", { nombre_carrera, unidad });
  },

  updateCarrera: async (id: number, nombre_carrera: string, unidad: number) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = sampleCarreras.findIndex(c => c.id === id);
      if (index !== -1) {
        sampleCarreras[index] = { ...sampleCarreras[index], nombre_carrera, unidad };
      }
      return { data: sampleCarreras[index] };
    }
    
    return api.put(`/api/academic/carreras/${id}/`, { nombre_carrera, unidad });
  },

  deleteCarrera: async (id: number) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = sampleCarreras.findIndex(c => c.id === id);
      if (index !== -1) {
        sampleCarreras.splice(index, 1);
      }
      return;
    }
    
    return api.delete(`/api/academic/carreras/${id}/`);
  },

  getMaterias: async (): Promise<Materia[]> => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return sampleMaterias.map(m => ({
        id: m.materia_id,
        materia_id: m.materia_id,
        nombre_materia: m.nombre_materia,
        codigo_materia: m.codigo_materia,
        nombre: m.nombre_materia,
        codigo: m.codigo_materia,
      }));
    }
    
    const res = await api.get("/api/academic/materias/");
    return normalizeDataArray<Materia>(res.data).map(m => ({
      id: m.materia_id,
      materia_id: m.materia_id,
      nombre_materia: m.nombre_materia,
      codigo_materia: m.codigo_materia,
      nombre: m.nombre_materia,
      codigo: m.codigo_materia,
    }));
  },

  createMateria: async (nombre: string, codigo: string) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const newId = Math.max(...sampleMaterias.map(m => m.materia_id)) + 1;
      const newMateria = { 
        id: newId, 
        materia_id: newId, 
        nombre_materia: nombre, 
        codigo_materia: codigo 
      };
      sampleMaterias.push(newMateria);
      return { data: newMateria };
    }
    
    return api.post("/api/academic/materias/", { nombre_materia: nombre, codigo_materia: codigo });
  },

  updateMateria: async (id: number, nombre: string, codigo: string) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = sampleMaterias.findIndex(m => m.materia_id === id);
      if (index !== -1) {
        sampleMaterias[index] = { 
          ...sampleMaterias[index], 
          nombre_materia: nombre, 
          codigo_materia: codigo 
        };
      }
      return { data: sampleMaterias[index] };
    }
    
    return api.put(`/api/academic/materias/${id}/`, { nombre_materia: nombre, codigo_materia: codigo });
  },

  deleteMateria: async (id: number) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = sampleMaterias.findIndex(m => m.materia_id === id);
      if (index !== -1) {
        sampleMaterias.splice(index, 1);
      }
      return;
    }
    
    return api.delete(`/api/academic/materias/${id}/`);
  },

  getRelacionesCarreraMateria: async (): Promise<CarreraMateria[]> => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      // Generar relaciones de ejemplo
      return [
        { id: 1, carrera: 1, materia: 1, ciclo_sugerido: 1 },
        { id: 2, carrera: 1, materia: 2, ciclo_sugerido: 2 },
        { id: 3, carrera: 1, materia: 3, ciclo_sugerido: 3 },
        { id: 4, carrera: 2, materia: 6, ciclo_sugerido: 1 },
        { id: 5, carrera: 2, materia: 7, ciclo_sugerido: 1 },
        { id: 6, carrera: 4, materia: 10, ciclo_sugerido: 1 },
        { id: 7, carrera: 4, materia: 11, ciclo_sugerido: 1 },
      ];
    }
    
    const res = await api.get("/api/academic/carrera-materias/");
    return normalizeDataArray<CarreraMateria>(res.data).map(rel => ({
      id: rel.id,
      carrera: rel.carrera,
      materia: rel.materia,
      ciclo_sugerido: rel.ciclo_sugerido,
    }));
  },

  createCarreraMateria: async (carrera: number, materia: number, ciclo_sugerido?: number | null) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { data: { id: Date.now(), carrera, materia, ciclo_sugerido } };
    }
    
    return api.post("/api/academic/carrera-materias/", { carrera, materia, ciclo_sugerido });
  },

  deleteCarreraMateria: async (id: number) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return;
    }
    
    return api.delete(`/api/academic/carrera-materias/${id}/`);
  }
};

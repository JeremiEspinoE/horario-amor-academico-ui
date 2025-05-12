import api from "./api";

export interface UnidadAcademica { id: number; nombre: string; }
export interface Carrera { id: number; nombre_carrera: string; unidad: number; }
export interface Materia { id: number; materia_id: number; nombre_materia: string; codigo_materia: string; }
export interface CarreraMateria { id: number; carrera: number; materia: number; ciclo_sugerido?: number | null; }

function normalizeDataArray<T>(data: any): T[] {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

export const academicServices = {
  getUnidadesAcademicas: async (): Promise<UnidadAcademica[]> => {
    const response = await api.get("/api/academic/unidades-academicas/");
    const raw = Array.isArray(response.data.results) ? response.data.results : [];
    return raw.map((u: any) => ({
      id: u.unidad_id,
      nombre: u.nombre_unidad
    }));
  },
  getCarreras: async (): Promise<Carrera[]> => {
    const res = await api.get("/api/academic/carreras/");
    return normalizeDataArray<Carrera>(res.data);
  },
  createCarrera: (nombre_carrera: string, unidad: number) =>
    api.post("/api/academic/carreras/", { nombre_carrera, unidad }),
  updateCarrera: (id: number, nombre_carrera: string, unidad: number) =>
    api.put(`/api/academic/carreras/${id}/`, { nombre_carrera, unidad }),
  deleteCarrera: (id: number) => api.delete(`/api/academic/carreras/${id}/`),

  getMaterias: async (): Promise<Materia[]> => {
    const res = await api.get("/api/academic/materias/");
    return normalizeDataArray<Materia>(res.data).map(m => ({
      id: m.materia_id,
      materia_id: m.materia_id,
      nombre_materia: m.nombre_materia,
      codigo_materia: m.codigo_materia,
      nombre: m.nombre_materia, // Manteniendo para uso interno en el frontend si es necesario
      codigo: m.codigo_materia,   // Manteniendo para uso interno en el frontend si es necesario
    }));
  },
  createMateria: (nombre: string, codigo: string) =>
    api.post("/api/academic/materias/", { nombre_materia: nombre, codigo_materia: codigo }),
  updateMateria: (id: number, nombre: string, codigo: string) =>
    api.put(`/api/academic/materias/${id}/`, { nombre_materia: nombre, codigo_materia: codigo }),
  deleteMateria: (id: number) => api.delete(`/api/academic/materias/${id}/`),

  getRelacionesCarreraMateria: async (): Promise<CarreraMateria[]> => {
    const res = await api.get("/api/academic/carrera-materias/");
    return normalizeDataArray<CarreraMateria>(res.data).map(rel => ({
      id: rel.id,
      carrera: rel.carrera,
      materia: rel.materia,
      ciclo_sugerido: rel.ciclo_sugerido,
    }));
  },
  createCarreraMateria: (carrera: number, materia: number, ciclo_sugerido?: number | null) =>
    api.post("/api/academic/carrera-materias/", { carrera, materia, ciclo_sugerido }),
  deleteCarreraMateria: (id: number) => api.delete(`/api/academic/carrera-materias/${id}/`),
};
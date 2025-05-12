
import api from "./api";

// Interfaces
export interface Docente {
  id: number;
  nombre: string;
  apellido: string;
  especialidades: string[];
}

export interface DocenteRequest {
  nombre: string;
  apellido: string;
  especialidades: string[];
}

// Servicio de docentes
export const docenteService = {
  getAll: async () => {
    const response = await api.get("/api/users/docentes/");
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/api/users/docentes/${id}/`);
    return response.data;
  },

  create: async (data: DocenteRequest) => {
    const response = await api.post("/api/users/docentes/", data);
    return response.data;
  },

  update: async (id: number, data: DocenteRequest) => {
    const response = await api.put(`/api/users/docentes/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/api/users/docentes/${id}/`);
  }
};

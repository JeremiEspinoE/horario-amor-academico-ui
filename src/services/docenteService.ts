
import api from "./api";
import { sampleDocentes } from "@/utils/sampleData";

// Interfaces
export interface Docente {
  id: number;
  nombre: string;
  apellido: string;
  especialidades: string[];
  departamento?: string;
}

export interface DocenteRequest {
  nombre: string;
  apellido: string;
  especialidades: string[];
}

// Modo de desarrollo
const DEV_MODE = true;

// Servicio de docentes
export const docenteService = {
  getAll: async () => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return sampleDocentes;
    }
    
    const response = await api.get("/api/users/docentes/");
    return response.data;
  },

  getById: async (id: number) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return sampleDocentes.find(d => d.id === id);
    }
    
    const response = await api.get(`/api/users/docentes/${id}/`);
    return response.data;
  },

  create: async (data: DocenteRequest) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const newId = Math.max(...sampleDocentes.map(d => d.id)) + 1;
      const newDocente = { 
        id: newId, 
        ...data, 
        departamento: "Sin Asignar" 
      };
      sampleDocentes.push(newDocente);
      return newDocente;
    }
    
    const response = await api.post("/api/users/docentes/", data);
    return response.data;
  },

  update: async (id: number, data: DocenteRequest) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = sampleDocentes.findIndex(d => d.id === id);
      if (index !== -1) {
        sampleDocentes[index] = { ...sampleDocentes[index], ...data };
      }
      return sampleDocentes[index];
    }
    
    const response = await api.put(`/api/users/docentes/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = sampleDocentes.findIndex(d => d.id === id);
      if (index !== -1) {
        sampleDocentes.splice(index, 1);
      }
      return;
    }
    
    await api.delete(`/api/users/docentes/${id}/`);
  }
};

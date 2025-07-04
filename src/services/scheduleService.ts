
import api from "./api";
import { sampleHorarios } from "@/utils/sampleData";

// Interfaces
export interface Horario {
  id: number;
  docente_id: number;
  curso_id: number;
  aula_id: number;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
}

export interface HorarioRequest {
  docente_id: number;
  curso_id: number;
  aula_id: number;
  dia: string;
  hora_inicio: string;
  hora_fin: string;
}

// Modo de desarrollo
const DEV_MODE = true;

// Servicio de horarios
export const scheduleService = {
  getAll: async () => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return sampleHorarios;
    }
    
    const response = await api.get("/api/users/horarios/");
    return response.data;
  },

  create: async (data: HorarioRequest) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const newId = Math.max(...sampleHorarios.map(h => h.id)) + 1;
      const newHorario = { id: newId, ...data };
      sampleHorarios.push(newHorario);
      return newHorario;
    }
    
    const response = await api.post("/api/users/horarios/", data);
    return response.data;
  },

  update: async (id: number, data: HorarioRequest) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = sampleHorarios.findIndex(h => h.id === id);
      if (index !== -1) {
        sampleHorarios[index] = { ...sampleHorarios[index], ...data };
      }
      return sampleHorarios[index];
    }
    
    const response = await api.put(`/api/users/horarios/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const index = sampleHorarios.findIndex(h => h.id === id);
      if (index !== -1) {
        sampleHorarios.splice(index, 1);
      }
      return;
    }
    
    await api.delete(`/api/users/horarios/${id}/`);
  },

  // Métodos adicionales para endpoints específicos
  getDocenteHorarios: async (docenteId: number) => {
    if (DEV_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return sampleHorarios.filter(h => h.docente_id === docenteId);
    }
    
    const response = await api.get(`/api/users/docentes/${docenteId}/horarios/`);
    return response.data;
  }
};

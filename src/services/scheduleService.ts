
import api from "./api";

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

// Servicio de horarios
export const scheduleService = {
  getAll: async () => {
    const response = await api.get("/api/users/horarios/");
    return response.data;
  },

  create: async (data: HorarioRequest) => {
    const response = await api.post("/api/users/horarios/", data);
    return response.data;
  },

  update: async (id: number, data: HorarioRequest) => {
    const response = await api.put(`/api/users/horarios/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/api/users/horarios/${id}/`);
  },

  // Métodos adicionales para endpoints específicos
  getDocenteHorarios: async (docenteId: number) => {
    const response = await api.get(`/api/users/docentes/${docenteId}/horarios/`);
    return response.data;
  }
};

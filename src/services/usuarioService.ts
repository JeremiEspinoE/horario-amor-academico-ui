
import api from "./api";

// Interfaces
export interface Usuario {
  id: number;
  username: string;
  email: string;
}

export interface UsuarioRequest {
  username: string;
  email: string;
  password?: string;
}

// Servicio de usuarios
export const usuarioService = {
  getAll: async () => {
    const response = await api.get("/api/users/usuarios/");
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get(`/api/users/usuarios/${id}/`);
    return response.data;
  },

  create: async (data: UsuarioRequest) => {
    const response = await api.post("/api/users/usuarios/", data);
    return response.data;
  },

  update: async (id: number, data: UsuarioRequest) => {
    const response = await api.put(`/api/users/usuarios/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/api/users/usuarios/${id}/`);
  }
};

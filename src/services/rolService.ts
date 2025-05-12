
import api from "./api";

// Interfaces
export interface Rol {
  id: number;
  nombre: string;
}

// Servicio de roles
export const rolService = {
  getAll: async () => {
    const response = await api.get("/api/users/roles/");
    return response.data;
  }
};

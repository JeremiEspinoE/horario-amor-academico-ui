
import api from "./api";
import { toast } from "sonner";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const response = await api.post<TokenResponse>(
        "/api/auth/token/", 
        credentials
      );
      
      const { access, refresh } = response.data;
      
      // Guardar tokens en localStorage
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      
      return true;
    } catch (error) {
      console.error("Error de login:", error);
      toast.error("Credenciales inválidas");
      return false;
    }
  },
  
  logout: (): void => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
  },
  
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("access_token");
  },
  
  refreshToken: async (): Promise<string | null> => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      
      if (!refreshToken) {
        return null;
      }
      
      const response = await api.post<{ access: string }>(
        "/api/auth/refresh/",
        { refresh: refreshToken }
      );
      
      const { access } = response.data;
      localStorage.setItem("access_token", access);
      
      return access;
    } catch (error) {
      console.error("Error al refrescar token:", error);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      return null;
    }
  }
};

export default authService;

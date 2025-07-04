
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

// Usuario de ejemplo para desarrollo
const DEV_USER = {
  username: "admin",
  password: "admin123"
};

// Modo de desarrollo - cambiar a false cuando tengas backend
const DEV_MODE = true;

export const authService = {
  login: async (credentials: LoginCredentials): Promise<boolean> => {
    console.log("Intentando login con:", credentials);
    
    // Modo de desarrollo
    if (DEV_MODE) {
      console.log("Modo de desarrollo activado");
      
      if (credentials.username === DEV_USER.username && 
          credentials.password === DEV_USER.password) {
        
        // Simular tokens de desarrollo
        const mockTokens = {
          access: "dev_access_token_12345",
          refresh: "dev_refresh_token_67890"
        };
        
        localStorage.setItem("access_token", mockTokens.access);
        localStorage.setItem("refresh_token", mockTokens.refresh);
        
        console.log("Login exitoso en modo desarrollo");
        return true;
      } else {
        console.log("Credenciales incorrectas");
        toast.error("Credenciales inválidas. Usa: admin / admin123");
        return false;
      }
    }
    
    // Modo producción con backend
    try {
      const response = await api.post<TokenResponse>(
        "/api/auth/token/", 
        credentials
      );
      
      const { access, refresh } = response.data;
      
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
    // En modo desarrollo, simular refresh exitoso
    if (DEV_MODE) {
      const currentToken = localStorage.getItem("access_token");
      if (currentToken) {
        return currentToken;
      }
      return null;
    }
    
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

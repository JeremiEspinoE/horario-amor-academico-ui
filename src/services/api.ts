
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

// Constante para la URL base del API
export const API_URL = "http://127.0.0.1:8000";

// Crear instancia de axios con la URL base
export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");
    
    // Solo añadir el token si existe y no es una petición a los endpoints públicos
    if (token && !isPublicEndpoint(config.url || "")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Función para identificar endpoints públicos
function isPublicEndpoint(url: string): boolean {
  const publicEndpoints = [
    "/api/auth/token/",
    "/api/auth/refresh/",
    "/api/academic/unidades-academicas",
    "/api/academic/carreras",
    "/api/academic/periodos-academicos",
    "/api/academic/tipos-espacio",
    "/api/academic/espacios-fisicos",
    "/api/academic/especialidades",
    "/api/academic/materias",
    "/api/academic/carrera-materias",
    "/api/academic/materia-especialidades-requeridas",
  ];
  
  return publicEndpoints.some(endpoint => url.includes(endpoint));
}

// Interceptor para manejar errores y refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si el error es 401 (Unauthorized) y no es un retry y no es en login o refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/api/auth/token/") &&
      !originalRequest.url?.includes("/api/auth/refresh/")
    ) {
      originalRequest._retry = true;
      
      try {
        // Intentar refrescar el token
        const refreshToken = localStorage.getItem("refresh_token");
        
        if (!refreshToken) {
          // No hay refresh token, redirigir a login
          localStorage.removeItem("access_token");
          window.location.href = "/login";
          return Promise.reject(error);
        }
        
        // Llamada para refrescar el token
        const response = await axios.post(
          `${API_URL}/api/auth/refresh/`,
          { refresh: refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );
        
        const { access } = response.data;
        
        // Guardar el nuevo token
        localStorage.setItem("access_token", access);
        
        // Reintentar la petición original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Error al refrescar, logout
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AppProvider, useAppContext } from "./context/AppContext";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Faculty from "./pages/Faculty";
import Courses from "./pages/Courses";
import Availability from "./pages/Availability";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import AppLayout from "./components/layout/AppLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Componente para proteger rutas según el rol del usuario
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { userRole } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pequeño retraso para asegurar que el contexto esté cargado
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return null;
  
  // Si no hay rol, redirigir a la selección de rol
  if (!userRole) return <Navigate to="/" replace />;
  
  // Si el rol no está permitido y no es administrativo (que tiene acceso a todo)
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole) && userRole !== "administrativo") {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppWithProviders = () => (
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route element={
          <ProtectedRoute allowedRoles={["administrativo", "docente"]}>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/faculty" element={
            <ProtectedRoute allowedRoles={["administrativo"]}>
              <Faculty />
            </ProtectedRoute>
          } />
          <Route path="/courses" element={
            <ProtectedRoute allowedRoles={["administrativo"]}>
              <Courses />
            </ProtectedRoute>
          } />
          <Route path="/availability" element={<Availability />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AppProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppWithProviders />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { Navigate } from "react-router-dom";

// Redirigir a la página de inicio de sesión
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;

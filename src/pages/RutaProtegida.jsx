import { Navigate } from "react-router-dom";


import {useAuth} from "../context/AuthProvider.jsx"; // Asegurate que la ruta a tu AuthProvider sea correcta --- IGNORE ---   

const RutaProtegida = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="cargando-admin">Verificando...</div>;

  if (!user) {
    // Si no hay usuario, lo rebota al login
    return <Navigate to="/login" />;
  }

  // Si hay usuario, lo deja pasar al contenido (el Admin)
  return children;
};

export default RutaProtegida;
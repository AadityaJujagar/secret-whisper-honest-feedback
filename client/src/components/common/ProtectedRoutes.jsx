import { useAuth } from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!isAuthenticated) {
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }

  return children;
};

export default ProtectedRoutes;

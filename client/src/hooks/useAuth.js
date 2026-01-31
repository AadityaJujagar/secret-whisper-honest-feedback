import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";

export const useAuth = () => {
  const useAuthContext = useContext(AuthContext);
  if (!useAuthContext) {
    throw new Error("useAuthContext must be used inside AuthProvider.");
  }
  return useAuthContext;
};

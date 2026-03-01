import { useContext, useMemo } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth() {
  const { user, loading, register, login, logout, refresh } = useContext(AuthContext);

  const isAuthenticated = !!user;
  const role = String(user?.role || "").toLowerCase().trim();
  const isAdmin = role === "admin";

  return useMemo(
    () => ({ user, loading, isAuthenticated, role, isAdmin, register, login, logout, refresh }),
    [user, loading, isAuthenticated, role, isAdmin, register, login, logout, refresh]
  );
}

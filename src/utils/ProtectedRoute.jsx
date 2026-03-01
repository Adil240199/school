import React from "react";
import { Navigate } from "react-router-dom";
import PreLoader from "../components/preloader/preloader";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children, requiredRole }) {
  const { loading, isAuthenticated, role } = useAuth();

  if (loading) return <PreLoader />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!requiredRole) return children;

  const allowed = Array.isArray(requiredRole)
    ? requiredRole.map((r) => String(r).toLowerCase().trim()).includes(role)
    : String(requiredRole).toLowerCase().trim() === role;

  return allowed ? children : <Navigate to="/courses" replace />;
}

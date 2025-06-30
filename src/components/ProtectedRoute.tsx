import React from "react";
import { useAuth } from "../hooks/Auth/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}

export function ProtectedRoute({
  children,
  fallback,
  requireAuth = true,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg">Verificando autenticação...</p>
      </div>
    );
  }

  // Se requer autenticação mas não está autenticado
  if (requireAuth && !isAuthenticated) {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <h2 className="text-xl font-bold mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-4">
            Você precisa estar logado para acessar esta página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Fazer Login
          </button>
        </div>
      )
    );
  }

  // Se não requer autenticação ou está autenticado
  return <>{children}</>;
}

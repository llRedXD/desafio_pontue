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
          <button
            onClick={() => (window.location.href = "/register")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2"
          >
            Registrar
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Ou volte para as postagens públicas.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="text-blue-500 hover:underline mt-2"
          >
            Ir para a página inicial
          </button>
        </div>
      )
    );
  }

  // Se não requer autenticação ou está autenticado
  return <>{children}</>;
}

import { useEffect, useState, type ReactNode } from "react";
import { UserContext, type UserContextType } from "./UserContext";
import { useNavigate } from "react-router-dom";
import type { User } from "../../hooks/Posts/types";

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Verifica se o usuário está autenticado
  const isAuthenticated = !!user;

  // Função para verificar se o token ainda é válido
  const isTokenValid = (token: string): boolean => {
    try {
      // Se existir informação de expiração no localStorage
      const expiresAt = localStorage.getItem("tokenExpiresAt");
      if (expiresAt) {
        const expirationDate = new Date(expiresAt);
        return expirationDate > new Date();
      }

      // Se não tiver informação de expiração, assume que o token ainda é válido
      // Aqui você poderia fazer uma verificação adicional com o servidor
      return !!token;
    } catch (error) {
      console.error("Erro ao verificar validade do token:", error);
      return false;
    }
  };

  // Função para fazer login
  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Função para fazer logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiresAt");
    navigate("/"); // Redireciona para a página inicial após logout
  };

  // Função para atualizar dados do usuário
  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Função para verificar status de autenticação
  const checkAuthStatus = (): boolean => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      return false;
    }

    if (!isTokenValid(token)) {
      logout();
      return false;
    }

    return true;
  };
  // Effect para carregar dados do usuário do localStorage na inicialização
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser && isTokenValid(token)) {
          const userData = JSON.parse(storedUser) as User;
          setUser(userData);
        } else {
          // Se o token for inválido, limpa os dados
          logout();
        }
      } catch (error) {
        console.error("Erro ao inicializar autenticação:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    // Listener para evento de token expirado
    const handleAuthExpired = () => {
      logout();
    };

    window.addEventListener("auth-expired", handleAuthExpired);
    initializeAuth();

    return () => {
      window.removeEventListener("auth-expired", handleAuthExpired);
    };
  }, []);
  // Effect para verificar periodicamente se o token ainda é válido
  useEffect(() => {
    if (!isAuthenticated) return;

    const checkTokenPeriodically = setInterval(() => {
      const token = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("user");

      if (!token || !storedUser || !isTokenValid(token)) {
        console.log("Token expirado, fazendo logout automático");
        logout();
      }
    }, 60000); // Verifica a cada minuto

    return () => clearInterval(checkTokenPeriodically);
  }, [isAuthenticated]);

  const contextValue: UserContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    checkAuthStatus,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

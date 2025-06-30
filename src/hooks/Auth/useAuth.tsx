import { useUser } from "../useUser";

/**
 * Hook personalizado para gerenciar autenticação de usuário.
 *
 * Fornece informações e utilitários relacionados ao usuário autenticado,
 * incluindo status de autenticação, permissões, validação de sessão,
 * e manipulação do token de autenticação.
 *
 * @returns Um objeto com dados do usuário, status de autenticação, funções utilitárias e métodos de controle de sessão.
 */
export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    logout,
    updateUser,
    checkAuthStatus,
  } = useUser();

  /**
   * Verifica se o usuário tem permissão para uma ação específica
   * (Pode ser expandido para incluir roles/permissões no futuro)
   */
  const hasPermission = (): boolean => {
    if (!isAuthenticated) return false;

    // Por enquanto, qualquer usuário autenticado tem todas as permissões
    // No futuro, você pode verificar roles/permissões específicas aqui
    return true;
  };

  /**
   * Verifica se o usuário é o dono de um recurso
   */
  const isOwner = (resourceUserId: number): boolean => {
    return isAuthenticated && user?.id === resourceUserId;
  };

  /**
   * Força uma verificação do status de autenticação
   * Útil para verificar se o token ainda é válido
   */
  const validateSession = (): boolean => {
    return checkAuthStatus();
  };

  /**
   * Obtém o token de autenticação atual
   */
  const getAuthToken = (): string | null => {
    return localStorage.getItem("authToken");
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
    updateUser,
    hasPermission,
    isOwner,
    validateSession,
    getAuthToken,
  };
}

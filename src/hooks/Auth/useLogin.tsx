import { useMutation } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";
import type { LoginFormData } from "../../components/Auth/Login";
import { useUser } from "../useUser";
import type { AuthenticatedUser } from "./types";

/**
 * Realiza uma requisição de login utilizando os dados fornecidos.
 *
 * @param data - Os dados do formulário de login, contendo as credenciais do usuário.
 * @returns Uma Promise que resolve para um objeto do tipo AuthenticatedUser em caso de sucesso.
 * @throws Lança um erro caso a requisição de login falhe, contendo a mensagem de erro retornada pela API ou uma mensagem padrão.
 */
async function loginRequest(data: LoginFormData): Promise<AuthenticatedUser> {
  const response = await projectApi.post("/auth/login", data);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao fazer login");
  }

  return response.json();
}

/**
 * Hook personalizado para gerenciar o processo de login do usuário.
 *
 * Utiliza o hook `useMutation` do React Query para realizar a requisição de login
 * e gerenciar os estados de sucesso e erro.
 *
 * - Ao realizar o login com sucesso, salva a data de expiração do token no localStorage
 *   (caso esteja disponível) e chama a função de login do contexto de usuário.
 * - Em caso de erro, exibe o erro no console.
 *
 * @returns Retorna o objeto de mutation do React Query para ser utilizado no componente.
 */
export function useLogin() {
  const { login: loginUser } = useUser();

  return useMutation<AuthenticatedUser, Error, LoginFormData>({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      // Salva a data de expiração do token se disponível
      if (data.token.expires_at) {
        localStorage.setItem("tokenExpiresAt", data.token.expires_at);
      }

      // Usa a função de login do contexto
      loginUser(data.user, data.token.access_token);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
}

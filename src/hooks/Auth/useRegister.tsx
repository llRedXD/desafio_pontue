import { useMutation } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";
import type { RegisterFormData } from "../../components/Auth/Register";
import type { AuthenticatedUser } from "./types";

/**
 * Registra um novo usuário utilizando os dados fornecidos.
 *
 * @param data - Os dados do formulário de registro do usuário.
 * @returns Uma Promise que resolve para o usuário autenticado.
 * @throws Lança um erro caso a resposta da API indique falha no registro.
 */
async function register(data: RegisterFormData): Promise<AuthenticatedUser> {
  const response = await projectApi.post("/auth/register", data);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao registrar usuário");
  }

  return response.json();
}

/**
 * Hook personalizado para registrar um novo usuário.
 *
 * Utiliza o React Query para gerenciar a mutação de registro de usuário.
 *
 * @returns Um objeto de mutação que pode ser usado para disparar o registro de um novo usuário.
 *
 * @example
 * const registerMutation = useRegister();
 * registerMutation.mutate({ email: 'exemplo@email.com', senha: '123456' });
 */
export function useRegister() {
  return useMutation<AuthenticatedUser, Error, RegisterFormData>({
    mutationFn: register,
  });
}

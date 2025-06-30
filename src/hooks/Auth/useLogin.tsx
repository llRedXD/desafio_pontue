import { useMutation } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";
import type { LoginFormData } from "../../components/Auth/Login";
import { useUser } from "../useUser";
import type { AuthenticatedUser } from "./types";

async function loginRequest(data: LoginFormData): Promise<AuthenticatedUser> {
  const response = await projectApi.post("/auth/login", data);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao fazer login");
  }

  return response.json();
}

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

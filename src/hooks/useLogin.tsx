import { useMutation } from "@tanstack/react-query";
import { projectApi } from "../api/projectApi";
import type { LoginFormData } from "../components/Auth/Login";
import type { User } from "./useGetPosts";
import { useUser } from "./useUser";

interface Token {
  access_token: string;
  type: string;
  expires_at: string;
}
interface LoginResponse {
  user: User;
  token: Token;
}

async function loginRequest(data: LoginFormData): Promise<LoginResponse> {
  const response = await projectApi.post("/auth/login", data);

  if (!response) {
    throw new Error("Login failed");
  }

  return response.json();
}

export function useLogin() {
  const { login: loginUser } = useUser();

  return useMutation<LoginResponse, Error, LoginFormData>({
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

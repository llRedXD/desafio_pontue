import { useMutation } from "@tanstack/react-query";
import { projectApi } from "../api/projectApi";
import type { LoginFormData } from "../components/Auth/Login";
import type { User } from "./useGetPosts";

interface Token {
  access_token: string;
  type: string;
  expires_at: string;
}
interface LoginResponse {
  user: User;
  token: Token;
}

async function login<LoginResponse>(
  data: LoginFormData
): Promise<LoginResponse> {
  const response = await projectApi.post("/auth/login", data);

  if (!response) {
    throw new Error("Login failed", response);
  }

  return response.json();
}

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginFormData>({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
}

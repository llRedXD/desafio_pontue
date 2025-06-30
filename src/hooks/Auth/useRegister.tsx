import { useMutation } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";
import type { RegisterFormData } from "../../components/Auth/Register";
import type { AuthenticatedUser } from "./types";

async function register(data: RegisterFormData): Promise<AuthenticatedUser> {
  const response = await projectApi.post("/auth/register", data);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao registrar usuário");
  }

  return response.json();
}

export function useRegister() {
  return useMutation<AuthenticatedUser, Error, RegisterFormData>({
    mutationFn: register,
  });
}

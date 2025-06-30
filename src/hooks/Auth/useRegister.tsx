import { useMutation } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";
import type { RegisterFormData } from "../../components/Auth/Register";
import type { AuthenticatedUser } from "./useLogin";

async function register(data: RegisterFormData): Promise<AuthenticatedUser> {
  const response = await projectApi.post("/auth/register", data);

  return response.json();
}

export function useRegister() {
  return useMutation<AuthenticatedUser, Error, RegisterFormData>({
    mutationFn: register,
    onSuccess: (data) => {
      // Aqui você pode lidar com o sucesso do registro, como redirecionar ou mostrar uma mensagem
      console.log("Registro bem-sucedido:", data);
    },
    onError: (error) => {
      console.error("Erro ao registrar:", error);
    },
  });
}

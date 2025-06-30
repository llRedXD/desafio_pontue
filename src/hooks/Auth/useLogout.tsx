import { useMutation } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";
import { useUser } from "../useUser";

async function logout(): Promise<void> {
  await projectApi.post("/auth/logout", null, true);
}

export function useLogout() {
  const { logout: logoutUser } = useUser();

  return useMutation<void, Error>({
    mutationFn: logout,
    onSuccess: () => {
      logoutUser(); // Chama a função de logout do contexto
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
  });
}

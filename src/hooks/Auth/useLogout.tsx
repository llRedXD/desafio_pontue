import { useMutation } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";
import { useUser } from "../useUser";
import { useNavigate } from "react-router-dom";

async function logout(): Promise<void> {
  await projectApi.post("/auth/logout", null, true);
}

export function useLogout() {
  const { logout: logoutUser } = useUser();
  const navigate = useNavigate();

  return useMutation<void, Error>({
    mutationFn: logout,
    onSuccess: () => {
      logoutUser(); // Chama a função de logout do contexto
      navigate("/"); // Redireciona para a página inicial após logout
    },
  });
}

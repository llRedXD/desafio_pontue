import { useMutation } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";
import { useUser } from "../useUser";
import { useNavigate } from "react-router-dom";

/**
 * Realiza o logout do usuário autenticado.
 *
 * Esta função faz uma requisição POST para a rota "/auth/logout" da API,
 * encerrando a sessão do usuário atual.
 *
 * @returns {Promise<void>} Uma Promise que é resolvida quando o logout é concluído.
 */
async function logout(): Promise<void> {
  await projectApi.post("/auth/logout", null, true);
}

/**
 * Hook personalizado para realizar o logout do usuário.
 *
 * Utiliza o contexto de usuário para executar a função de logout e,
 * ao ser bem-sucedido, redireciona o usuário para a página inicial.
 *
 * @returns Um objeto da mutation do React Query para executar o logout.
 */
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

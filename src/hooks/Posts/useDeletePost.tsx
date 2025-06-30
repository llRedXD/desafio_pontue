import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";

/**
 * Exclui um post pelo seu ID.
 *
 * Envia uma requisição DELETE para a API para remover o post especificado.
 *
 * @param id - O identificador único do post a ser excluído.
 * @throws Lança um erro se o usuário não tiver permissão (status 403) ou se ocorrer outro erro na exclusão.
 */
async function deletePost(id: number): Promise<void> {
  const response = await projectApi.delete(`/posts/${id}`, null, true);

  if (response.status === 403) {
    alert("Você não tem permissão para excluir este post.");
    throw new Error("Permissão negada");
  }

  if (!response.ok) {
    throw new Error("Erro ao excluir o post");
  }
}

/**
 * Hook personalizado para lidar com a exclusão de posts.
 *
 * Utiliza o React Query para realizar a mutação de exclusão de um post,
 * exibindo alertas de sucesso ou erro conforme o resultado da operação.
 * Após a exclusão bem-sucedida, invalida as queries relacionadas aos posts
 * para garantir que os dados exibidos estejam atualizados.
 *
 * @returns Um objeto de mutação do React Query para exclusão de posts.
 */
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      alert("Post excluído com sucesso!");
      // Invalidar queries relacionadas para refletir as mudanças
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Erro ao excluir o post:", error);
      alert("Erro ao excluir o post. Tente novamente mais tarde.");
    },
  });
}

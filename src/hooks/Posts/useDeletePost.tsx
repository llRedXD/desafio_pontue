import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";

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

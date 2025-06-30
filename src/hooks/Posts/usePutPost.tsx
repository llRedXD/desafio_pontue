import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";
import type { PostCreateOrUpdate, PostData } from "./types";

interface UpdatePostParams {
  id: number;
  data: PostCreateOrUpdate;
}

async function updatePost({ id, data }: UpdatePostParams): Promise<PostData> {
  const response = await projectApi.put(`/posts/${id}`, data, true);

  if (response.status === 403) {
    alert("Você não tem permissão para editar este post.");
    throw new Error("Permissão negada");
  }

  return response.json();
}

export function usePutPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      // Invalidar queries relacionadas para refletir as mudanças
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", updatedPost.id] });

      // Opcional: atualizar cache específico se necessário
      queryClient.setQueryData(["post", updatedPost.id], updatedPost);
    },
  });
}

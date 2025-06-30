import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";
import type { PostCreateOrUpdate, PostReponse } from "./types";

async function createPost(data: PostCreateOrUpdate): Promise<PostReponse> {
  const response = await projectApi.post("/posts", data, true);

  if (response.status === 403) {
    alert("Você não tem permissão para criar posts.");
    throw new Error("Permissão negada");
  }
  return response.json();
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      console.log("Post criado com sucesso:", newPost);

      // Invalidar queries relacionadas para refletir as mudanças
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", newPost.post.id] });

      // Opcional: atualizar cache específico se necessário
      queryClient.setQueryData(["post", newPost.post.id], newPost);

      window.location.href = `/posts/${newPost.post.id}`;
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";
import type { PostCreateOrUpdate, PostReponse } from "./types";

/**
 * Cria um novo post utilizando os dados fornecidos.
 *
 * @param data - Os dados necessários para criar ou atualizar um post.
 * @returns Uma Promise que resolve para a resposta do post criado.
 * @throws Lança um erro caso o usuário não tenha permissão para criar posts (status 403).
 */
async function createPost(data: PostCreateOrUpdate): Promise<PostReponse> {
  const response = await projectApi.post("/posts", data, true);

  if (response.status === 403) {
    alert("Você não tem permissão para criar posts.");
    throw new Error("Permissão negada");
  }
  return response.json();
}

/**
 * Hook personalizado para criar um novo post utilizando React Query.
 *
 * Este hook utiliza a função `createPost` como mutação e, ao ser bem-sucedida,
 * realiza as seguintes ações:
 * - Exibe no console uma mensagem de sucesso com o novo post criado.
 * - Invalida queries relacionadas à lista de posts e ao post recém-criado para garantir que os dados estejam atualizados.
 * - Atualiza manualmente o cache do post recém-criado.
 * - Redireciona o usuário para a página do post criado.
 *
 * @returns Um objeto de mutação do React Query para criar posts.
 */
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

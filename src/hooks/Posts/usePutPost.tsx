import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";
import type { PostCreateOrUpdate, PostReponse } from "./types";

interface UpdatePostParams {
  id: number;
  data: PostCreateOrUpdate;
}

/**
 * Atualiza um post existente com os dados fornecidos.
 *
 * @param {Object} params - Parâmetros para a atualização do post.
 * @param {string} params.id - O ID do post a ser atualizado.
 * @param {Object} params.data - Os dados atualizados do post.
 * @returns {Promise<PostReponse>} Uma promessa que resolve com a resposta do post atualizado.
 * @throws {Error} Lança um erro se o status da resposta for 403, indicando que o usuário não tem permissão para editar o post.
 *
 * @example
 * try {
 *   const updatedPost = await updatePost({ id: "123", data: { title: "Novo título" } });
 *   console.log(updatedPost);
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
async function updatePost({
  id,
  data,
}: UpdatePostParams): Promise<PostReponse> {
  const response = await projectApi.put(`/posts/${id}`, data, true);

  if (response.status === 403) {
    alert("Você não tem permissão para editar este post.");
    throw new Error("Permissão negada");
  }

  return response.json();
}

/**
 * Hook personalizado para realizar a mutação de atualização de um post.
 *
 * Este hook utiliza o `useMutation` do React Query para enviar uma solicitação
 * de atualização de um post e gerenciar o estado da mutação. Após uma mutação
 * bem-sucedida, ele invalida as queries relacionadas para garantir que os dados
 * exibidos estejam atualizados e, opcionalmente, atualiza o cache específico.
 *
 * @returns {UseMutationResult} Retorna o objeto de mutação do React Query.
 *
 * @example
 * ```tsx
 * const { mutate: updatePost } = usePutPost();
 *
 * const handleUpdate = () => {
 *   updatePost({ id: 1, title: "Novo título" });
 * };
 * ```
 */
export function usePutPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      // Invalidar queries relacionadas para refletir as mudanças
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({
        queryKey: ["post", updatedPost.post.id],
      });

      // Opcional: atualizar cache específico se necessário
      queryClient.setQueryData(["post", updatedPost.post.id], updatedPost);
    },
  });
}

import { useQuery } from "@tanstack/react-query";
import type { PostReponse } from "./types";
import { projectApi } from "../../api/projectApi";

/**
 * Busca os detalhes de um post específico pelo ID.
 *
 * @param id - O identificador único do post a ser buscado.
 * @returns Uma Promise que resolve para os dados do post no formato `PostReponse`.
 * @throws Lança um erro caso o post não seja encontrado (status 404),
 *         contendo a mensagem de erro retornada pela API ou uma mensagem padrão.
 */
async function getPost(id: number): Promise<PostReponse> {
  const response = await projectApi.get(`/posts/${id}`, true);

  if (response.status === 404) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Post não encontrado");
  }
  return response.json();
}

/**
 * Hook para buscar um post específico pelo seu ID.
 *
 * Utiliza o React Query para gerenciar o estado da requisição.
 *
 * @param id - O identificador único do post a ser buscado.
 * @returns Retorna o objeto de resultado do React Query contendo dados, status e métodos auxiliares.
 *
 * @example
 * const { data, isLoading, error } = useGetPost(1);
 *
 * @remarks
 * - A requisição só será executada se o `id` for válido (truthy).
 * - Os dados permanecem frescos por 5 minutos (`staleTime`).
 */
export function useGetPost(id: number) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!id, // Só executa se o id for válido
  });
}

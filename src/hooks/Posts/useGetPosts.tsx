import { useQuery } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";
import type { PostsResponse } from "./types";

/**
 * Recupera uma lista de posts da API.
 *
 * @param {number} [page=1] - O número da página a ser recuperada.
 * @param {number} [per_page=15] - A quantidade de posts por página.
 * @param {number} [only_me=0] - Define se apenas os posts do usuário atual devem ser retornados (1 para sim, 0 para não).
 * @returns {Promise<PostsResponse>} - Uma promessa que resolve com a resposta contendo os posts.
 */
async function getPosts(
  page: number = 1,
  per_page: number = 15,
  only_me: number = 0
): Promise<PostsResponse> {
  const response = await projectApi.get(
    `/posts?page=${page}&per_page=${per_page}&only_me=${only_me}`,
    only_me > 0
  );

  return response.json();
}

/**
 * Hook personalizado para buscar posts utilizando o React Query.
 *
 * @param {number} [page=1] - Número da página a ser buscada. O valor padrão é 1.
 * @param {number} [per_page=15] - Quantidade de posts por página. O valor padrão é 15.
 * @param {number} [only_me=0] - Filtro opcional para buscar apenas posts do usuário atual.
 *                               Use 1 para ativar o filtro e 0 para desativar. O valor padrão é 0.
 * @returns {UseQueryResult} - Retorna o resultado da consulta gerenciado pelo React Query.
 *
 * @remarks
 * - O cache dos dados é mantido por 5 minutos (`staleTime: 1000 * 60 * 5`).
 * - A consulta não será refeita automaticamente ao focar na janela do navegador (`refetchOnWindowFocus: false`).
 * - Não há tentativas automáticas de nova consulta em caso de falha (`retry: false`).
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useGetPosts(2, 10, 1);
 * if (isLoading) return <p>Carregando...</p>;
 * if (error) return <p>Erro ao carregar os posts.</p>;
 * return <ul>{data.map(post => <li key={post.id}>{post.title}</li>)}</ul>;
 * ```
 */
export function useGetPosts(
  page: number = 1,
  per_page: number = 15,
  only_me: number = 0
) {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPosts(page, per_page, only_me),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });
}

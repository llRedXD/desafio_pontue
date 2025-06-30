import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";
import type { User } from "./type";

/**
 * Obtém as informações do usuário autenticado a partir da API.
 *
 * @returns {Promise<User>} Uma Promise que resolve com os dados do usuário.
 *
 * @throws {Error} Lança um erro caso a requisição para a API falhe.
 */
async function getUser(): Promise<User> {
  const response = await projectApi.get("/auth/me", true);

  return response.json();
}

/**
 * Hook personalizado para buscar os dados do usuário utilizando o React Query.
 *
 * @returns {UseQueryResult} Retorna o resultado da consulta, incluindo os dados do usuário,
 * o estado de carregamento, erros e outras informações relacionadas à consulta.
 *
 * @remarks
 * - A consulta utiliza a chave `["user"]` para identificar os dados do usuário no cache.
 * - A função `getUser` é usada como função de busca para obter os dados do usuário.
 * - O tempo de validade (`staleTime`) é configurado para 5 minutos (1000ms * 60 * 5).
 *
 * @example
 * ```tsx
 * const { data: user, isLoading, error } = useGetUser();
 *
 * if (isLoading) {
 *   return <p>Carregando...</p>;
 * }
 *
 * if (error) {
 *   return <p>Erro ao carregar os dados do usuário.</p>;
 * }
 *
 * return <p>Bem-vindo, {user.name}!</p>;
 * ```
 */
export function useGetUser(): UseQueryResult {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

import { useQuery } from "@tanstack/react-query";
import type { PostReponse } from "./types";
import { projectApi } from "../../api/projectApi";

async function getPost(id: number): Promise<PostReponse> {
  const response = await projectApi.get(`/posts/${id}`, true);

  return response.json();
}

export function useGetPost(id: number) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!id, // Só executa se o id for válido
  });
}

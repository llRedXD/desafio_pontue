import { useQuery } from "@tanstack/react-query";
import type { PostData } from "./useGetPosts";

interface PostReponse {
  post: PostData;
}

async function getPost(id: number): Promise<PostReponse> {
  const responseData = {
    post: {
      id: 1,
      title: "Postagem 1",
      description: null,
      content: "Conteúdo\nda\nPostagem",
      user: {
        id: 2,
        name: "Nome Completo",
        email: "user@example.com",
        created_at: "2025-05-29T20:43:51-03:00",
        updated_at: "2025-05-29T20:43:51-03:00",
      },
      created_at: "2025-05-29T20:46:49-03:00",
      updated_at: "2025-05-29T20:47:20-03:00",
    },
  };
  return responseData;
}

export function useGetPost(id: number) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!id, // Só executa se o id for válido
  });
}

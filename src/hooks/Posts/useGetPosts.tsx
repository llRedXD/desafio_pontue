import { useQuery } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";
import type { PostsResponse } from "./types";

async function getPosts(
  page: number = 1,
  per_page: number = 15,
  only_me: number = 0
): Promise<PostsResponse> {
  const response = await projectApi.get(
    `/posts?page=${page}&per_page=${per_page}&only_me=${only_me}`
  );

  return response.json();
}

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

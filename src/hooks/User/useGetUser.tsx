import { useQuery } from "@tanstack/react-query";
import { projectApi } from "../../api/projectApi";

async function getUser(): Promise<void> {
  const response = await projectApi.get("/auth/me", true);

  return response.json();
}

export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

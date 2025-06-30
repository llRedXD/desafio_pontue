import { useQuery } from "@tanstack/react-query";

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface PostData {
  id: number;
  title: string;
  description: string | null;
  content?: string;
  user?: User;
  created_at?: string;
  updated_at?: string;
}

interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

interface MetaLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface PostsResponse {
  data: PostData[];
  links: Links;
  meta: Meta;
}

async function getPosts(page: number = 1): Promise<PostsResponse> {
  // Gerar 50 posts fictícios
  const users: User[] = [
    {
      id: 1,
      name: "Usuário 1",
      email: "user1@example.com",
      created_at: "2025-05-29T20:43:51-03:00",
      updated_at: "2025-05-29T20:43:51-03:00",
    },
    {
      id: 2,
      name: "Usuário 2",
      email: "user2@example.com",
      created_at: "2025-06-27T17:02:38-03:00",
      updated_at: "2025-06-27T17:02:38-03:00",
    },
    {
      id: 3,
      name: "Usuário 3",
      email: "user3@example.com",
      created_at: "2025-06-27T15:29:07-03:00",
      updated_at: "2025-06-27T15:29:07-03:00",
    },
  ];

  const allPosts: PostData[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Título do Post #${i + 1}`,
    description: `Descrição do post número ${i + 1}`,
    content: `Conteúdo do post número ${
      i + 1
    }\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    user: users[i % users.length],
    created_at: `2025-06-${String((i % 30) + 1).padStart(
      2,
      "0"
    )}T12:00:00-03:00`,
    updated_at: `2025-06-${String((i % 30) + 1).padStart(
      2,
      "0"
    )}T12:00:00-03:00`,
  }));

  const perPage = 15;
  const lastPage = Math.ceil(allPosts.length / perPage);
  const currentPage = Math.max(1, Math.min(page, lastPage));
  const from = (currentPage - 1) * perPage;
  const to = Math.min(from + perPage, allPosts.length);

  const paginatedPosts = allPosts.slice(from, to);

  const makePageUrl = (p: number | null) =>
    p && p >= 1 && p <= lastPage
      ? `https://desafio.pontue.com.br/posts?page=${p}`
      : null;

  const responseData: PostsResponse = {
    data: paginatedPosts,
    links: {
      first: makePageUrl(1)!,
      last: makePageUrl(lastPage)!,
      prev: makePageUrl(currentPage > 1 ? currentPage - 1 : null),
      next: makePageUrl(currentPage < lastPage ? currentPage + 1 : null),
    },
    meta: {
      current_page: currentPage,
      from: from + 1,
      last_page: lastPage,
      links: [
        {
          url: makePageUrl(currentPage > 1 ? currentPage - 1 : null),
          label: "&laquo; Anterior",
          active: false,
        },
        ...Array.from({ length: lastPage }, (_, i) => ({
          url: makePageUrl(i + 1),
          label: `${i + 1}`,
          active: currentPage === i + 1,
        })),
        {
          url: makePageUrl(currentPage < lastPage ? currentPage + 1 : null),
          label: "Próxima &raquo;",
          active: false,
        },
      ],
      path: "https://desafio.pontue.com.br/posts",
      per_page: perPage,
      to: to,
      total: allPosts.length,
    },
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(responseData);
    }, 1000); // Simulating network delay
  });
}

export function useGetPosts(page: number = 1) {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPosts(page),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: false,
  });
}

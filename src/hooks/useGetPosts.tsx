import { useQuery } from "@tanstack/react-query";

interface User {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getPosts(page: number = 1): Promise<PostsResponse> {
  const responseData = {
    data: [
      {
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
      {
        id: 38,
        title: "Lorem Ipsum",
        description: "What is Lorem Ipsum?",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        user: {
          id: 9,
          name: "Admin",
          email: "admin@pontue.com.br",
          created_at: "2025-06-27T17:02:38-03:00",
          updated_at: "2025-06-27T17:02:38-03:00",
        },
        created_at: "2025-06-27T17:06:25-03:00",
        updated_at: "2025-06-27T17:06:25-03:00",
      },
      {
        id: 39,
        title: "Primeiro Post Criado (Update)",
        description:
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan nulla vitae lorem tempus consectetur. Aliquam sollicitudin in dui ac sagittis. Vestibulum luctus pharetra fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis malesuada libero mi, vel euismod orci vestibulum at. Fusce non ornare ante. Suspendisse pretium velit non leo dapibus bibendum. Donec nulla ante, dapibus sed ultrices vel, convallis a eros. Fusce auctor semper neque id euismod. Suspendisse sit amet mattis nulla, fringilla porta elit. Vivamus sodales ac est blandit dictum. Donec sed nisl bibendum, vulputate arcu eget, tempus lorem. Vivamus mattis varius velit, nec tincidunt diam elementum vulputate. Curabitur efficitur risus sit amet neque lacinia efficitur. Suspendisse aliquam ornare nisi eget condimentum.\n\nCras vitae turpis eu augue consectetur molestie sed ut dolor. Cras sed vestibulum nibh, et commodo justo. Donec sagittis pretium dapibus. Donec maximus ut enim quis imperdiet. Aenean sed tincidunt turpis. Aliquam lacinia neque fringilla turpis interdum aliquet a vitae orci. Aliquam erat volutpat. Nulla in accumsan turpis, eu egestas massa. Donec volutpat ac sem ut faucibus.\n\nSed efficitur at sapien vitae sagittis. Sed consectetur at massa quis lobortis. Mauris vulputate dui sed nisi facilisis, vitae placerat metus pharetra. Ut ut vestibulum risus. Curabitur non dolor id orci egestas consequat eget quis lorem. In aliquet purus lectus. Vivamus tortor sapien, pharetra at lobortis ut, egestas vitae augue. Praesent ante metus, dictum et ultrices at, venenatis quis metus. Pellentesque sed neque sed est vestibulum venenatis. Vivamus pharetra turpis vitae turpis ultricies tristique. Nulla porta ornare arcu ac iaculis. Nullam ornare turpis quis lobortis molestie. In auctor lobortis est quis molestie.",
        user: {
          id: 6,
          name: "Franciele",
          email: "franciele.98.costa@gmail.com",
          created_at: "2025-06-27T15:29:07-03:00",
          updated_at: "2025-06-27T15:29:07-03:00",
        },
        created_at: "2025-06-27T17:13:09-03:00",
        updated_at: "2025-06-27T17:14:17-03:00",
      },
      {
        id: 40,
        title: "Segundo Post Criado",
        description:
          "Phasellus augue felis, facilisis vitae commodo eget, faucibus vitae enim.",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque accumsan nulla vitae lorem tempus consectetur. Aliquam sollicitudin in dui ac sagittis. Vestibulum luctus pharetra fringilla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis malesuada libero mi, vel euismod orci vestibulum at. Fusce non ornare ante. Suspendisse pretium velit non leo dapibus bibendum. Donec nulla ante, dapibus sed ultrices vel, convallis a eros. Fusce auctor semper neque id euismod. Suspendisse sit amet mattis nulla, fringilla porta elit. Vivamus sodales ac est blandit dictum. Donec sed nisl bibendum, vulputate arcu eget, tempus lorem. Vivamus mattis varius velit, nec tincidunt diam elementum vulputate. Curabitur efficitur risus sit amet neque lacinia efficitur. Suspendisse aliquam ornare nisi eget condimentum.\n\nCras vitae turpis eu augue consectetur molestie sed ut dolor. Cras sed vestibulum nibh, et commodo justo. Donec sagittis pretium dapibus. Donec maximus ut enim quis imperdiet. Aenean sed tincidunt turpis. Aliquam lacinia neque fringilla turpis interdum aliquet a vitae orci. Aliquam erat volutpat. Nulla in accumsan turpis, eu egestas massa. Donec volutpat ac sem ut faucibus.\n\nSed efficitur at sapien vitae sagittis. Sed consectetur at massa quis lobortis. Mauris vulputate dui sed nisi facilisis, vitae placerat metus pharetra. Ut ut vestibulum risus. Curabitur non dolor id orci egestas consequat eget quis lorem. In aliquet purus lectus. Vivamus tortor sapien, pharetra at lobortis ut, egestas vitae augue. Praesent ante metus, dictum et ultrices at, venenatis quis metus. Pellentesque sed neque sed est vestibulum venenatis. Vivamus pharetra turpis vitae turpis ultricies tristique. Nulla porta ornare arcu ac iaculis. Nullam ornare turpis quis lobortis molestie. In auctor lobortis est quis molestie.",
        user: {
          id: 6,
          name: "Franciele",
          email: "franciele.98.costa@gmail.com",
          created_at: "2025-06-27T15:29:07-03:00",
          updated_at: "2025-06-27T15:29:07-03:00",
        },
        created_at: "2025-06-27T17:13:41-03:00",
        updated_at: "2025-06-27T17:13:41-03:00",
      },
      {
        id: 41,
        title: "Terceiro Post Criado Com Um Titulo Maior",
        description:
          "Etiam aliquet arcu odio, eu luctus justo rutrum sit amet.",
        content:
          "Cras vitae turpis eu augue consectetur molestie sed ut dolor. Cras sed vestibulum nibh, et commodo justo. Donec sagittis pretium dapibus. Donec maximus ut enim quis imperdiet. Aenean sed tincidunt turpis. Aliquam lacinia neque fringilla turpis interdum aliquet a vitae orci. Aliquam erat volutpat. Nulla in accumsan turpis, eu egestas massa. Donec volutpat ac sem ut faucibus.\n\nSed efficitur at sapien vitae sagittis. Sed consectetur at massa quis lobortis. Mauris vulputate dui sed nisi facilisis, vitae placerat metus pharetra. Ut ut vestibulum risus. Curabitur non dolor id orci egestas consequat eget quis lorem. In aliquet purus lectus. Vivamus tortor sapien, pharetra at lobortis ut, egestas vitae augue. Praesent ante metus, dictum et ultrices at, venenatis quis metus. Pellentesque sed neque sed est vestibulum venenatis. Vivamus pharetra turpis vitae turpis ultricies tristique. Nulla porta ornare arcu ac iaculis. Nullam ornare turpis quis lobortis molestie. In auctor lobortis est quis molestie.\n\nEtiam aliquet arcu odio, eu luctus justo rutrum sit amet. Integer vulputate mauris elit, non sagittis tellus consectetur a. Nulla sed congue nulla. Morbi semper commodo eros, sed dignissim odio elementum id. Proin ornare orci turpis, eget consequat dui ullamcorper eu. Nulla at orci ultrices, facilisis nunc sit amet, ultrices eros. Etiam at eleifend quam. Aenean velit metus, ornare commodo justo eget, ullamcorper placerat tortor. Fusce at lectus eget tortor vehicula varius id porttitor ipsum. Ut sed consequat lorem. Ut ante nunc, interdum id rhoncus eget, molestie sed massa. Vivamus in scelerisque eros. Nullam cursus sem magna, in lacinia justo varius vitae. Integer eu pretium enim. Aliquam interdum condimentum ligula. Curabitur mollis facilisis mi, sed volutpat arcu porta ut.",
        user: {
          id: 6,
          name: "Franciele",
          email: "franciele.98.costa@gmail.com",
          created_at: "2025-06-27T15:29:07-03:00",
          updated_at: "2025-06-27T15:29:07-03:00",
        },
        created_at: "2025-06-27T17:14:05-03:00",
        updated_at: "2025-06-27T17:14:05-03:00",
      },
    ],
    links: {
      first: "https://desafio.pontue.com.br/posts?page=1",
      last: "https://desafio.pontue.com.br/posts?page=1",
      prev: null,
      next: null,
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      links: [
        {
          url: null,
          label: "&laquo; Anterior",
          active: false,
        },
        {
          url: "https://desafio.pontue.com.br/posts?page=1",
          label: "1",
          active: true,
        },
        {
          url: null,
          label: "Próxima &raquo;",
          active: false,
        },
      ],
      path: "https://desafio.pontue.com.br/posts",
      per_page: 15,
      to: 5,
      total: 5,
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

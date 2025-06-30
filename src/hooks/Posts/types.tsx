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

export interface PostsResponse {
  data: PostData[];
  links: Links;
  meta: Meta;
}
export interface PostReponse {
  post: PostData;
}

export interface PostCreateOrUpdate {
  title: string;
  description?: string | null;
  content?: string;
  user_id?: number;
}

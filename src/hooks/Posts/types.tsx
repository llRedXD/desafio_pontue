import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const PostDataSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  content: z.string().optional(),
  user: UserSchema.optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const PostReponseSchema = z.object({
  post: PostDataSchema,
});

export const MetaSchema = z.object({
  current_page: z.number(),
  from: z.number(),
  last_page: z.number(),
  links: z.array(
    z.object({
      url: z.string().nullable(),
      label: z.string(),
      active: z.boolean(),
    })
  ),
  path: z.string(),
  per_page: z.number(),
  to: z.number(),
  total: z.number(),
});

export const PostsResponseSchema = z.object({
  data: z.array(PostDataSchema),
  links: z.object({
    first: z.string(),
    last: z.string(),
    prev: z.string().nullable(),
    next: z.string().nullable(),
  }),
  meta: MetaSchema,
});

export const PostCreateOrUpdateSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().nullable().optional(),
  content: z.string().optional(),
});

// Inferir tipos do Zod
export type User = z.infer<typeof UserSchema>;
export type PostData = z.infer<typeof PostDataSchema>;
export type PostsResponse = z.infer<typeof PostsResponseSchema>;
export type PostCreateOrUpdate = z.infer<typeof PostCreateOrUpdateSchema>;
export type PostReponse = z.infer<typeof PostReponseSchema>;
export type Meta = z.infer<typeof MetaSchema>;

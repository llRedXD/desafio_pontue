import { z } from "zod";

export const TokenSchema = z.object({
  access_token: z.string(),
  type: z.string(),
  expires_at: z.string(),
});

export type Token = z.infer<typeof TokenSchema>;

export const AuthenticatedUserSchema = z.object({
  user: z.any(), // Substitua por o schema correto de User se disponível
  token: TokenSchema,
});

export type AuthenticatedUser = z.infer<typeof AuthenticatedUserSchema>;

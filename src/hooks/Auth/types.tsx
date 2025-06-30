import type { User } from "../Posts/types";

interface Token {
  access_token: string;
  type: string;
  expires_at: string;
}
export interface AuthenticatedUser {
  user: User;
  token: Token;
}

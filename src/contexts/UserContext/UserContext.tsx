import { createContext } from "react";
import type { User } from "../../hooks/Posts/useGetPosts";

export interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  checkAuthStatus: () => boolean;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

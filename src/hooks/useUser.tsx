import { useContext } from "react";
import { UserContext } from "../contexts/UserContext/UserContext";

// Hook customizado para usar o contexto
export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser deve ser usado dentro de um UserProvider");
  }

  return context;
}

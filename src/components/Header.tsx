import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { ModalAuth } from "./Auth/ModalAuth";

export function Header() {
  const [showModal, setShowModal] = useState(false);
  const [modeAuth, setModeAuth] = useState<"login" | "register">("login");
  const { user, logout, isAuthenticated } = useUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="bg-gray-800 text-white flex items-center justify-between px-4 py-3 fixed top-0 left-0 w-full z-50 shadow">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Blog</h1>
        </div>
        <nav className="flex flex-col md:flex-row items-center gap-2">
          {isAuthenticated ? (
            // Usuário autenticado
            <>
              <span className="text-sm text-gray-300">
                Olá, {user?.name || user?.email}
              </span>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition-colors"
                onClick={handleLogout}
              >
                Sair
              </button>
            </>
          ) : (
            // Usuário não autenticado
            <>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded mb-2 md:mr-2 md:mb-0 transition-colors"
                onClick={() => {
                  setShowModal(true);
                  setModeAuth("login");
                }}
              >
                Entrar
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded transition-colors"
                onClick={() => {
                  setShowModal(true);
                  setModeAuth("register");
                }}
              >
                Cadastrar
              </button>
            </>
          )}
        </nav>
      </header>
      <div className="h-20" /> {/* Espaço para compensar o header fixo */}
      <ModalAuth
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        mode={modeAuth}
        changeMode={(mode) => setModeAuth(mode)}
      />
    </>
  );
}

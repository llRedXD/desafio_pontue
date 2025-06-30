import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { ModalAuth } from "./Auth/ModalAuth";
import { useLogout } from "../hooks/Auth/useLogout";

export function Header() {
  const [showModal, setShowModal] = useState(false);
  const [modeAuth, setModeAuth] = useState<"login" | "register">("login");
  const [showUserInfo, setShowUserInfo] = useState(false);
  const { user, isAuthenticated } = useUser();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutateAsync();
  };

  return (
    <>
      <header className="bg-gray-800 text-white flex items-center justify-between px-4 py-3 fixed top-0 left-0 w-full z-50 shadow">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">
            <a href="/">Posts</a>
          </h1>
        </div>
        <nav className="flex flex-col md:flex-row items-center gap-2">
          {isAuthenticated ? (
            // Usuário autenticado
            <>
              <div className="relative">
                <button
                  className="text-sm text-gray-300 focus:outline-none flex items-center gap-1 hover:text-white transition-colors"
                  onClick={() => setShowUserInfo((prev) => !prev)}
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={showUserInfo}
                  title="Ver informações do usuário"
                >
                  Olá, {user?.name || user?.email}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      showUserInfo ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {showUserInfo && (
                  <div className="absolute right-0 mt-4 w-72 bg-white text-gray-800 rounded-lg shadow-2xl z-50 p-6 space-y-4">
                    <div className="mb-4">
                      <div className="font-semibold text-lg">
                        {user?.name || "Usuário"}
                      </div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                    <button
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors mb-3"
                      onClick={() => {
                        window.location.href = `/user`;
                        setShowUserInfo(false);
                      }}
                    >
                      Meus Dados e Posts
                    </button>
                    <button
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-lg transition-colors"
                      onClick={() => setShowUserInfo(false)}
                    >
                      Fechar
                    </button>
                  </div>
                )}
              </div>
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

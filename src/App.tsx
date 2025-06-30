import { useState } from "react";
import Router from "./routes/Router";
import { Login } from "./components/Auth/Login";
import { useUser } from "./hooks/useUser";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { user, isLoading, logout } = useUser();
  const isAuthenticated = true;

  // Mostra loading enquanto verifica a autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      <header className="bg-gray-800 text-white flex items-center justify-between px-4 py-3">
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
                onClick={() => setShowLogin(true)}
              >
                Entrar
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded transition-colors">
                Cadastrar
              </button>
            </>
          )}
        </nav>
      </header>

      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <Router />

      <footer className="bg-gray-800 text-white text-center p-4 fixed bottom-0 w-full">
        <p>
          &copy; {new Date().getFullYear()} Blog. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}

export default App;

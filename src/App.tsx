import { useState } from "react";
import Router from "./routes/Router";
import { Login } from "./components/Auth/Login";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      <header className="bg-gray-800 text-white flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Blog</h1>
        </div>
        <nav className="flex flex-col md:flex-row">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded mb-2 md:mr-2 md:mb-0"
            onClick={() => setShowLogin(true)}
          >
            Entrar
          </button>
          <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded">
            Cadastrar
          </button>
        </nav>
      </header>
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

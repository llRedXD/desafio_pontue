import Router from "./routes/Router";
import { useUser } from "./hooks/useUser";
import { Header } from "./components/Header";

function App() {
  const { isLoading } = useUser();

  // Mostra loading enquanto verifica a autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  flex flex-col">
      <Header />

      <Router />
    </div>
  );
}

export default App;

import React from "react";
import Post from "../components/Post/Post";
import { useGetPosts } from "../hooks/useGetPosts";

const Home: React.FC = () => {
  const posts = useGetPosts();

  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      <header className="bg-gray-800 text-white flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Blog</h1>
        </div>
        <nav className="flex flex-col md:flex-row">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded mb-2 md:mr-2 md:mb-0">
            Entrar
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded">
            Cadastrar
          </button>
        </nav>
      </header>

      <main className="p-4">
        {posts.isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <p>Carregando posts...</p>
          </div>
        ) : posts.isError ? (
          <div className="flex justify-center items-center h-screen">
            <p>Erro ao carregar posts.</p>
          </div>
        ) : (
          posts.data?.data.map((post) => (
            <Post
              id={post.id}
              title={post.title}
              description={post.description}
            />
          ))
        )}
      </main>

      <footer className="bg-gray-800 text-white text-center p-4 fixed bottom-0 w-full">
        <p>
          &copy; {new Date().getFullYear()} Blog. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Home;

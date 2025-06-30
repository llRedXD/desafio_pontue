import { useState } from "react";
import { useGetPosts } from "../hooks/Posts/useGetPosts";
import { useUser } from "../hooks/useUser";
import Post from "../components/Post/Post";

export function User() {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const posts = useGetPosts(currentPage, 5, 1);

  return (
    <>
      <main className="p-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full mb-4">
          <h1 className="text-2xl font-bold mb-4">Meus Dados</h1>
          {user ? (
            <div>
              <p className="mb-2">
                <strong>Nome:</strong> {user.name}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="mb-2">
                <strong>Usando desde:</strong>{" "}
                {new Date(user.created_at).toLocaleDateString("pt-BR")}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Nenhum dado disponível.</p>
          )}
        </div>
        {posts.isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <p>Carregando posts...</p>
          </div>
        ) : posts.isError ? (
          <div className="flex justify-center items-center h-screen">
            <p>Erro ao carregar posts.</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Meus Posts</h1>
            <div className="max-h-[70vh] px-4 overflow-auto">
              {posts.data?.data.length === 0 ? (
                <p className="text-gray-500">Nenhum post encontrado.</p>
              ) : (
                posts.data?.data.map((post) => (
                  <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    description={post.description}
                  />
                ))
              )}
            </div>

            {/* Paginação */}
            {posts.data?.meta && posts.data.meta.last_page > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                {/* Botão Anterior */}
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Anterior
                </button>

                {/* Números das páginas */}
                {Array.from(
                  { length: posts.data.meta.last_page },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Botão Próximo */}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === posts.data.meta.last_page}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    currentPage === posts.data.meta.last_page
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Próximo
                </button>
              </div>
            )}

            {/* Informações da paginação */}
            {posts.data?.meta && posts.data.meta.total > 0 && (
              <div className="flex justify-center items-center mt-4 text-sm text-gray-600">
                <p>
                  Mostrando {posts.data.meta.from} a {posts.data.meta.to} de{" "}
                  {posts.data.meta.total} posts
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}

import React, { useState, type JSX } from "react";
import Post from "../components/Post/Post";
import { useGetPosts } from "../hooks/Posts/useGetPosts";
import { CreatePost } from "../components/Post/CreatePost";
import Pagination from "../components/Post/Pagination";
import { useUser } from "../hooks/useUser";

/**
 * Componente principal da página Home.
 *
 * Exibe uma lista de posts paginados, permitindo ao usuário autenticado criar novos posts através de um modal.
 *
 * - Mostra um botão "Criar Post" apenas para usuários autenticados.
 * - Exibe mensagens de carregamento ou erro conforme o estado da requisição dos posts.
 * - Renderiza a lista de posts e a paginação baseada nos dados retornados.
 *
 * @component
 * @returns {JSX.Element} A página Home com a lista de posts e funcionalidades de criação e paginação.
 */
const Home: React.FC = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const { isAuthenticated } = useUser();

  const posts = useGetPosts(currentPage);
  return (
    <>
      <main className="p-4">
        {isAuthenticated && (
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Lista de Posts</h1>
            {isAuthenticated && (
              <>
                <button
                  onClick={() => setShowCreatePostModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
                >
                  Criar Post
                </button>
                <CreatePost
                  isOpen={showCreatePostModal}
                  onClose={() => setShowCreatePostModal(false)}
                />
              </>
            )}
          </div>
        )}
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
            <div className="max-h-[70vh] px-4 overflow-auto">
              {posts.data?.data.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  description={post.description}
                />
              ))}
            </div>

            {posts.data?.meta && (
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                meta={posts.data.meta}
              />
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Home;

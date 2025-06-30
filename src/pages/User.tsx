import { useState } from "react";
import { useGetPosts } from "../hooks/Posts/useGetPosts";
import { useUser } from "../hooks/useUser";
import Post from "../components/Post/Post";
import Pagination from "../components/Post/Pagination";
import { CreatePost } from "../components/Post/CreatePost";

export function User() {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const posts = useGetPosts(currentPage, 5, 1);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

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
                <strong>Usuario desde:</strong>{" "}
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
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Meus Posts</h1>
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
            </div>
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
}

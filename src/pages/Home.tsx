import React, { useState } from "react";
import Post from "../components/Post/Post";
import { useGetPosts } from "../hooks/Posts/useGetPosts";
import { CreatePost } from "../components/Post/CreatePost";
import Pagination from "../components/Post/Pagination";

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const posts = useGetPosts(currentPage);
  return (
    <>
      <main className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Lista de Posts</h1>
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

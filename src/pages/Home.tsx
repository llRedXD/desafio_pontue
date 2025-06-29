import React from "react";
import Post from "../components/Post/Post";
import { useGetPosts } from "../hooks/useGetPosts";

const Home: React.FC = () => {
  const posts = useGetPosts();

  return (
    <>
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
    </>
  );
};

export default Home;

import { ProtectedRoute } from "../components/ProtectedRoute";
import { useGetPost } from "../hooks/Posts/useGetPost";

export function Post({ id }: { id: number }) {
  const post = useGetPost(id);

  return (
    <ProtectedRoute>
      <div className="p-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded mb-2 md:mr-2 md:mb-0"
          onClick={() => (window.location.href = "/")}
        >
          Voltar para a lista de posts
        </button>

        {post.isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <p>Carregando post...</p>
          </div>
        ) : post.isError ? (
          <div className="flex justify-center items-center h-screen">
            <p>Erro ao carregar o post.</p>
          </div>
        ) : (
          <article className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h1 className="text-2xl font-bold mb-4">{post.data?.post.title}</h1>
            <p className="text-gray-700 mb-4">{post.data?.post.description}</p>
            <p>{post.data?.post.user?.name}</p>
            <p>{post.data?.post.created_at}</p>
            <div className="prose">
              {post.data?.post.content?.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </article>
        )}
      </div>
    </ProtectedRoute>
  );
}

import { useState } from "react";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useGetPost } from "../hooks/Posts/useGetPost";
import { usePutPost } from "../hooks/Posts/usePutPost";
import { useForm } from "react-hook-form";
import {
  PostCreateOrUpdateSchema,
  type PostCreateOrUpdate,
} from "../hooks/Posts/types";
import { zodResolver } from "@hookform/resolvers/zod";
const { useDeletePost } = await import("../hooks/Posts/useDeletePost");

export function PostPage({ id }: { id: number }) {
  const post = useGetPost(id);
  const updatePost = usePutPost();
  const deletePost = useDeletePost();
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit } = useForm<PostCreateOrUpdate>({
    resolver: zodResolver(PostCreateOrUpdateSchema),
  });

  const handleSave = async (data: PostCreateOrUpdate) => {
    await updatePost.mutateAsync({
      id,
      data,
    });
    setEditMode(false);
    // Opcional: refetch post
    post.refetch?.();
  };

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
          <form
            className="bg-white shadow-md rounded-lg p-6 mb-4"
            onSubmit={handleSubmit(handleSave)}
          >
            <div className="flex flex-col col-span-1">
              <div className="mb-4">
                <label
                  className="text-xs font-semibold text-gray-500 mb-1"
                  htmlFor="title"
                >
                  Título
                </label>
                <input
                  id="title"
                  className="text-2xl font-bold mb-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                  type="text"
                  value={post.data?.post.title || ""}
                  {...register("title")}
                  disabled={!editMode}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-600">
                    Criado por:{" "}
                    <span className="font-semibold">
                      {post.data?.post.user?.name}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Em:{" "}
                    <span>
                      {post.data?.post.created_at
                        ? new Date(
                            post.data.post.created_at
                          ).toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </p>
                </div>
              </div>
              <label
                className="text-xs font-semibold text-gray-500 mb-1"
                htmlFor="description"
              >
                Descrição
              </label>
              <textarea
                id="description"
                className="text-gray-700 mb-4 border rounded p-2 resize-none focus:outline-none focus:border-blue-500"
                {...register("description")}
                value={post.data?.post.description || ""}
                rows={2}
                disabled={!editMode}
              />
              <label
                className="text-xs font-semibold text-gray-500 mb-1"
                htmlFor="content"
              >
                Conteúdo
              </label>
              <textarea
                id="content"
                value={post.data?.post.content || ""}
                className="prose border rounded p-2 resize-y focus:outline-none focus:border-blue-500"
                {...register("content")}
                rows={8}
                disabled={!editMode}
              />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              {!editMode ? (
                <button
                  type="button"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setEditMode(true);
                  }}
                >
                  Editar
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    disabled={updatePost.isPending}
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                      setEditMode(false);
                    }}
                  >
                    Cancelar
                  </button>
                </>
              )}
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={async () => {
                  if (
                    window.confirm("Tem certeza que deseja deletar este post?")
                  ) {
                    await deletePost.mutateAsync(id);
                    window.location.href = "/";
                  }
                }}
                disabled={editMode}
              >
                Deletar
              </button>
            </div>
          </form>
        )}
      </div>
    </ProtectedRoute>
  );
}

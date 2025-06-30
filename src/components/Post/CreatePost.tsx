import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  PostCreateOrUpdateSchema,
  type PostCreateOrUpdate,
} from "../../hooks/Posts/types";
import { useCreatePost } from "../../hooks/Posts/useCreatePost";

interface CreatePostProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePost({ isOpen, onClose }: CreatePostProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostCreateOrUpdate>({
    resolver: zodResolver(PostCreateOrUpdateSchema),
  });
  const createPost = useCreatePost();

  if (!isOpen) return null;

  const handleCreate = async (data: PostCreateOrUpdate) => {
    await createPost.mutateAsync(data, {
      onSuccess: () => {
        onClose(); // Fecha o modal após criação bem-sucedida
      },
    });
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div
        className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center text-black"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-600 hover:text-white bg-gray-200 hover:bg-red-500 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Fechar"
              >
                X
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4">Novo Post</h2>
            <form onSubmit={handleSubmit(handleCreate)}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="title">
                  Título
                </label>
                <input
                  id="title"
                  type="text"
                  className={`w-full border border-gray-300 rounded px-3 py-2 ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("title")}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="description"
                >
                  Descrição
                </label>
                <input
                  id="description"
                  type="text"
                  className={`w-full border border-gray-300 rounded px-3 py-2 ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("description")}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="content">
                  Conteúdo
                </label>
                <textarea
                  id="content"
                  className={`w-full border border-gray-300 rounded px-3 py-2 ${
                    errors.content ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("content")}
                  rows={5}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

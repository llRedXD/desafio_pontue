import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "../../hooks/useLogin";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Login({ isOpen, onClose }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const login = useLogin();

  if (!isOpen) return null;
  const onSubmit = (data: LoginFormData) => {
    login.mutate(data, {
      onSuccess: () => {
        onClose(); // Fecha o modal após login bem-sucedido
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
        aria-labelledby="dialog-title"
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
                ×
              </button>
            </div>
            <h3
              className="text-base font-semibold text-gray-900 mb-4"
              id="dialog-title"
            >
              Login
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`mt-1 block w-full border p-2 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Senha:
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className={`mt-1 block w-full border p-2 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              {login.isError && (
                <span className="text-red-500 text-sm">
                  {login.error.message}
                </span>
              )}

              <button
                type="submit"
                disabled={login.isPending}
                className={`bg-blue-500 text-white px-3 py-2 rounded-md ${
                  login.isPending ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {login.isPending ? "Entrando..." : "Entrar"}
              </button>
              <a href="/register" className="text-blue-500 hover:underline">
                Não tem uma conta? Cadastre-se
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

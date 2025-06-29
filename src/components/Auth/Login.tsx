import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

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

  if (!isOpen) return null;

  const onSubmit = (data: LoginFormData) => {
    console.log("Dados do formulário:", data);
    // Aqui você pode adicionar a lógica para autenticação
  };

  return (
    <dialog
      open={isOpen}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 relative w-96">
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          X
        </button>
        <h1 className="text-2xl mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`border p-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className={`border p-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2">
            Entrar
          </button>
          <button
            type="button"
            className="bg-gray-300 text-black p-2 mt-2"
            onClick={() => {
              console.log("Redirecionar para a página de cadastro");
            }}
          >
            Criar conta
          </button>
        </form>
      </div>
    </dialog>
  );
}

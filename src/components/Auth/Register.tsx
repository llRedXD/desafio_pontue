import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegister } from "../../hooks/Auth/useRegister";

const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  password_confirmation: z
    .string()
    .min(6, "Confirmação de senha deve ter pelo menos 6 caracteres"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Register({ isOpen, onClose }: RegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useRegister();

  const onSubmit = async (data: RegisterFormData) => {
    await registerMutation.mutateAsync(data, {
      onSuccess: () => {
        onClose(); // Fecha o modal após registro bem-sucedido
      },
    });
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Registro</h3>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nome:
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className={`mt-1 block w-full border p-2 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
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
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password_confirmation"
          className="block text-sm font-medium text-gray-700"
        >
          Confirmação de Senha:
        </label>
        <input
          type="password"
          id="password_confirmation"
          {...register("password_confirmation")}
          className={`mt-1 block w-full border p-2 ${
            errors.password_confirmation ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.password_confirmation && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password_confirmation.message}
          </p>
        )}
      </div>
      {registerMutation.isError && (
        <p className="text-red-500 text-sm mt-1">
          {registerMutation.error.message}
        </p>
      )}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
      >
        Registrar
      </button>
    </form>
  );
}

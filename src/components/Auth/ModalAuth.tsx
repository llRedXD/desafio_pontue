import { Login } from "./Login";
import { Register } from "./Register";

interface ModalAuthProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "login" | "register";
  changeMode?: (mode: "login" | "register") => void;
}

export function ModalAuth({
  isOpen,
  onClose,
  mode,
  changeMode,
}: ModalAuthProps) {
  if (!isOpen) return null;

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
            {mode === "login" ? (
              <>
                <Login isOpen={isOpen} onClose={onClose} />
                <a
                  className="text-blue-500 hover:underline mt-4 block "
                  onClick={() => {
                    if (changeMode) {
                      changeMode("register");
                    }
                  }}
                >
                  Não tem uma conta? Cadastre-se
                </a>
              </>
            ) : mode === "register" ? (
              <>
                <Register isOpen={isOpen} onClose={onClose} />
                <a
                  className="text-blue-500 hover:underline mt-4 block"
                  onClick={() => {
                    if (changeMode) {
                      changeMode("login");
                    }
                  }}
                >
                  Já tem uma conta? Faça login
                </a>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

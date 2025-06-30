import React, { type JSX } from "react";
import { Link } from "react-router-dom";

/**
 * Componente de página "NotFound" para exibir uma mensagem de erro 404.
 *
 * Exibe um título, uma mensagem informando que a página não foi encontrada
 * e um link para retornar à página inicial.
 *
 * @component
 * @returns {JSX.Element} Elemento JSX representando a página de erro 404.
 */
const NotFound: React.FC = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Página não encontrada</p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Voltar para a Home
      </Link>
    </div>
  );
};

export default NotFound;

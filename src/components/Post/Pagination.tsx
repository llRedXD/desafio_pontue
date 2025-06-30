import React from "react";
import type { Meta } from "../../hooks/Posts/types";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  meta: Meta;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  meta,
}) => {
  if (!meta || meta.last_page <= 1) return null;

  return (
    <>
      {/* Paginação */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        {/* Botão Anterior */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Anterior
        </button>

        {/* Números das páginas */}
        {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Botão Próximo */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === meta.last_page}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            currentPage === meta.last_page
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Próximo
        </button>
      </div>

      {/* Informações da paginação */}
      <div className="flex justify-center items-center mt-4 text-sm text-gray-600">
        <p>
          Mostrando {meta.from} a {meta.to} de {meta.total} posts
        </p>
      </div>
    </>
  );
};

export default Pagination;

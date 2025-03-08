import React from 'react';
import '../css/Paginador.css'

// Este componente recibe tres props:
// - `currentPage`: la página actual
// - `totalNews`: el número total de noticias
// - `newsPerPage`: el número de noticias que se deben mostrar por página
// - `paginate`: función para cambiar la página

const Paginator = ({ currentPage, totalNews, newsPerPage, paginate }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalNews / newsPerPage);

  // Determinar el rango de páginas a mostrar
  const pageRange = 5;  // Número de páginas que quieres mostrar
  let startPage = Math.max(currentPage - Math.floor(pageRange / 2), 1);
  let endPage = Math.min(currentPage + Math.floor(pageRange / 2), totalPages);

  // Ajustar el rango de páginas si estamos cerca del principio o del final
  if (currentPage - Math.floor(pageRange / 2) < 1) {
    endPage = Math.min(pageRange, totalPages);
  }
  if (currentPage + Math.floor(pageRange / 2) > totalPages) {
    startPage = Math.max(totalPages - pageRange + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Funciones para navegar al inicio o al final
  const goToFirstPage = () => paginate(1);
  const goToLastPage = () => paginate(totalPages);

  return (
    <div className="pagination">
      <button onClick={goToFirstPage} className="paginator-btn">
        Inicio
      </button>

      {/* Mostrar los números de página */}
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
      ))}

      <button onClick={goToLastPage} className="paginator-btn">
        Fin
      </button>
    </div>
  );
};

export default Paginator;


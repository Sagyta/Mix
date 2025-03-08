import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { buscarNoticias } from '../redux/actions/actions';  // Suponiendo que tienes una acción que filtra las noticias
import 'font-awesome/css/font-awesome.min.css';

const Buscador = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(buscarNoticias(query));
  };

  return (
    <div className='buscador-container'>
      <input
        type="text"
        placeholder="Buscar por título"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='buscador-input'
      />
      <button onClick={handleSearch} className='buscador-button'>
      <i className="fa fa-search"></i>  {/* Ícono de lupa */}
      </button>
    </div>
  );
};

export default Buscador;
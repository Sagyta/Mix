import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/NavBar.css';
import tik from '../img/tik-naranja.png';
import face from '../img/face-naranja.png';
import insta from '../img/insta-naranja.png';

const Navbar = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      // Formatear la fecha como: Día, Mes Año (Ejemplo: 28 febrero 2025)
      const formattedDate = date.toLocaleDateString('es-ES', {
        weekday: 'long', // Día de la semana completo (Ejemplo: lunes)
        day: '2-digit',  // Día con dos dígitos
        month: 'long',   // Mes completo (Ejemplo: febrero)
        year: 'numeric', // Año con 4 dígitos
      });

      // Formatear la hora como: 14:30:45 (Ejemplo: 14:30:45)
      const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit'});

      // Concatenar fecha y hora
      setCurrentDateTime(`${formattedDate}, ${formattedTime}`);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000); // Actualiza cada segundo

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-top">
        {/* Hora en la esquina superior izquierda */}
        <div className="datetime">{currentDateTime}</div>
      </div>

      <div className="navbar-bottom">
        <div className="left">
          {/* Iconos de redes sociales en la parte inferior izquierda */}
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={face} alt="Facebook" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              <img src={tik} alt="tiktok" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={insta} alt="Instagram" />
            </a>
          </div>
        </div>

        <div className="right">
          {/* Botones de links en la parte inferior derecha */}
          <div className="nav-container-button">
            <button className="nav-button"><NavLink className='nav-button' to='/' >Inicio </NavLink></button>
            <button className="nav-button"><NavLink className='nav-button' to='/SeccionNews' >Noticias</NavLink></button>
            <button className="nav-button"><NavLink className='nav-button' to='' >Contacto</NavLink></button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategories } from '../redux/actions/actions';
import '../css/Footer.css'

const Footer = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category || []);

    useEffect(() => {
        dispatch(getCategories()); // Cargar categorías cuando el componente se monta
    }, [dispatch]);

   // Dividir las categorías en 3 columnas
   const columns = [
    categories.slice(0, Math.ceil(categories.length / 3)), // Primera columna
    categories.slice(Math.ceil(categories.length / 3), Math.ceil(categories.length * 2 / 3)), // Segunda columna
    categories.slice(Math.ceil(categories.length * 2 / 3)) // Tercera columna
];

return (
    <footer className="footer">
        <div className="footer-container">
            {/* Columna izquierda: Categorías */}
            <div className="footer-left">
                <div className="footer-links">
                    {/* Columna 1 */}
                    <div className="footer-column">
                        {columns[0].map((category) => (
                            <Link
                                key={category.id}
                                to={`/news/category/${category.id}`}
                                className="footer-link"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>

                    {/* Columna 2 */}
                    <div className="footer-column">
                        {columns[1].map((category) => (
                            <Link
                                key={category.id}
                                to={`/news/category/${category.id}`}
                                className="footer-link"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>

                    {/* Columna 3 */}
                    <div className="footer-column">
                        {columns[2].map((category) => (
                            <Link
                                key={category.id}
                                to={`/news/category/${category.id}`}
                                className="footer-link"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

              {/* Columna derecha: Contacto y redes sociales */}
              <div className="footer-right">
                  <p>info@miportal.com</p>
                  <p>+54 9 11 1234-5678</p>
                  <div className="footer-socials">
                      <a href="#" className="footer-social-link">Facebook</a>
                      <a href="#" className="footer-social-link">Twitter</a>
                      <a href="#" className="footer-social-link">Instagram</a>
                  </div>
              </div>
          </div>

          {/* Copyright */}
          <div className="footer-copy">
              <p>© 2025 Mi Portal de Noticias. Todos los derechos reservados.</p>
          </div>
      </footer>
  );
};

export default Footer;
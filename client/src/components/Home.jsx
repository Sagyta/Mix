import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
//import news from './News';
import NewsCarousel from './NewsCarousel'; // Suponiendo que tienes un componente de Carousel
import NavBar from './NavBar';
import Footer from './Footer'; // Suponiendo que tienes un componente de Footer
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../redux/actions/actions'; // Importa la acción para cargar las noticias
import '../css/Home.css'
import CategoryCarousel from './CategoryCarousel';
import AdsCarousel from './AdsCarousel';
import BannerCarousel from './BannerCarousel';

const Home = () => {
    const dispatch = useDispatch();
    const news = useSelector((state) => state.news);
   

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getNews()); // 🔹 Llamamos a la acción que ahora ya ordena las noticias desde el back
    }, [dispatch]);

//ultima noticia
    useEffect(() => {
        if (news && news.length > 0) {
            setLoading(false);
        }
    }, [news]);
    if (loading) {
        return <p>Cargando noticias...</p>;
    }
    if (!news || news.length === 0) {
        return <p>No hay noticias disponibles</p>;
    }
    const lastNews = news[0]; // 🔹 La última noticia ya es la primera del array
//fin ultima noticia

  return (
    <div className="home">
      {/* Espacio para anuncios entre noticias */}
      <div className="home-ad-space-between">
        <BannerCarousel />
      </div>
      <header className="home-header">
      <NavBar />
  </header>
    
      <NewsCarousel news={news} />

      <div className="content-home">
        <div className="home-left-column">
          {/* Última noticia */}
          <div className="home-latest-news">
            <h2 className='home-ribbon-single'>lo nuevo</h2>
             <div className="home-last-news-content">
                  <h3>{lastNews.title}</h3>
                  <div>
                    {lastNews.videoLink ? (
                      <iframe className='home-last-news-video'          
                      src={lastNews.videoLink.replace("watch?v=", "embed/")} // Convierte el link de YouTube a formato embed
                      title="Video Noticia"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    ): lastNews.image ? (
                      <img src={lastNews.image} alt={lastNews.title} className="home-last-news-image" />
                    ) : (
                      <img
          src="https://img.freepik.com/vector-premium/advertencia-error-sistema-operativo-ventana-mensaje-emergente-ventana-dialogo-falla-sistema-diseno-plano_812892-54.jpg"
          alt="Imagen no encontrada"
          className="home-imgNews"
        />
                    )}
                  </div>
                      <div className="home-last-news-text">                            
                      <h5>{lastNews.subtitle}</h5>
                      <button onClick={() => navigate(`/news/${lastNews.id}`)} className="home-ver-mas-btn">
                                    ...Seguir leyendo
                      </button>
             </div>
            </div>
          </div>

          {/* 4 noticias en fila (horizontalmente) */}
          <div className='home-ribbon-single'>Últimas noticias...</div>
          <div className="home-news-row">
            <CategoryCarousel news={news} />
          </div>

        {/* Espacio para anuncios entre noticias */}
          <div className="home-ad-space-between">
          <BannerCarousel />
          </div>

          {/* Noticia destacada por categoría */}          
          <div className="home-featured-category">
            <h2>Noticias de Tecnología</h2>
            <div className="home-featured-news">
              <p>Noticia destacada de la categoría</p>
            </div>
          </div>

          {/* 4 noticias más de la misma categoría */}
          <div className="home-category-news-row">
            <div className="home-category-news-item">Noticia 1</div>
            <div className="home-category-news-item">Noticia 2</div>
            <div className="home-category-news-item">Noticia 3</div>
            <div className="home-category-news-item">Noticia 4</div>
          </div>
        </div>

        <div className="home-right-column">
          {/* Última noticia en grande */}
          <div className="home-latest-large-news">
            <h2>Última Noticia Grande</h2>
            <p>Contenido de la última noticia en grande</p>
          </div>

          {/* Espacio para anuncios */}
          <div className="home-ad-space">
            <AdsCarousel />
          </div>
        </div>
      </div>

      {/* Espacio para anuncios entre noticias */}
      <div className="home-ad-space-between">
        <p>Publicidad entre noticias</p>
      </div>

      <Footer />
    </div>
  );
}

export default Home;



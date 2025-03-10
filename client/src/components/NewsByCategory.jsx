import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { newsByCategory } from '../redux/actions/actions';
import AdsCarousel from './AdsCarousel';
import BannerCarousel from './BannerCarousel';
import Footer from './Footer';
import NavBar from './NavBar';
import ScrollToTopButton from './ScrollTop';
import Buscador from './Search';

const NewsByCategory = () => {
    const { id } = useParams(); // Obtener el id de la categoría desde la URL
    const dispatch = useDispatch();
    const allNews = useSelector((state)=> state.news)
    const news = useSelector((state) => state.newsByCategory[id] || []); // Obtener noticias de esa categoría
    const categories = useSelector((state)=> state.category);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if (id) {
            dispatch(newsByCategory(id)); // Llamar al action para obtener las noticias por categoría
        
            const category = categories.find((cat)=> cat.id === id);
            if(category){
                setCategoryName(category.name);
            }
        }
    }, [dispatch, id, categories]);

    const [isPaused, setIsPaused] = useState(false);

    const navigate = useNavigate();

    return (
        <div className='newsBy-home'> 
        {/** top header */}
            <div className="home-ad-space-between">
                <BannerCarousel />
            </div>
            <header className="home-header">
                <NavBar />
            </header>
        {/** FIN top header */}

    {/** MARQUEE */}
            <div className="marquee-container">
                <div className="static-title">Últimas Noticias:</div>
                <div
                className={`marquee-wrapper ${isPaused ? 'paused' : ''}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                >
                <div className="marquee">
                {allNews.length > 0
                ? allNews.map((item, index) => (
                  <span
                    key={item.id}
                    onClick={() => navigate(`/news/${item.id}`)}
                    className="news-title"
                  >
                    {index > 0 && <span style={{ margin: '0 8px' }}>|</span>}
                    {item.title}
                  </span>
                ))
                : 'Cargando noticias...'}
                </div>
                </div>
            </div>
      {/** FIN MARQUEE */}

            {/** Nombre de la Categoría */}
                <h3 className="newsBy-category-title">Noticias de sección {categoryName}</h3>

            <div class="newsBy-content">
            <div className="newsBy-content-left">      
            {news.length > 0 ? (
            news.map((item) => (
            <div key={item.id} className="newsBy-item">
                {/* Título que ocupa todo el ancho */}
            <h3 className="newsBy-item-title">{item.title} | {item.volanta}</h3>
        
        {/* Contenedor en dos columnas: media y texto */}
        <div className="newsBy-item-grid">
          <div className="newsBy-item-media">
            {item.videoLink ? (
              <iframe
                className="newsBy-video"
                src={
                  item.videoLink.includes('youtube.com')
                    ? item.videoLink.replace("watch?v=", "embed/")
                    : item.videoLink.includes('facebook.com')
                    ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(item.videoLink)}`
                    : item.videoLink
                }
                title="Video Noticia"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : item.image ? (
              <img
                src={item.image}
                alt="Imagen de la noticia"
                className="newsBy-imgNews"
              />
            ) : (
              <img
                src="https://img.freepik.com/vector-premium/advertencia-error-sistema-operativo-ventana-mensaje-emergente-ventana-dialogo-falla-sistema-diseno-plano_812892-54.jpg"
                alt="Imagen no encontrada"
                className="newsBy-imgNews"
              />
            )}
            <div className='newsBy-item-content'>
            <h5>{item.subtitle}</h5>
            </div>
          </div>
          <div className="newsBy-item-content">            
            <p>{item.text}</p>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>No hay noticias en esta categoría.</p>
  )}
</div>


                <div class="newsBy-content-right">
                <Buscador />
                    <div className="home-lateral-clima">
                    <iframe
                     src="https://api.wo-cloud.com/content/widget/?geoObjectKey=11415237&language=es&region=AR&timeFormat=HH:mm&windUnit=kmh&systemOfMeasurement=metric&temperatureUnit=celsius"
                    name="CW2"
                    scrolling="no"
                    className="home-lateral-clima"
                    frameBorder="0"
                    ></iframe>
                    </div>
                    <div className="home-ad-space">
                    <AdsCarousel />
                    </div>
                </div>

            </div>
        <div className="home-ad-space-between-footer">
            <BannerCarousel />
        </div>
        <ScrollToTopButton/>
            <Footer />
        </div>
    );
};

export default NewsByCategory;


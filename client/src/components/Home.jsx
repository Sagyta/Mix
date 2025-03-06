import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
//import news from './News';
import NewsCarousel from './NewsCarousel'; // Suponiendo que tienes un componente de Carousel
import NavBar from './NavBar';
import Footer from './Footer'; // Suponiendo que tienes un componente de Footer
import { useDispatch, useSelector } from 'react-redux';
import { getNews, getCategories, newsByCategory  } from '../redux/actions/actions'; // Importa la acción para cargar las noticias
import '../css/Home.css';
import CategoryCarousel from './CategoryCarousel';
import AdsCarousel from './AdsCarousel';
import BannerCarousel from './BannerCarousel';

//console.log("📌 Funciones importadas:", { getNews, getCategories, newsByCategory });

const Home = () => {
    const dispatch = useDispatch();
    const news = useSelector((state) => state.news);
    const categories = useSelector((state)=> state.category)
    const newsByCategoryData = useSelector((state)=> state.newsByCategory);

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
     // console.log("Ejecutando dispatch(getNews())...");
        dispatch(getNews()); // 🔹 Llamamos a la acción que ahora ya ordena las noticias desde el back
    }, [dispatch]);

    useEffect(() => {
      //console.log("🔍 Ejecutando dispatch(getCategories())...");
      dispatch(getCategories());
  }, [dispatch]);
  
  useEffect(() => {
    console.log("📌 Categorías cargadas en Redux:", categories);
    if (categories && categories.length > 0) {
        categories.forEach((category) => {
            console.log(`📌 Dispatching category ${category.id}`);
            dispatch(newsByCategory(category.id));
        });
    }
}, [dispatch, categories, newsByCategory]); // Agregado newsByCategory

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
  {categories.map((category) => {
    const categoryNews = newsByCategoryData[category.id] || [];

    if (categoryNews.length === 0) {
      return null; // Si no hay noticias en la categoría, no se muestra
    }

    // Última noticia en grande
    const lastCategoryNews = categoryNews[0]; 
    const otherNews = categoryNews.slice(1); // Otras noticias de la categoría

    return (
      <div key={category.id} className="by-category-section">
        <h2 className="by-category-title">{category.name}</h2>

        {/* Última noticia en grande */}
        <div className="by-category-main-news">
          <h3>{lastCategoryNews.title}</h3>
          {lastCategoryNews.videoLink ? (
            <iframe
              className="by-category-news-video"
              src={lastCategoryNews.videoLink.replace("watch?v=", "embed/")}
              title="Video Noticia"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : lastCategoryNews.image ? (
            <img src={lastCategoryNews.image} alt={lastCategoryNews.title} className="by-category-news-image" />
          ) : (
            <img
              src="https://img.freepik.com/vector-premium/advertencia-error-sistema-operativo-ventana-mensaje-emergente-ventana-dialogo-falla-sistema-diseno-plano_812892-54.jpg"
              alt="Imagen no encontrada"
              className="by-category-news-image"
            />
          )}
          <p>{lastCategoryNews.subtitle}</p>
          <button onClick={() => navigate(`/news/${lastCategoryNews.id}`)} className="by-home-ver-mas-btn">
            ...Seguir leyendo
          </button>
        </div>

        {/* Noticias restantes en filas de 4 */}
        {otherNews.length > 0 && (
          <div className="by-category-news-grid">
            {otherNews.map((newsItem, index) => (
              <div  key={newsItem.id} className="by-category-news-item">
                <h4 onClick={() => navigate(`/news/${lastCategoryNews.id}`)} className='by-category-news-item-link'>{newsItem.title}</h4>
                {lastCategoryNews.videoLink ? (
            <iframe
              className="by-category-news-video-thumb"
              src={lastCategoryNews.videoLink.replace("watch?v=", "embed/")}
              title="Video Noticia"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : lastCategoryNews.image ? (
            <img src={lastCategoryNews.image} alt={lastCategoryNews.title} className="by-category-news-image-thumb" />
          ) : (
            <img
              src="https://img.freepik.com/vector-premium/advertencia-error-sistema-operativo-ventana-mensaje-emergente-ventana-dialogo-falla-sistema-diseno-plano_812892-54.jpg"
              alt="Imagen no encontrada"
              className="by-category-news-image-thumb"
                />
              )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>     
      </div>                

        <div className="home-right-column">
          {/* Clima */}
          <div className="home-lateral-clima">
          <div id="ww_006c1e1daee38" v='1.3' loc='auto' 
          a='{"t":"horizontal","lang":"es","sl_lpl":1,"ids":[],
          "font":"Arial","sl_ics":"one_a","sl_sot":"celsius",
          "cl_bkg":"#FFFFFF","cl_font":"#000000","cl_cloud":"#d4d4d4",
          "cl_persp":"#2196F3","cl_sun":"#FFC107","cl_moon":"#FFC107",
          "cl_thund":"#FF5722","el_whr":3}'>
            Más previsiones: <a href="https://oneweather.org/es/seville/" 
            id="ww_006c1e1daee38_u" target="_blank">
              oneweather.org</a></div>
              <script async src="https://app3.weatherwidget.org/js/?id=ww_006c1e1daee38"></script>
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



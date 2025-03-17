import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getNews, getCategories, newsByCategory } from '../redux/actions/actions';
import '../css/Home.css';
import CategoryCarousel from './CategoryCarousel';
import AdsCarousel from './AdsCarousel';
import BannerCarousel from './BannerCarousel';
import Buscador from './Search';
import ScrollToTopButton from './ScrollTop';
import AdsFooter from './AdsFooter';

const Home = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  const categories = useSelector((state) => state.category);
  const newsByCategoryData = useSelector((state) => state.newsByCategory);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    dispatch(getNews());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      categories.forEach((category) => {
        dispatch(newsByCategory(category.id));
      });
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (news.length > 0) {
      setLoading(false);
    }
  }, [news]);

  const lastNews = news[0];

  return (
    <div className="home">
      <div className="home-ad-space-between">
        <BannerCarousel />
      </div>

      <header className="home-header">
        <NavBar />
      </header>      

      <div className="marquee-container">
        <div className="static-title">Últimas Noticias:</div>
        <div
          className={`marquee-wrapper ${isPaused ? 'paused' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="marquee">
            {loading ? (
              <p>Cargando noticias...</p>
            ) : (
              news.map((item, index) => (
                <span
                  key={item.id}
                  onClick={() => navigate(`/news/${item.id}`)}
                  className="news-title"
                >
                  {index > 0 && <span style={{ margin: '0 8px' }}>|</span>}
                  {item.title}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="content-home">
        <div className="home-left-column">
          {loading ? (
            <p>Cargando noticias...</p>
          ) : (
            <>
              <div className="home-latest-news">
                <h2 className="home-title-news">Lo Nuevo</h2>
                <div className="home-last-news-content">
                  <h5>{lastNews.category.name} | {lastNews.volanta} </h5>
                  <h2
                    onClick={() => navigate(`/news/${lastNews.id}`)}
                    className="home-ver-mas-btn"
                  >
                    {lastNews.title}
                  </h2>
                  <div>
                    {lastNews.videoLink ? (
                      <iframe
                        className="home-last-news-video"
                        src={lastNews.videoLink.replace('watch?v=', 'embed/')}
                        title="Video Noticia"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <img
                        src={lastNews.image || "https://img.freepik.com/vector-premium/advertencia-error-sistema-operativo-ventana-mensaje-emergente-ventana-dialogo-falla-sistema-diseno-plano_812892-54.jpg"}
                        alt={lastNews.title}
                        className="home-last-news-image"
                      />
                    )}
                  </div>
                  <div className="home-last-news-text">
                    <p>{lastNews.subtitle}</p>
                  </div>
                </div>
              </div>

              <div className="home-news-row">
                <CategoryCarousel news={news} />
              </div>

              <div className="home-ad-space-between">
                <BannerCarousel />
              </div>

              <div className="home-featured-category">
                <div className="by-category-grid">
                  {categories.map((category) => {
                    // Obtener las noticias de la categoría actual
                    const categoryNews = newsByCategoryData[category.id] || [];
                    
                    // Si no hay noticias, no mostrar la categoría
                    if (categoryNews.length === 0) return null;

                    // Obtener las últimas 2 noticias (asumiendo que están en orden descendente por fecha)
                    const latestNews = categoryNews.slice(0, 2);

                    return (
                      <div key={category.id} className="by-category-section">
                        {/* Título de la categoría ocupando todo el ancho */}
                        <h2 className="by-category-title" style={{ width: "100%", textAlign: "center" }}>
                          {category.name}
                        </h2>

                        <div className="by-category-row">
                          {latestNews.map((news) => (
                            <div key={news.id} className="by-category-item">
                              <h3
                                onClick={() => navigate(`/news/${news.id}`)}
                                className="by-home-ver-mas-btn"
                              >
                                {news.title} | {news.volanta}
                              </h3>
                              {/* Mostrar imagen o video */}
                              {news.videoLink ? (
                              <iframe
                                className="by-category-video"
                                src={
                                  news.videoLink.includes('youtube.com')
                                    ? news.videoLink.replace('watch?v=', 'embed/')
                                    : news.videoLink.includes('facebook.com')
                                    ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(news.videoLink)}`
                                    : news.videoLink
                                }
                                title="Video Noticia"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            ) : news.image ? (
                              <img
                                src={news.image}
                                alt={news.title}
                                className="by-category-image"
                              />
                            ) : (
                              <img
                                src="https://img.freepik.com/vector-premium/advertencia-error-sistema-operativo-ventana-mensaje-emergente-ventana-dialogo-falla-sistema-diseno-plano_812892-54.jpg"
                                alt="Imagen no encontrada"
                                className="by-category-image"
                              />
                            )}
                              <h4 className="by-category-subtitle">{news.subtitle}</h4>
                              <p className="by-category-text">{news.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}                  
                </div>
              </div>
            </>
          )}
        </div>

        <div className="home-right-column">
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
        {/*publicidad fija*/}
        <AdsFooter />
      </div>

      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default Home;

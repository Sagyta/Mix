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
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      categories.forEach((category) => {
        dispatch(newsByCategory(category.id));
      });
    }
  }, [dispatch, categories]);

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
  const lastNews = news[0];

  return (
    <div className="home">
      <div className="home-ad-space-between">
        <BannerCarousel />
      </div>
      <header className="home-header">
        <NavBar />
      </header>

      {/* Marquee de Noticias */}
      <div className="marquee-container">
        <div className="static-title">Últimas Noticias:</div>
        <div
          className={`marquee-wrapper ${isPaused ? 'paused' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="marquee">
            {news.length > 0
              ? news.map((item, index) => (
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

      <div className="content-home">
        <div className="home-left-column">
          {/* Última noticia */}
          <div className="home-latest-news">
            <h2 className="home-title-news">lo nuevo</h2>
            <div className="home-last-news-content">
              <h5>{lastNews.category.name} | {lastNews.volanta} </h5>
              <h2 onClick={() => navigate(`/news/${lastNews.id}`)}
                  className="home-ver-mas-btn">{lastNews.title} </h2>
              <div>
                {lastNews.videoLink ? (
                  <iframe
                    className="home-last-news-video"
                    src={
                      lastNews.videoLink.includes('youtube.com')
                        ? lastNews.videoLink.replace('watch?v=', 'embed/')
                        : lastNews.videoLink.includes('facebook.com')
                        ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(lastNews.videoLink)}`
                        : lastNews.videoLink
                    }
                    title="Video Noticia"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : lastNews.image ? (
                  <img
                    src={lastNews.image}
                    alt={lastNews.title}
                    className="home-last-news-image"
                  />
                ) : (
                  <img
                    src="https://img.freepik.com/vector-premium/advertencia-error-sistema-operativo-ventana-mensaje-emergente-ventana-dialogo-falla-sistema-diseno-plano_812892-54.jpg"
                    alt="Imagen no encontrada"
                    className="home-imgNews"
                  />
                )}
              </div>
              <div className="home-last-news-text">
                <p>{lastNews.subtitle}</p>
                
              </div>
            </div>
          </div>

          {/* 4 noticias en fila (horizontalmente) */}
          <div className="home-title-news">Últimas noticias...</div>
          <div className="home-news-row">
            <CategoryCarousel news={news} />
          </div>

          <div className="home-ad-space-between">
            <BannerCarousel />
          </div>

          {/* Noticia destacada por categoría */}
          <div className="home-featured-category">
            {categories.map((category) => {
              const categoryNews = newsByCategoryData[category.id] || [];

              if (categoryNews.length === 0) {
                return null;
              }

              const lastCategoryNews = categoryNews[0];
              const otherNews = categoryNews.slice(1);

              return (
                <div key={category.id} className="by-category-section">
                  <h2 className="by-category-title">{category.name}</h2>

                  <div className="by-category-main-news">
                    <h3 onClick={() => navigate(`/news/${lastCategoryNews.id}`)}
                        className="by-home-ver-mas-btn">
                      {lastCategoryNews.title} | {lastCategoryNews.volanta}</h3>
                    {lastCategoryNews.videoLink ? (
                      <iframe
                        className="by-category-news-video"
                        src={
                          lastCategoryNews.videoLink.includes('youtube.com')
                            ? lastCategoryNews.videoLink.replace('watch?v=', 'embed/')
                            : lastCategoryNews.videoLink.includes('facebook.com')
                            ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(lastCategoryNews.videoLink)}`
                            : lastCategoryNews.videoLink
                        }
                        title="Video Noticia"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : lastCategoryNews.image ? (
                      <img
                        src={lastCategoryNews.image}
                        alt={lastCategoryNews.title}
                        className="by-category-news-image"
                      />
                    ) : (
                      <img
                        src="https://img.freepik.com/vector-premium/advertencia-error-sistema-operativo-ventana-mensaje-emergente-ventana-dialogo-falla-sistema-diseno-plano_812892-54.jpg"
                        alt="Imagen no encontrada"
                        className="by-category-news-image"
                      />
                    )}
                    <p>{lastCategoryNews.subtitle}</p>
                    
                  </div>

                  {otherNews.length > 0 && (
                    <div className="by-category-news-grid">
                      <div className="by-category-similares">Noticias similares</div>
                      {otherNews.slice(0, 4).map((newsItem, index) => (
                        <div key={newsItem.id} className="by-category-news-item">
                          <h4
                            onClick={() => navigate(`/news/${newsItem.id}`)}
                            className="by-category-news-item-link"
                          >
                            {newsItem.title} | {newsItem.volanta}
                          </h4>
                          {newsItem.videoLink ? (
                            <iframe
                              className="by-category-news-video-thumb"
                              src={newsItem.videoLink.includes('youtube.com')
                              ? newsItem.videoLink.replace('watch?v=', 'embed/')
                              : newsItem.videoLink.includes('facebook.com')
                              ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(newsItem.videoLink)}`
                              : newsItem.videoLink}
                              title="Video Noticia"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          ) : newsItem.image ? (
                            <img
                              src={newsItem.image}
                              alt={newsItem.title}
                              className="by-category-news-image-thumb"
                            />
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
          <Buscador />
          <div className="home-lateral-clima">
            <iframe
              src="https://api.wo-cloud.com/content/widget/?geoObjectKey=11415237&language=es&region=AR&timeFormat=HH:mm&windUnit=kmh&systemOfMeasurement=metric&temperatureUnit=celsius"
              name="CW2"
              scrolling="no"
              className='home-lateral-clima'
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

export default Home;

import React, { useEffect, useState } from 'react';
import News from './News';
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../redux/actions/actions';
import '../css/SeccionNews.css';
import NavBar from './NavBar';
import Footer from './Footer';
import BannerCarousel from './BannerCarousel';
import { Navigate, useNavigate } from 'react-router-dom';
import '../css/Home.css'
import Buscador from './Search';
import AdsCarousel from './AdsCarousel';
import Paginator from './Paginador';  // Importamos el componente Paginador
import ScrollToTopButton from './ScrollTop';

export default function SeccionNews() {
  const news = useSelector(state => state.news);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const [isPaused, setIsPaused] = useState(false);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='seccion-home'>
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

      <div className='seccion-news-content'>
        <div className="seccion-left-column">
          <div className='seccion-galeria-grid'>
            {currentNews.map(e => (
              <div key={e.id} className="seccion-news-card-container">
                <News
                  key={e.id}
                  id={e.id}
                  videoLink={e.videoLink}
                  volanta={e.volanta}
                  title={e.title}
                  subtitle={e.subtitle}
                  category={e.category}
                  image={e.image}
                  createdAt={e.createdAt}
                />
              </div>
            ))}
          </div>

          {/* Aquí estamos usando el componente Paginador */}
          <Paginator
            currentPage={currentPage}
            totalNews={news.length}
            newsPerPage={newsPerPage}
            paginate={paginate}
          />
        </div>

        <div className="seccion-right-column">
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
}
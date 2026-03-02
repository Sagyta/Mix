import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMostPopularNews } from '../redux/actions/actions';

const PopularNews = () => {
  const dispatch = useDispatch();
  const popularNews = useSelector((state) => state.popularNews);


  useEffect(() => {
    console.log("Noticias populares en componente popular q da:", popularNews);
  }, [popularNews]);


  useEffect(() => {
    dispatch(getMostPopularNews());
  }, [dispatch]);

  if (!popularNews || popularNews.length === 0) {
    return <div>Cargando noticias populares...</div>;
  }

  return (
    <div className="popular-news-container">
      <h2>Noticias Más Populares</h2>
      <ul>
        {popularNews.map((news) => (
          <li key={news.id}>
            <h3>{news.title}</h3>
            <p>{news.subtitle}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularNews;

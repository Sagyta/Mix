import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom"; // Si estás usando React Router
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/NewsCarousel.css"; // Archivo de estilos

const CategoryCarousel = ({ news }) => {
  // Agrupar las noticias por categoría
  const groupedNews = news.reduce((acc, item) => {
    if (!acc[item.categoryId]) {
      acc[item.categoryId] = []; // Si no existe la categoría, inicializamos un array
    }
    acc[item.categoryId].push(item); // Añadimos la noticia al grupo
    return acc;
  }, {});

  // Obtener las últimas 4 noticias de cada categoría
  const latestNewsArray = Object.keys(groupedNews).map((categoryId) => {
    const categoryNews = groupedNews[categoryId];
    // Ordenamos las noticias de cada categoría por fecha (si tienes el campo `date`)
    categoryNews.sort((a, b) => new Date(b.date) - new Date(a.date));
    // Retornamos las últimas 4 noticias de cada categoría
    return categoryNews.slice(0, 4); // Toma solo las 4 primeras noticias más recientes
  });

  // Aplanar el array de noticias para que sea un solo array
  const flattenedLatestNews = latestNewsArray.flat();

  return (
    <div className="category-carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        //navigation
        //pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={500}
      >
        {flattenedLatestNews.map((item, index) => (
          <SwiperSlide key={index}>
          <div className="category-news-slide">
            {/* Aquí accedemos al nombre de la categoría correctamente */}
            <h2>{item.category?.name || "Sin categoría"}</h2>
            <Link to={`/news/${item.id}`}>
            <img src={item.image} alt={item.title} className="category-news-image" />
            </Link>
            <div className="category-news-text">
              <h3>{item.title}</h3>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);
};

export default CategoryCarousel;

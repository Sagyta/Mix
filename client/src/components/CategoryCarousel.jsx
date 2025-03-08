import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/NewsCarousel.css";
import { useDispatch, useSelector } from "react-redux";
import { newsByCategory } from "../redux/actions/actions";

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category) || []; // Categorías desde Redux
  const newsByCategories = useSelector((state) => state.newsByCategory); // Últimas noticias de cada categoría

  //console.log("Categorías en Redux:", categories);
  //console.log("Noticias agrupadas por categoría:", newsByCategories);
  // Cargar las noticias de cada categoría cuando cambien las categorías
  useEffect(() => {
    if (categories.length) {
      categories.forEach((category) => {
        dispatch(newsByCategory(category.id)); // Trae noticias por categoría
      });
    }
  }, [dispatch, categories]);

  return (
    <div className="category-carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={4}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={500}
      >
        {categories.length > 0 ? (
  categories.map((category) => {
    const news = newsByCategories?.[category.id] || []; // Evita errores si es undefined
    const latestNews = news.length > 0 ? news[0] : null;

    return latestNews ? (
      <SwiperSlide key={latestNews.id}>
        <div className="category-news-slide">
          <h2>{category.name}</h2>
          <Link to={`/news/${latestNews.id}`}>
            <img src={latestNews.image} alt={latestNews.title} className="category-news-image" />
          </Link>
          <div className="category-news-text">
            <h3>{latestNews.volanta}</h3>
            <h3>{latestNews.title}</h3>
          </div>
        </div>
      </SwiperSlide>
    ) : null;
  })
) : (
  <p>Cargando categorías...</p> // Mensaje temporal si aún no hay categorías
)}
      </Swiper>
    </div>
  );
};

export default CategoryCarousel;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/NewsCarousel.css"; // Archivo de estilos
import { Link } from "react-router-dom";

const NewsCarousel = ({ news }) => {
  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={8}
       // navigation
       // pagination={{ clickable: true }}
        autoplay={{ delay: 50, disableOnInteraction: false, pauseOnMouseEnter: true, }}
        loop={true}
        speed={500}
      >
        {news.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="news-slide">
            <Link to={`/news/${item.id}`}>
              <img src={item.image} alt={item.title} className="news-image" />
            </Link>
              <div className="news-text">
                <h3>{item.title}</h3>
               {/* <p>{item.subtitle}</p>*/}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsCarousel;
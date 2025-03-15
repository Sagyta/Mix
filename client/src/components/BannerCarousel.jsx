import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  getAdsBanner } from "../redux/actions/actions"; // Asegúrate de que esta acción está bien definida
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "../css/AdsCarousel.css"; // Archivo de estilos

const BannerCarousel = () => {
  const dispatch = useDispatch();
  const adsBan = useSelector((state) => state.adsBanner); // Suponiendo que ya tienes ads en Redux
 // console.log("Anuncios cargados:", adsBan);
  useEffect(() => {
    dispatch(getAdsBanner()); // Llama a la acción para obtener las imágenes de los anuncios
  }, [dispatch]);

  if (adsBan.length === 0) {
    return <div>Cargando anuncios...</div>;
  }

  return (
    <div className="adsLat-carousel-container">
      <Swiper
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }} // Para un efecto más suave desvanece
        Pagination
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={1000}
      >
        {adsBan.map((ad, index) => (
          <SwiperSlide key={index}>
            <div className="banner-ads-slide">
              <img
                src={ad.image} // 🔹 Concatena la URL base con la ruta de la imagen
                alt={`Publicidad ${index}`}
                className="banner-ads-image"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;

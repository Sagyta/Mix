import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAds } from "../redux/actions/actions";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "../css/AdsCarousel.css";

const AdsCarousel = () => {
  const dispatch = useDispatch();
  const ads = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(getAds());
  }, [dispatch]);

  // Función para mezclar las imágenes aleatoriamente
  const shuffleAds = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  const shuffledAds = shuffleAds(ads); // Mezcla las imágenes

  if (shuffledAds.length === 0) {
    return <div>Cargando anuncios...</div>;
  }

  return (
    <div className="adsLat-carousel-container">
      <Swiper
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={1000}
      >
        {shuffledAds.map((ad, index) => (
          <SwiperSlide key={index}>
            <div className="adsLat-ads-slide">
              <img
                src={ad.image}
                alt={`Publicidad ${index}`}
                className="adsLat-ads-image"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdsCarousel;
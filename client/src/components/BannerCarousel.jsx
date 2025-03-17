import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdsBanner } from "../redux/actions/actions";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "../css/AdsCarousel.css";

const BannerCarousel = () => {
  const dispatch = useDispatch();
  const adsBan = useSelector((state) => state.adsBanner);

  useEffect(() => {
    dispatch(getAdsBanner());
  }, [dispatch]);

  // Función para mezclar las imágenes aleatoriamente
  const shuffleAds = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  const shuffledAdsBan = shuffleAds(adsBan); // Mezcla las imágenes

  if (shuffledAdsBan.length === 0) {
    return <div>Cargando anuncios...</div>;
  }

  return (
    <div className="banner-carousel-container">
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
        {shuffledAdsBan.map((ad, index) => (
          <SwiperSlide key={index}>
            <div className="banner-ads-slide">
              <img
                src={ad.image}
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

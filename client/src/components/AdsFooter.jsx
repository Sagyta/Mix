import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAds } from "../redux/actions/actions";
//import "../css/AdsGrid.css";

const AdsGrid = () => {
  const dispatch = useDispatch();
  const ads = useSelector((state) => state.ads);

  useEffect(() => {
    dispatch(getAds());
  }, [dispatch]);

  if (ads.length === 0) {
    return <div>Cargando anuncios...</div>;
  }

  return (
    <div className="ads-grid-container">
      {ads.map((ad, index) => (
        <div key={index} className="ads-grid-item">
          <img
            src={ad.image}
            alt={`Publicidad ${index}`}
            className="ads-grid-image"
          />
        </div>
      ))}
    </div>
  );
};

export default AdsGrid;

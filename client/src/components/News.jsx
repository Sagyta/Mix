//import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { format } from 'date-fns';
import {es} from 'date-fns/locale'
import '../css/News.css'


export default function Noticias({ title,volanta, subtitle, videoLink, id, user, category, image, createdAt}){
  const dispatch = useDispatch()
  const noticia = useSelector(state=> state.news);

  return (
    <div className='news' key={title}>

      <div className="news-header">
        <span className="news-card-category"> {category?.name}  |  {volanta}</span>
        <span className="news-date">
          {createdAt ? format(new Date(createdAt), "d 'de' MMMM 'de' yyyy", { locale: es }) : 'Fecha no disponible'}
        </span>
        </div>

      <div className='news-grid'>
        {/* Primera columna: Categoría + Imagen/Video */}
        <div className='news-left'>
          {videoLink ? (
            <iframe className='card-video'
              src={
                videoLink.includes('youtube.com')
                  ? videoLink.replace("watch?v=", "embed/")
                  : videoLink.includes('facebook.com')
                    ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(videoLink)}`
                    : videoLink}
              title="Video Noticia"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : image ? (
            <img src={image} alt="Imagen de la noticia" className="card-imgNews" />
          ) : (
            <img
              src="https://img.freepik.com/vector-premium/advertencia-error-sistema-operativo-ventana-mensaje-emergente-ventana-dialogo-falla-sistema-diseno-plano_812892-54.jpg"
              alt="Imagen no encontrada"
              className="imgNews"
            />
          )}
        </div>

        {/* Segunda columna: Fecha + Título + Subtítulo */}
        <div className='news-rigth'>
          <Link to={`/news/${id}`}>
            <h2 className="titleNews">{title.slice(0, 60) + '...'}</h2>
          </Link>
          <h3 className="subtitleNews">
            {subtitle.split(' ').slice(0, 19).join(' ') + ' ...'}
          </h3>
        </div>
      </div>
    </div>
  )
}
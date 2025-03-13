import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearPage, addComment, detailNews, getComments, getNews, getRelatedNews } from '../redux/actions/actions';
//import { Navigate } from 'react-router-dom';
import Footer from './Footer';
import PuffLoader from 'react-spinners/PuffLoader';
import NavBar from './NavBar';
import BannerCarousel from './BannerCarousel';
import Buscador from './Search';
import AdsCarousel from './AdsCarousel';
import ScrollToTopButton from './ScrollTop';
import { format } from 'date-fns';
import {es} from 'date-fns/locale'

export default function NewsDetail() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const news = useSelector(state => state.news);
  const noticia = useSelector(state => state.newsDetail);
  console.log('categorya en noticias', noticia)
  const comment = useSelector(state => state.comments) || [];

  const [isPaused, setIsPaused] = useState(false);

  const [localState, setLocalState] = useState({
    guestName: localStorage.getItem('guestName') || '', // Cargar el nombre guardado
    comment: '',
  });

//noticias relacionadas
const noticiasRelacionadas = useSelector((state)=> state.noticiasRelacionadas)
  useEffect(()=>{
    if(noticia.id){
      dispatch(getRelatedNews(noticia.id));
    }
  }, [dispatch, noticia.id]);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/news/${id}`);
  };
  //fin noticias relacionadas

  //trae las corredizas
  useEffect(() => {
    if (!news.length) {
      dispatch(getNews()); // Llama a la acción para traer noticias
    }
  }, [dispatch, news.length]);

  useEffect(() => {
    setLoading(true);
    dispatch(detailNews(id));
    dispatch(getComments(id));
    setTimeout(() => setLoading(false), 2000);

    return () => {
      dispatch(clearPage());
    };
  }, [dispatch, id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setLocalState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit() {
    if (!localState.comment.trim()) {
      alert("El comentario no puede estar vacío");
      return;
    }

    let username = localState.guestName.trim();

    if (!username) {
      alert("Debes ingresar un nombre para comentar");
      return;
    }

    // Guardar el nombre del usuario en localStorage para futuras visitas
    localStorage.setItem('guestName', username);

    const newComment = {
      username,
      comment: localState.comment,
    };

    dispatch(addComment(id, newComment)).then(() => {
      dispatch(getComments(id));
    });

    setLocalState({ comment: "", guestName: username }); // Limpiar comentario pero mantener el nombre
  }


    return (
      <div className='detail-home'>

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
      
      <div className="detail-news-content">
      {loading ? (
        <PuffLoader className='loader' size={200} color={'#e78345'} loading={loading} />
      ) : (
        <div className="detail-left-column">          
          <div className="detalleNoticia">
          {noticia.category ? noticia.category.name : "Sin categoría"} | {noticia.volanta}
            <h2 className="noticiaTitulo">{noticia.title}</h2>
            <div className='video'>
            {noticia.videoLink ? (
                  <iframe
                    className="home-last-news-video"
                    src={
                      noticia.videoLink.includes('youtube.com')
                        ? noticia.videoLink.replace('watch?v=', 'embed/')
                        : noticia.videoLink.includes('facebook.com')
                        ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(noticia.videoLink)}`
                        : noticia.videoLink
                    }
                    title="Video Noticia"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : noticia.image ? (
                  <img
                    src={noticia.image}
                    alt={noticia.title}
                    className="home-last-news-image"
                  />
                ) : (
                  <img
                    src="https://img.freepik.com/vector-premium/advertencia-error-sistema-operativo-ventana-mensaje-emergente-ventana-dialogo-falla-sistema-diseno-plano_812892-54.jpg"
                    alt="Imagen no encontrada"
                    className="home-imgNews"
                  />
                )}
            </div>
            <h4 className="noticiaSubtitulo">{noticia.subtitle}</h4>
            <p className="noticiaTexto">{noticia.text}</p>
          </div>

          <div className="seccionComentarios">
        <section>
          <h3>Comentarios:</h3>
          <div className="comentariosHechos">
            {comment.length > 0 ? (
              comment.map((comment, i) => (
                <div className="containerComment" key={i}>
                  <h5>{comment.createdAt ? format(new Date(comment.createdAt), "d 'de' MMMM 'de' yyyy", { locale: es }) : 'Fecha no disponible'}</h5>
                  <h3>{comment.username || "Anónimo"}:</h3>
                  <h4>{comment.comment}</h4>
                </div>
              ))
            ) : (
              <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
            )}
          </div>
        </section>

        <hr />

        <section className="sectionEscribirComentario">
          <h3>Deja un comentario:</h3>

          {/* Mostrar nombre solo si el campo está vacío */}
          {!localState.guestName && (
            <div>
              <input
                type="text"
                name="guestName"
                value={localState.guestName}
                onChange={handleChange}
                placeholder="Ingresa tu nombre..."
              />
            </div>
          )}

          <div>
            <textarea
              name="comment"
              cols="50"
              value={localState.comment}
              onChange={handleChange}
              rows="5"
              placeholder="Escribe tu comentario..."
            ></textarea>
          </div>

              <div className="enviarComentario">
                <button onClick={handleSubmit} type="button">
                  <span>Enviar</span>
                </button>
              </div>
            </section>
          </div>


          {/** Noticias Relacionadas */}
          <div className="noticia-container">
            <h3>Noticias Relacionadas</h3>
            
            <div className="related-news-container">
  {noticiasRelacionadas.length > 0 ? (
    noticiasRelacionadas.map((rel) => (
      <div 
        key={rel.id} 
        className="related-news-card" 
        onClick={() => handleClick(rel.id)}  // Pasa el id de la noticia relacionada
      >
        {rel.videoLink ? (
          <iframe
            className="related-news-video"
            src={
              rel.videoLink.includes('youtube.com')
                ? rel.videoLink.replace('watch?v=', 'embed/')
                : rel.videoLink.includes('facebook.com')
                ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(rel.videoLink)}`
                : rel.videoLink
            }
            title="Video Noticia"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : rel.image ? (
          <img
            src={rel.image}
            alt={rel.title}
            className="related-news-image"
          />
        ) : (
          <img
            src="https://img.freepik.com/vector-premium/advertencia-error-sistema-operativo-ventana-mensaje-emergente-ventana-dialogo-falla-sistema-diseno-plano_812892-54.jpg"
            alt="Imagen no encontrada"
            className="related-imgNews"
          />
        )}
        <h4 className='related-title'>{rel.title}</h4>
      </div>
    ))
  ) : (
    <p>No hay noticias relacionadas.</p>
  )}
</div>
              
          </div>

        {/**fin left */}
        </div>        
      )}
      <div className='detail-right-column'>

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
        {/** fin rigth */}
      </div>
      {/** div container total */}      
      </div>

      <div className="home-ad-space-between-footer">
        <BannerCarousel />
      </div>

      <ScrollToTopButton/>
      <Footer />
        {/**div detail home */}
      </div>
    
)}
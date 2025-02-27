import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearPage, addComment, detailNews, getComments } from '../redux/actions/actions';

import Footer from './Footer';
import PuffLoader from 'react-spinners/PuffLoader';
import Navbar from './NavBar';

export default function NewsDetail() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const noticia = useSelector(state => state.newsDetail);
  const comment = useSelector(state => state.comment) || [];

  const [localState, setLocalState] = useState({
    guestName: '',
    comment: '',
  });

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
    setLocalState({
      ...localState,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit() {
    if (!localState.comment.trim()) {
      alert("El comentario no puede estar vacío");
      return;
    }
  
    let storedData = localStorage.getItem('data');
    let username = storedData ? JSON.parse(storedData).username : localState.guestName.trim();
  
    if (!username) {
      alert("Debes ingresar un nombre para comentar");
      return;
    }
  
    //console.log("🟢 Enviando comentario:", 
    //{ newsId: id, username, comment: localState.comment });
  
    const newComment = {
      username,
      comment: localState.comment,
    };
  
      dispatch(addComment(id, newComment)).then(()=>{
       // console.log("🔵 Comentario agregado, recargando lista...");
      dispatch(getComments(id));
    }); // ✅ Ahora sí le pasa el `newsId` y `comment` separados
  
    setLocalState({ comment: "", guestName: "" });
  }

  return (
    <div>
        <header>Encabezado
                <Navbar />
            </header>
    <div className="containerTotal">
      {loading ? (
        <PuffLoader className='loader' size={200} color={'#e78345'} loading={loading} />
      ) : (
        <div>
          
          <div className="detalleNoticia">
            <h2 className="noticiaTitulo">{noticia.title}</h2>
            <div className='video'>
              {noticia.videoLink ? (
              <iframe
                width="100%"
                height="100%"
                src={noticia.videoLink?.replace("watch?v=", "embed/")}
                title="Video Noticia"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              ):(
                <img src={noticia.image || "https://via.placeholder.com/300"}
                alt="imagen noticia"
                className='imgNews'
                />
              )}
            </div>
            <h4 className="noticiaSubtitulo">{noticia.subtitle}</h4>
            <p className="noticiaTexto">{noticia.text}</p>
          </div>

          <div className="seccionComentarios">
            <section>
              <h3>Comentarios:</h3>
              <div className="seccionComentariosHechos">
              <div className="comentariosHechos">
  {comment?.length > 0 ? (
    comment.map((comment, i) => (
      <div className="containerComment" key={i}>
        <h3>{comment.username || "Anónimo"}:</h3>
        <h4>{comment.comment}</h4>
      </div>
    ))
  ) : (
    <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
  )}
</div>
              </div>
            </section>

            <hr />

            <section className="sectionEscribirComentario">
              <h3>Deja un comentario:</h3>

              {!localStorage.getItem('data') && (
                <div>
                 {/* <label>Nombre:</label>*/}
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
          <Footer />
        </div>
      )}
    </div>
    </div>
  );
}
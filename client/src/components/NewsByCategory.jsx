import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { newsByCategory } from '../redux/actions/actions';

const NewsByCategory = () => {
    const { id } = useParams(); // Obtener el id de la categoría desde la URL
    const dispatch = useDispatch();
    const news = useSelector((state) => state.newsByCategory[id] || []); // Obtener noticias de esa categoría

    useEffect(() => {
        if (id) {
            dispatch(newsByCategory(id)); // Llamar al action para obtener las noticias por categoría
        }
    }, [dispatch, id]);

    return (
        <div>
            <h2>Noticias de la Categoría</h2>
            {news.length > 0 ? (
                news.map((item) => (
                    <div key={item.id}>
                        <h3>{item.title}</h3>
                        <p>{item.subtitle}</p>
                    </div>
                ))
            ) : (
                <p>No hay noticias en esta categoría.</p>
            )}
        </div>
    );
};

export default NewsByCategory;


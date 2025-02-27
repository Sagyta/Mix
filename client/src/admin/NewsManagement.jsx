import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews, deleteNews, updateNews } from "../redux/actions/actions";
import { Link } from "react-router-dom";

export function NewsManagement() {
    const dispatch = useDispatch();
    const news = useSelector((state) => state.news);
    
    const [editData, setEditData] = useState({ id: "", title: "", text: "" });
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteNews(id));
    };

    const handleEditClick = (n) => {
        setEditData(n);
        setShowEditForm(true);
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        dispatch(updateNews(editData.id, editData));
        setShowEditForm(false);
    };

    return (
        <div className="admin-content">
            <nav>
                <Link to="/admin/dashboard" className="dashboard-btn">🏠 Volver al Panel</Link>
            </nav>
    <h2>Gestión de Noticias</h2>
    <ul className="news-list">
        {news.map((n) => (
            <li key={n.id} className="news-item">
                <span>{n.title}</span>
                <button onClick={() => handleEditClick(n)} className="edit-btn">Editar</button>
                <button onClick={() => handleDelete(n.id)} className="delete-btn">Eliminar</button>
            </li>
        ))}
    </ul>

    {showEditForm && (
        <form onSubmit={handleEditSubmit} className="edit-form">
            <h3>Editar Noticia</h3>
            <label>Título de la noticia</label>
            <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
            />
            <label>Subtítulo de la noticia</label>
            <input
                type="text"
                name="subtitle"
                value={editData.subtitle}
                onChange={handleEditChange}
            />
            <label>Link de imagen</label>
            <input
                type="text"
                name="imagen"
                value={editData.image}
                onChange={handleEditChange}
            />
            <label>Link de Video</label>
            <input
                type="text"
                name="video"
                value={editData.videoLink}
                onChange={handleEditChange}
            />
            <label>Texto de la noticia</label>
               <textarea
                type='text'
                name="text"
                value={editData.text || ""}
                onChange={handleEditChange}
    />
            <button type="submit">Guardar Cambios</button>
        </form>
    )}
</div>
    );
}

export default NewsManagement
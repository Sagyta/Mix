import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews, deleteNews, updateNews, getCategories } from "../redux/actions/actions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export function NewsManagement() {
    const dispatch = useDispatch();
    const news = useSelector((state) => state.news);
    const categories = useSelector((state) => state.category);
    
    const [editData, setEditData] = useState({ id: "", 
    title: "", volanta: "", subtitle:"", text: "",  image:"", videoLink:"", categoryId: ""});
    const [showEditForm, setShowEditForm] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        dispatch(getNews());
        dispatch(getCategories());
    }, [dispatch, reload]);

    /*const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta noticia?");
        if (confirmDelete) {
        dispatch(deleteNews(id));
        setReload(prev => !prev); // Reload categories after deletion
        }
    };*/
    const handleDelete = async (id)=>{
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });
        if (result.isConfirmed){
            dispatch(deleteNews(id));

            Swal.fire(
                'Eliminado!',
                'La noticia ha sido eliminada.',
                'success'
            );
            setReload(prev => !prev);
        }else{
            Swal.fire(
                'Cancelado',
                'La noticia no fue eliminada.',
                'info'
            );            
        }
    }

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
            <input
                type="text"
                name="volanta"
                value={editData.volanta}
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
                name="image"
                value={editData.image}
                onChange={handleEditChange}
            />
            <label>Link de Video</label>
            <input
                type="text"
                name="videoLink"
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
            <label>Categoría</label>
                    <select
                        name="categoryId"
                        value={editData.categoryId}
                        onChange={handleEditChange}
                    >
                        <option value=''>Selecciona una categoría</option>
                        {categories?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
            <button type="submit">Guardar Cambios</button>
        </form>
    )}
</div>
    );
}

export default NewsManagement
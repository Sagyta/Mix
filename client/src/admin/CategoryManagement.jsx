import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, deleteCategory, updateCategory } from "../redux/actions/actions";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

export function CategoryManagement() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);

    const [editData, setEditData] = useState({ id: "", name: "" });
    const [showEditForm, setShowEditForm] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch, reload]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");
        if (confirmDelete) {
            dispatch(deleteCategory(id));
            setReload(prev => !prev); // Reload categories after deletion
        }
    };

    const handleEditClick = (category) => {
        setEditData(category);
        setShowEditForm(true);
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, name: e.target.value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (editData.name.trim() === "") {
            Swal.fire("Error", "El nombre de la categoría no puede estar vacío", "error");
        } else {
            dispatch(updateCategory(editData.id, editData));
            setShowEditForm(false);
            Swal.fire("Categoría Actualizada", "La categoría se ha actualizado exitosamente.", "success");
        }
    };

    return (
        <div className="category-content">
            <nav>
                <Link to="/admin/dashboard" className="dashboard-btn">🏠 Volver al Panel</Link>
            </nav>
            <h2>Gestión de Categorías</h2>
            <ul className="category-list">
                {categories?.map((category) => (
                    <li key={category.id} className="category-item">
                        <span>{category.name}</span>
                        <button onClick={() => handleEditClick(category)} className="edit-btn-category">Editar</button>
                        <button onClick={() => handleDelete(category.id)} className="delete-btn-category">Eliminar</button>
                    </li>
                ))}
            </ul>

            {showEditForm && (
                <form onSubmit={handleEditSubmit} className="edit-form-category">
                    <h3>Editar Categoría</h3>
                    <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                    />
                    <button type="submit">Guardar Cambios</button>
                </form>
            )}
        </div>
    );
}

export default CategoryManagement;


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, deleteCategory, updateCategory } from "../redux/actions/actions";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

export function CategoryManagement() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category);

    const [editData, setEditData] = useState({ id: "", name: "" });
    const [showEditForm, setShowEditForm] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch, reload]);

    const handleDelete = async (id) => {
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
        
        if (result.isConfirmed) {
            dispatch(deleteCategory(id));
            Swal.fire(
                'Eliminado!',
                'La categoria ha sido eliminada.',
                'success'
            );
            setReload(prev => !prev); // Reload categories after deletion
        }else{
            Swal.fire(
                'Cancelado',
                'La categoria no fue eliminada.',
                'info'
            );
            
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


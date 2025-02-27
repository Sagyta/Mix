import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser, updateUser } from "../redux/actions/actions";
import { Link } from "react-router-dom";

export function UsersManagement() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);

    const [editData, setEditData] = useState({ id: "", username: "", email: "" });
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    const handleEditClick = (u) => {
        setEditData(u);
        setShowEditForm(true);
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(editData.id, editData));
        setShowEditForm(false);
    };

    return (
        <div className="user-content">
            <nav>
                <Link to="/admin/dashboard" className="dashboard-btn">🏠 Volver al Panel</Link>
            </nav>
            <h2>Gestión de Usuarios</h2>
            <ul className="user-list">
                {users.map((u) => (
                    <li key={u.id} className='user-item'>
                        <span>{u.username}</span> <span> {u.email}</span>
                        <button onClick={() => handleEditClick(u)} className='edit-btn-user' >Editar</button>
                        <button onClick={() => handleDelete(u.id)} className='delete-btn-user' >Eliminar</button>
                    </li>
                ))}
            </ul>

            {showEditForm && (
                <form onSubmit={handleEditSubmit} className='edit-form-user'>
                    <h3>Editar Usuario</h3>
                    <input
                        type="text"
                        name="username"
                        value={editData.username}
                        onChange={handleEditChange}
                    />
                    <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleEditChange}
                    />
                    <input
                        type="password"
                        name="password"
                        value={editData.password}
                        onChange={handleEditChange}
                    />
                    <button type="submit">Guardar Cambios</button>
                </form>
            )}
        </div>
    );
}
export default UsersManagement
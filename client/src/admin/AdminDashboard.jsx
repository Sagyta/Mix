import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin, createCategory, createNews, createUser, getCategories } from "../redux/actions/actions";
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/AdminDashboard.css"; // Asegúrate de que este archivo exista

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Estado para controlar qué formulario se muestra
    const [activeForm, setActiveForm] = useState(null);

    // Estados para manejar los datos de los formularios
    const [newCategory, setNewCategory] = useState("");
    const [newNews, setNewNews] = useState({ 
        title: "", text: "", subtitle:"", image: "", videoLink:"",  categoryId: "" });
    const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
    const user = useSelector(state=> state.user);
    const categories= useSelector((state)=> state.category)//agregue

    useEffect(()=>{
        dispatch(getCategories());
    }, [dispatch])  // ----agregue todo
    console.log("Categorías en Redux:", categories);

    //console.log('User que recibe el dashboard:', user);  

    // Manejadores para crear elementos
    const handleCreateCategory = () => {
        dispatch(createCategory(newCategory));
        setNewCategory("");
        setActiveForm(null);
    };

    const handleCreateNews = () => {
        if (!user || !user.id) {
            console.error('Error: no se pudo obtener el userId');
            return;
        }
        dispatch(createNews(newNews, user.id));
        setNewNews({ title: "", text: "", categoryId: "", subtitle:"", image:"", videoLink:"" });
        setActiveForm(null);
    };

    const handleCreateUser = () => {
        dispatch(createUser(newUser));
        setNewUser({ username: "", email: "", password: "" });
        setActiveForm(null);
    };

    // Cerrar sesión
    const handleLogout = () => {
        dispatch(logoutAdmin());
        navigate("/admin/login");
    };

    return (
        <div className="admin-container">
            {/* Menú lateral */}
            <nav className="admin-sidebar">
                <h2>Panel de Administración</h2>
                <ul>
                    <li>
                        <NavLink to="/admin/news">Gestión de Noticias</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/category">Gestión de Categorias</NavLink>                        
                    </li>
                    <li>
                        <NavLink to="/admin/comments">Gestión de Comentarios</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/users">Gestión de Usuarios</NavLink>
                    </li>
                </ul>

                {/* Botones para abrir formularios */}
                <h3>Crear Nuevo</h3>
                <button className="sidebar-crear" onClick={() => setActiveForm("category")}>Categoría</button>
                <button className="sidebar-crear" onClick={() => setActiveForm("news")}>Noticia</button>
                <button className="sidebar-crear" onClick={() => setActiveForm("user")}>Usuario</button>
                {user ? <p>Bienvenido, {user.username}</p> : <p>Cargando...</p>}
                <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
            </nav>

            {/* Contenido principal */}
            <div className="admin-content">
                <h3>Bienvenido al Panel de Administración</h3>
                <p>Selecciona una opción del menú lateral o crea un nuevo elemento.</p>

                {/* Renderizar formularios según el botón seleccionado */}
                {activeForm === "category" && (
                    <div className="form-container">
                        <h3>Crear Categoría</h3>
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="Nombre de la categoría"
                        />
                        <div className="button-group">
                        <button onClick={handleCreateCategory}>Crear Categoría</button>
                        <button onClick={() => setActiveForm(null)}>Cancelar</button>  
                        </div>                      
                    </div>
                )}

                {activeForm === "news" && (
                    <div className="form-container">
                        <h3>Crear Noticia</h3>
                        <input
                            type="text"
                            value={newNews.title}
                            onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                            placeholder="Título de la noticia"
                        />
                        <input
                            type="text"
                            value={newNews.subtitle}
                            onChange={(e) => setNewNews({ ...newNews, subtitle: e.target.value })}
                            placeholder="Subtítulo de la noticia"
                        />
                        <textarea
                            value={newNews.text}
                            onChange={(e) => setNewNews({ ...newNews, text: e.target.value })}
                            placeholder="Contenido de la noticia"
                        />
                        <input
                            type="text"
                            value={newNews.image}
                            onChange={(e) => setNewNews({ ...newNews, image: e.target.value })}
                            placeholder="Link de imagen"
                        />
                        <input
                            type="text"
                            value={newNews.videoLink}
                            onChange={(e) => setNewNews({ ...newNews, videoLink: e.target.value })}
                            placeholder="Link del video"
                        />                       
                        <select
                            value={newNews.categoryId}
                            onChange={(e)=> setNewNews({...newNews, categoryId: e.target.value})}
                        >
                            <option value=''>Selecciona una categoria</option>
                            {categories?.map((cat)=>(
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>

                        <div className="button-group">
                        <button onClick={handleCreateNews}>Crear Noticia</button>
                        <button onClick={() => setActiveForm(null)}>Cancelar</button>
                        </div>
                    </div>
                )}

                {activeForm === "user" && (
                    <div className="form-container">
                        <h3>Crear Usuario</h3>
                        <input
                            type="text"
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                            placeholder="Nombre de usuario"
                        />
                        <input
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            placeholder="Correo electrónico"
                        />
                        <input
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            placeholder="Contraseña"
                        />
                        <div className="button-group">
                        <button onClick={handleCreateUser}>Crear Usuario</button>
                        <button onClick={() => setActiveForm(null)}>Cancelar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;


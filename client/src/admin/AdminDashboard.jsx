import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin, createCategory, createNews,  getCategories, createAds, createAdsBanner } from "../redux/actions/actions";
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/AdminDashboard.css";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
    
        if (!token || !user) {
            navigate("/admin/login");
        }
    }, [navigate]);

    const [activeForm, setActiveForm] = useState(null);
    const [newCategory, setNewCategory] = useState("");
    const [newNews, setNewNews] = useState({ 
        title: "", volanta: "", text: "", subtitle:"", image: "", videoLink:"",  categoryId: "" });
    const [newAd, setNewAd] = useState({ image: "" });
    const [newAdBan, setNewAdBan] = useState({image: ""});
    const user = useSelector(state => state.user);
    const categories = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

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
        setNewNews({ title: "", volanta: "", subtitle:"", text: "", image:"", videoLink:"", categoryId: "" });
        setActiveForm(null);
    };

    const handleCreateAd = () => {
        const formData = {
            name: newAd.name,
            image: newAd.image,
        };        
        dispatch(createAds(formData));
        setNewAd({ image: "", name: "" });
        setActiveForm(null);
    };

    const handleCreateAdBanner = () => {
        dispatch(createAdsBanner(newAdBan));
        setNewAdBan({ image: "" });
        setActiveForm(null);
    };

    const handleLogout = () => {
        dispatch(logoutAdmin());
        navigate("/admin/login");
    };

    return (
        <div className="admin-container">
            <nav className="admin-sidebar">
                <h2>Panel de Administración</h2>
                <ul>
                    <li>
                        <NavLink to="/admin/news">Gestión de Noticias</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/category">Gestión de Categorías</NavLink>                        
                    </li>
                    <li>
                        <NavLink to="/admin/comments">Gestión de Comentarios</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/ads">Gestión Ads Lateral</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/adsbanner">Gestión Ads Banner</NavLink>
                    </li>
                </ul>

                <h3>Crear Nuevo</h3>
                <button className="sidebar-crear" onClick={() => setActiveForm("category")}>Categoría</button>
                <button className="sidebar-crear" onClick={() => setActiveForm("news")}>Noticia</button>
                <button className="sidebar-crear" onClick={() => setActiveForm("ads")}>Ads Lateral</button>
                <button className="sidebar-crear" onClick={() => setActiveForm("adsban")}>Ads Banner</button>
                {user ? <p>Bienvenido, {user.username}</p> : <p>Cargando...</p>}
                <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
            </nav>

            <div className="admin-content">
                <h3>Bienvenido al Panel de Administración</h3>
                <p>Selecciona una opción del menú lateral o crea un nuevo elemento.</p>

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
                            value={newNews.volanta}
                            onChange={(e) => setNewNews({ ...newNews, volanta: e.target.value })}
                            placeholder="Volanta de la noticia"
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
                            disabled={false}
                        />                       
                        <select
                            value={newNews.categoryId}
                            onChange={(e)=> setNewNews({...newNews, categoryId: e.target.value})}
                        >
                            <option value=''>Selecciona una categoría</option>
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

                {activeForm === "ads" && (
                    <div className="form-container">
                        <h3>Crear Publicidad</h3>

                        {/* Input para el nombre de la publicidad */}
                        <input
                            type="text"
                            placeholder="Nombre de la publicidad"
                            value={newAd.name}
                            onChange={(e) => setNewAd({ ...newAd, name: e.target.value })}
                        />

                        {/* Input para el link de la publicidad */}
                        <input
                            type="text"
                            placeholder="Link de la publicidad"
                            value={newAd.image}
                            onChange={(e) => setNewAd({ ...newAd, image: e.target.value })}
                        />

                        <div className="button-group">
                            {/* Botón para enviar el link */}
                            <button onClick={handleCreateAd}>Crear Publicidad</button>
                            <button onClick={() => setActiveForm(null)}>Cancelar</button>
                        </div>
                    </div>
                )}

                {activeForm === "adsban" && (
                    <div className="form-container">
                        <h3>Crear Publicidad</h3>
                        {/* Input para cargar imagen */}
                            <input
                             type="file"
                             onChange={(e) => setNewAdBan({ image: e.target.files[0] })}
                            />
                        <div className="button-group">
                        {/* Botón para enviar la imagen */}
                        <button onClick={handleCreateAdBanner}>Crear Publicidad</button>
                        <button onClick={() => setActiveForm(null)}>Cancelar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;

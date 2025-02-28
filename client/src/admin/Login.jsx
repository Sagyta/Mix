import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import '../css/Login.css';

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, isAdmin, error } = useSelector(state => state);
    

    useEffect(() => {
       console.log("isAuthenticated:", isAuthenticated);  // Verifica el estado de autenticación
       console.log("isAdmin:", isAdmin);
       console.log('error', error)
        if (isAuthenticated) {
            if (isAdmin) {
                // Redirigir al dashboard si es admin
                console.log("Redirigiendo al dashboard...");
                navigate("/admin/dashboard");
            } else {
                // Mostrar alerta si no es admin
                alert("No tienes permisos para acceder aquí");
                // Redirigir al login si no es admin
                navigate("/admin/login");
            }
        }
    }, [isAuthenticated, isAdmin, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAdmin(username, password));
    };

    return (
        <div className="main-Login">
            <div className="contenedor-login">
                <h2>Login Admin</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default AdminLogin;

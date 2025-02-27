import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Verifica la autenticación
    const isAdmin = useSelector((state) => state.auth.isAdmin); // Verifica si es admin

    return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
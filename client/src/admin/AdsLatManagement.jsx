import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAds, deleteAds } from "../redux/actions/actions";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
//import "../css/AdsManagement.css"; // Asegúrate de crear un archivo CSS para mejorar el diseño

export function AdsManagement() {
    const dispatch = useDispatch();
    const ads = useSelector((state) => state.ads); 

    const [reload, setReload] = useState(false);

    useEffect(() => {
        dispatch(getAds());
    }, [dispatch, reload]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            dispatch(deleteAds(id));
            Swal.fire("Eliminado!", "El anuncio ha sido eliminado.", "success");
            setReload(prev => !prev);
        }
    };

    const baseUrl = "https://mix-7emk.onrender.com"; 

    return (
        <div className="ads-management">
            <nav>
                <Link to="/admin/dashboard" className="dashboard-btn">🏠 Volver al Panel</Link>
            </nav>
            <h2>Gestión de Publicidad</h2>
            <ul className="ads-list">
            {Array.isArray(ads) && ads.length > 0 ? (
                    ads.map((ad) => (
                        <li key={ad.id} className="ads-item">
                            <img src={`${baseUrl}/${ad.image}`} alt="Anuncio" className="ads-preview" />
                            <button onClick={() => handleDelete(ad.id)} className="delete-btn-ads">
                                Eliminar
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No hay anuncios disponibles</p>
                )}
            </ul>
        </div>
    );
}

export default AdsManagement;

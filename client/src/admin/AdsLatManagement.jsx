import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAds, deleteAds } from "../redux/actions/actions";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export function AdsLatManagement() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            setReload((prev) => !prev);
        }
    };

    const baseUrl = process.env.REACT_APP_API_URL;

    return (
        <div className="ads-lat-management">
            <nav>
                <Link to="/admin/dashboard" className="dashboard-btn">🏠 Volver al Panel</Link>
            </nav>
            <h2>Gestión de Publicidad Lateral</h2>
            <ul className="ads-list">
                {Array.isArray(ads) && ads.length > 0 ? (
                    ads.map((ad) => (
                        <li key={ad.id} className="ads-item">
                            <img src={ad.image} alt="Anuncio" className="ads-preview" />
                            <div className="ads-actions">
                                <button onClick={() => handleDelete(ad.id)} className="delete-btn-ads">
                                    Eliminar
                                </button>
                                <Link to={`/admin/edit-ad/${ad.id}`} className="edit-btn-ads">
                                    Editar
                                </Link>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No hay anuncios disponibles</p>
                )}
            </ul>
        </div>
    );
}

export default AdsLatManagement;

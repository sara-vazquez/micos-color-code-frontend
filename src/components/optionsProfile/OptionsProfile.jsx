import React, { useState } from "react";
import './OptionsProfile.css';
import { logoutUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function OptionsProfile({ onEditProfile, onClose }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoading(true);

        try {
            await logoutUser();
            navigate("/login");
        } catch {
            navigate("/login");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        onEditProfile(); //opens edit modal
        onClose(); //closes options profile modal
    };

    return(
        <div className="options-profile__overlay" onClick={onClose}>
            <section className="options-profile" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
                <article className="options-profile__actions">
                    <button type="button" className="options-profile__link" aria-label="botón para editar perfil" onClick={handleEdit} disabled={loading}>Editar perfil</button>
                    <button type="button" className="options-profile__link" onClick={handleLogout} disabled={loading}>{loading ? '⏳ Cerrando sesión...' : 'Cerrar sesión'}</button>
                </article>
            </section>
        </div>
    );
}
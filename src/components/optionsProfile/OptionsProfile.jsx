import React from "react";
import './OptionsProfile.css';

export default function OptionsProfile({ onGoToEdit, onGoToLogout, onClose }) {
    return(
        <div className="options-profile__overlay" onClick={onClose}>
            <section className="options-profile" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
                <article className="options-profile__actions">
                    <button type="button" className="options-profile__link" aria-label="botón para editar perfil" onClick={onGoToEdit}>Editar perfil</button>
                    <button type="button" className="options-profile__link" onClick={onGoToLogout}>Cerrar sesión</button>
                </article>
            </section>
        </div>
    );
}
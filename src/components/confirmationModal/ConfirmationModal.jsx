import React from "react";
import { useNavigate } from "react-router-dom";
import './ConfirmationModal.css';
import Button from "../buttons/Button";

export default function ConfirmationModal({onClose}) {
    const navigate = useNavigate();
    const goToPlayPage = () => { navigate("/users/play") }
    return(
        <div className="confirmation-modal__overlay">
            <main className="confirmation-modal">

                <section className="confirmation-modal__content">
                    <h3 className="confirmation-modal__title">¿Quieres irte ya?</h3>
                    <p className="confirmation-modal__text">Si te vas ahora, perderás los datos de esta partida 😔</p>
                </section>

                <section className="confirmation-modal__actions">
                <Button variant="secondary" aria-label="botón para salir de la partida" onClick={goToPlayPage}>SALIR</Button>
                <Button variant="primary" aria-label="botón para continuar la partida" onClick={onClose}>QUEDARME</Button>
                </section>

            </main>
        </div>
    );
}
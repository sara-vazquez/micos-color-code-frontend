import React from "react";
import './ConfirmationModal.css';
import Button from "../buttons/Button";

export default function ConfirmationModal() {
    return(
        <div className="confirmation-modal__overlay">
            <section className="confirmation-modal">

                <article className="confirmation-modal__content">
                    <h3 className="confirmation-modal__title">¿Quieres irte ya?</h3>
                    <p className="confirmation-modal__text">Si te vas ahora, perderás los datos de esta partida 😔</p>
                </article>

                <article className="confirmation-modal__actions">
                <Button variant="secondary" aria-label="botón para salir de la partida">SALIR</Button>
                <Button variant="primary" aria-label="botón para continuar la partida">QUEDARSE</Button>
                </article>
                
            </section>
        </div>
    );
}
import React from 'react';
import './InfoModal.css';

export default function InfoModal() {
    return(
        <section className="info-modal">
            <article className="info-modal__header">
                <h1 className="info-modal__title">👋 Bienvenidos a Micos Color Code</h1>
                <p className="info-modal__body">Esta web está pensada para acompañar a niños y niñas con daltonismo dicromático en el aprendizaje de los colores de una manera lúdica, visual y sencilla. Aquí encontraréis juegos, recursos y explicaciones que podéis compartir y disfrutar juntos.</p>
            </article>
        </section>
    )
}
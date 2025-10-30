import React from 'react';
import './InfoModal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export default function InfoModal({onClose}) {
    return(
        <div className="info-modal__overlay" onClick={onClose}>
        <section className="info-modal">
            <article className="info-modal__header">
                <button className="info-modal__exit" aria-label="botón para cerrar la guía de uso">
                    <FontAwesomeIcon icon={faXmark} onClick={onClose}/>
                </button>
            </article>
            <article classNae="info-modal__content">
                <h1 className="info-modal__title" aria-label="consejos de uso">📚 Consejos de uso</h1>
                    <p className="info-modal__body">Esta web está pensada para acompañar a niños y niñas con daltonismo dicromático en el aprendizaje de los colores de una manera <strong>lúdica, visual y sencilla.</strong> Aquí encontraréis juegos, recursos y explicaciones que podéis compartir y disfrutar juntos.</p>
                <h2 className="info-modal__subtitle">🎨 Cómo funciona</h2>
                    <p className="info-modal__body">
                        <ul className="info-modal__list">
                            <li><strong>Formas y colores:</strong> cada color está representado por una figura geométrica, lo que facilita que los niños lo identifiquen sin confusiones.</li>
                            <li><strong>Sistema paso a paso:</strong> se empieza con los colores primarios y se avanza hacia secundarios, claros y oscuros.</li>
                            <li><strong>Material visual:</strong> todo el contenido está reforzado con ilustraciones para que la experiencia sea clara y divertida.</li>
                        </ul>
                    </p>
                <h2 className="info-modal__subtitle">👶 Acompañando al peque</h2>
                    <p className="info-modal__body">
                        <ul className="info-modal__list">
                            <li><strong>Explorad juntos:</strong> anima al/la peque a navegar por las secciones y descubrir cómo las formas se relacionan con los colores.</li>
                            <li><strong>Jugad en voz alta:</strong> pregúntale “¿qué forma ves?” o “¿qué color representa esta figura?” para reforzar el aprendizaje.</li>
                            <li><strong>Sin presión:</strong> cada niño avanza a su ritmo; lo importante es que se divierta y vaya ganando confianza.</li>
                        </ul>
                    </p>
                <h2 className="info-modal__subtitle">🧩 Consejos prácticos</h2>
                    <p className="info-modal__body">
                        <ul className="info-modal__list">
                            <li><strong>Sesiones cortas:</strong> 10–15 minutos de práctica son suficientes para mantener la atención.</li>
                            <li><strong>Repetición positiva:</strong> repetir los mismos juegos o ejemplos ayudará a fijar la asociación.</li>
                            <li><strong>Aplicadlo fuera de la pantalla:</strong> usad objetos reales de colores (bloques, juguetes, ropa), junto con los materiales gráficos de la sección "recursos" para reforzar lo aprendido.</li>
                        </ul>
                    </p>
                <h2 className="info-modal__subtitle">🤝 Nuestro objetivo</h2>
                    <p className="info-modal__body">El fin de Micos es <strong>favorecer la inclusión</strong> y dar herramientas gratuitas a las familias para que los niños con daltonismo puedan aprender los colores de manera más <strong>accesible y divertida.</strong></p>
            </article>
        </section>
        </div>
    )
}
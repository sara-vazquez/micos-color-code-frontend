import React from 'react';
import './InfoModal.css';

export default function InfoModal({onClose}) {
    return(
        <div className="info-modal__overlay" onClick={onClose}>
        <section className="info-modal">
            <article className="info-modal__header">
                <h2 className="info-modal__subtitle">👋 Bienvenidos a Micos Color Code</h2>
                    <p className="info-modal__body">Esta web está pensada para acompañar a niños y niñas con daltonismo dicromático en el aprendizaje de los colores de una manera <strong>lúdica, visual y sencilla.</strong> Aquí encontraréis juegos, recursos y explicaciones que podéis compartir y disfrutar juntos.</p>
            </article>
            <article classNae="info-modal__content">
                <h2 className="info-modal__subtitle">🎨 Cómo funciona</h2>
                    <p className="info-modal__body">
                        <li className="info-modal__list">
                            <ul><strong>Formas y colores:</strong> cada color está representado por una figura geométrica, lo que facilita que los niños lo identifiquen sin confusiones.</ul>
                            <ul><strong>Sistema paso a paso:</strong> se empieza con los colores primarios y se avanza hacia secundarios, claros y oscuros.</ul>
                            <ul><strong>Material visual:</strong> todo el contenido está reforzado con ilustraciones para que la experiencia sea clara y divertida.</ul>
                        </li>
                    </p>
                <h2 className="info-modal__subtitle">👶 Acompañando al peque</h2>
                    <p className="info-modal__body">
                        <li className="info-modal__list">
                            <ul><strong>Explorad juntos:</strong> anima al/la peque a navegar por las secciones y descubrir cómo las formas se relacionan con los colores.</ul>
                            <ul><strong>Jugad en voz alta:</strong> pregúntale “¿qué forma ves?” o “¿qué color representa esta figura?” para reforzar el aprendizaje.</ul>
                            <ul><strong>Sin presión:</strong> cada niño avanza a su ritmo; lo importante es que se divierta y vaya ganando confianza.</ul>
                        </li>
                    </p>
                <h2 className="info-modal__subtitle">🧩 Consejos prácticos</h2>
                    <p className="info-modal__body">
                        <li className="info-modal__list">
                            <ul><strong>Sesiones cortas:</strong> 10–15 minutos de práctica son suficientes para mantener la atención.</ul>
                            <ul><strong>Repetición positiva:</strong> repetir los mismos juegos o ejemplos ayudará a fijar la asociación.</ul>
                            <ul><strong>Aplicadlo fuera de la pantalla:</strong> usad objetos reales de colores (bloques, juguetes, ropa), junto con los materiales gráficos de la sección "recursos" para reforzar lo aprendido.</ul>
                        </li>
                    </p>
                <h2 className="info-modal__subtitle">🤝 Nuestro objetivo</h2>
                    <p className="info-modal__body">El fin de Micos es <strong>favorecer la inclusión</strong> y dar herramientas gratuitas a las familias para que los niños con daltonismo puedan aprender los colores de manera más <strong>accesible y divertida.</strong></p>
            </article>
        </section>
        </div>
    )
}
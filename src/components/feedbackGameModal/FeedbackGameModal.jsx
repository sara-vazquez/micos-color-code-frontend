import React from "react";
import './FeedbackGameModal.css'
import Button from "../buttons/Button";

export default function FeedbackGameModal({onRankingChart}) {
    const handleOpenRanking = () => {
        onRankingChart();
        onclose();
    }
    return(
        <div className="feedback-game__overlay">
            <main className="feedback-game">
                <section className="feedback-game__content">
                    <h2 className="feedback-game__title">¡BIEN HECHO! 🎉</h2>
                    <article className="feedback-game__text">
                        <p><strong>Puntuación:</strong> {currentUser.points}</p>
                        <p><strong>Puntuación total:</strong> {currentUser.totalPoints}</p>
                    </article>
                </section>
                <section className="feedback-game__actions">
                    <Button type= "button" variant="primary" aria-label="botón para jugar de nuevo">JUGAR DE NUEVO</Button>
                    <Button type= "button" variant="secondary" aria-label="botón para ver la clasificación" onClick={handleOpenRanking}>VER CLASIFICACIÓN</Button>
                </section>
            </main>
        </div>
    );
}
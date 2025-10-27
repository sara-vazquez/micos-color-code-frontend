import React from "react";
import './FeedbackGameModal.css'
import Button from "../buttons/Button";

export default function FeedbackGameModal({sessionPoints, totalPoints, onPlayAgain, onRankingChart}) {
    const handleOpenRanking = () => {
        onRankingChart();
    }

    return(
        <div className="feedback-game__overlay">
            <main className="feedback-game">
                <section className="feedback-game__content">
                    <h2 className="feedback-game__title">¡BIEN HECHO! 🎉</h2>
                    <article className="feedback-game__text">
                        <p aria-label="puntos de la partida actual"><strong>Puntuación:</strong> {sessionPoints}</p>
                        <p aria-label="puntos totales"><strong>Puntuación total:</strong> {totalPoints}</p>
                    </article>
                </section>
                <section className="feedback-game__actions">
                    <Button type= "button" variant="primary" aria-label="botón para jugar de nuevo"  onClick={onPlayAgain}>JUGAR DE NUEVO</Button>
                    <Button type= "button" variant="secondary" aria-label="botón para ver la clasificación" onClick={handleOpenRanking}>VER CLASIFICACIÓN</Button>
                </section>
            </main>
        </div>
    );
}
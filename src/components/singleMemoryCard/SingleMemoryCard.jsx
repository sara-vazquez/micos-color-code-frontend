import React from "react";
import './SingleMemoryCard.css';

export default function SingleMemoryCard({card}) {
    return(
        <main className="memory-card">
            <section>
                <img  className="memory-card__front" src={card.src} alt="cara de arriba de la carta"/>
                <img className="memory-card__back" src="/img/cover.png" alt="cara de abajo de la carta"/>
            </section>
        </main>
    );
}
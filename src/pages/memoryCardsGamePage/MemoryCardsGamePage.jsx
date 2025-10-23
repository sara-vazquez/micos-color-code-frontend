import React from 'react';
import './MemoryCardsGamePage.css';

export default function MemoryCardsGamePage() {
    const cardImages = [{
        
    }]

    //function that duplicates cards
    const shuffleCards = () => {
        const shuffleCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()})) //generates id card
    }
    return(
        <main className="memory-cards__page">

        </main>
    );
}
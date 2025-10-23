import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './MemoryCardsGamePage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";

export default function MemoryCardsGamePage() {
    const navigate = useNavigate();
    const [isVolumeOn, setIsVolumeOn] = useState(true);
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)

    const handleBack = () => {
        navigate(-1);
    }

    // Volume 
    const toggleVolume = () => {
        setIsVolumeOn(prev => !prev);
    };
    const ariaLabelText = isVolumeOn ? "Botón para silenciar el sonido" : "Botón para activar el sonido";

    // Cards
    const cardImages = [{
        
    }]

    //function that duplicates cards
    const shuffleCards = () => {
        const shuffleCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()})) //generates id card

        setCards(shuffleCards)
        setTurns(0) //reset the turn back to 0 when user click de button "play again"
    }
    return(<>
        <header className="memory-cards__header">
            <button className="memory-card__back" aria-label="botón para volver atrás" onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft}/>
            </button>
            <h1 className="memory-cards__title">Memoriza la carta</h1>
            <button className="memory-card__volume" aria-label={ariaLabelText} onClick={toggleVolume}>
                <FontAwesomeIcon icon={isVolumeOn ? faVolumeHigh : faVolumeXmark}/>
            </button>

        </header>
        <main className="memory-cards__page">

        </main>
        </>
    );
}
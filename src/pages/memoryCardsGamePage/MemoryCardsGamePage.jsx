import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './MemoryCardsGamePage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import SingleMemoryCard from '../../components/singleMemoryCard/SingleMemoryCard';

export default function MemoryCardsGamePage() {
    const navigate = useNavigate();
    const [isVolumeOn, setIsVolumeOn] = useState(true);
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null); /* user chooses the first card for pairing */
    const [choiceTwo, setChoiceTwo] = useState(null); /* user chooses the second card for pairing */


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

    // function that duplicates cards
    const shuffleCards = () => {
        const shuffleCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()})) //generates id card

        setCards(shuffleCards)
        setTurns(0) // reset the turn back to 0 when user click de button "play again"
    }

    // handle a choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // compare 2 selected cards
    useEffect(() => {
        if(choiceOne && choiceTwo) {
            if(choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if(card.src === choiceOne.src) {
                            return {...card, matched: true}
                        } else {
                            return card
                        }
                    })
                })
                resetTurn()
            } else {
                setTimeout(() =>resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    // reset choices & increase turn
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
    }

    return(<>
        <header className="memory-cards__header">
            <article className='memory-cards__main-header'>
                <button className="memory-card__back" aria-label="botón para volver atrás" onClick={handleBack}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>
                <h1 className="memory-cards__title">Memoriza la carta</h1>
                <button className="memory-card__volume" aria-label={ariaLabelText} onClick={toggleVolume}>
                    <FontAwesomeIcon icon={isVolumeOn ? faVolumeHigh : faVolumeXmark}/>
                </button>
            </article>
            <article className='memory-cards__info'>
                <p className="memory-cards__level">NIVEL {level}</p>
                <p className="memory-cards__timer">0:00</p> {/* ARREGLAR ESTE CRONO */}
            </article>
        </header>
        <main className="memory-cards__grid">
            {cards.map(card => (
                <SingleMemoryCard 
                    key={card.id} 
                    card={card} 
                    handleChoice={handleChoice}
                    flipped={card === choiceOne || card === choiceTwo || card.matched}/>
            ))}  
        </main>
        </>
    );
}
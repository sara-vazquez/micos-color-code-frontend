import React, {useEffect, useState, useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import './MemoryCardsGamePage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import SingleMemoryCard from '../../components/singleMemoryCard/SingleMemoryCard';
import {LEVELS} from '../../constants/gameConfig';

export default function MemoryCardsGamePage() {
    const navigate = useNavigate();

    const [isVolumeOn, setIsVolumeOn] = useState(true);
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null); /* user chooses the first card for pairing */
    const [choiceTwo, setChoiceTwo] = useState(null); /* user chooses the second card for pairing */
    const [disabled, setDisabled] = useState(false);

    // Level
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const currentLevel = LEVELS[currentLevelIndex];

    // Preview de cards
    const [showPreview, setShowPreview] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    
    // Crono
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    // Levels
    const [level, setLevel] = useState(1);
    const [gameStarted, setGameStarted] = useState(false);

    // Overlays (feedback and ranking)
    const [showResultModal, setShowResultModal] = useState(false);
    const [rankingChartModal, setRankingChartModal] = useState(null);

    const GAME_ID = 1;
    
    const handleBack = () => {
        navigate(-1);
    }

    // Volume 
    const correctSound = useMemo(() => new Audio("/audio/correct.wav"), []);

    const playCorrectSound = () => {
        if(isVolumeOn) {
            correctSound.currentTime = 0;
            correctSound.play();
        }
    };

    const toggleVolume = () => {
        setIsVolumeOn(prev => !prev);
    };
    const ariaLabelText = isVolumeOn ? "Botón para silenciar el sonido" : "Botón para activar el sonido";

    // Crono - format time
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Crono
    useEffect(() => {
        if (isRunning && timeRemaining > 0) {
            timerRef.current = setInterval(() => {
                setTimeRemaining(prevTime => {
                    if (prevTime <= 1) {
                        setIsRunning(false);
                        handleGameOver(); 
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isRunning, timeRemaining]);

    // Cards
    const cardImages = [
        {"src": "/img/sun.png"},
        {"src": "/img/watermelon.png"},
        {"src": "/img/flower.png"}
    ]

    // function that duplicates cards and mix them
    const shuffleCards = () => {
        const levelImages = allCardImages.slice(0, currentLevel.pairs);
        const shuffledCards = [...levelImages, ...levelImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()}));
        
        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);
        setTimeRemaining(currentLevel.timeLimitSeconds);
        setIsRunning(false);
        setGameStarted(false);
        
        // Show preview if level has 
        if (currentLevel.previewTimeSeconds > 0) {
            setShowPreview(true);
            setDisabled(true);
         
            // Hide preview after delay
            setTimeout(() => {
                setShowPreview(false);
                setDisabled(false);
            }, currentLevel.previewTimeSeconds * 1000);
        }
    };

    // handle a choice
    const handleChoice = (card) => {
        if (!gameStarted && !showPreview) {
            setIsRunning(true);
            setGameStarted(true);
        }

        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };


    // compare 2 selected cards
    useEffect(() => {
        if(choiceOne && choiceTwo) {
            setDisabled(true);
            if(choiceOne.src === choiceTwo.src) {
                playCorrectSound();
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if(card.src === choiceOne.src) {
                            return {...card, matched: true};
                        } else {
                            return card;
                        }
                    });
                });
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    // reset choices & increase turn
    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
    }

    // Game Over (time)
    const handleGameOver = async () => {
        setIsRunning(false);
        
        const points = 0;
        const timeUsed = currentLevel.timeLimitSeconds - timeRemaining;

        try {
            const result = await gameSessionService.completeSession(
                GAME_ID,
                points,
                timeUsed
            );
            
            setGameResult({
                sessionPoints: result.sessionPoints,
                totalPoints: result.newTotalPoints,
                turns: turns,
                timeUsed: timeUsed,
                completed: false
            });
            setShowResultModal(true);
        } catch (error) {
            console.error('Error al guardar partida:', error);
            alert(error.message);
            
            if (error.message.includes('No autorizado')) {
                navigate('/login');
            }
        }
    };

    // Verify if game is over (win)
    useEffect(() => {
        const checkGameComplete = async () => {
            if (cards.length > 0 && cards.every(card => card.matched)) {
                setIsRunning(false);
                
                const timeUsed = currentLevel.timeLimitSeconds - timeRemaining;
                
                const basePoints = 1000;
                const timeBonus = timeRemaining * 5;
                const turnPenalty = turns * 10;
                const levelBonus = currentLevel.id * 100;
                const points = Math.max(0, basePoints + timeBonus - turnPenalty + levelBonus);

                try {
                    const result = await gameSessionService.completeSession(
                        GAME_ID,
                        Math.round(points),
                        timeUsed
                    );
                    
                    setGameResult({
                        sessionPoints: result.sessionPoints,
                        totalPoints: result.newTotalPoints,
                        turns: turns,
                        timeUsed: timeUsed,
                        completed: true
                    });
                    setShowResultModal(true);

                    if (currentLevelIndex < LEVELS.length - 1) {
                        setCurrentLevelIndex(prev => prev + 1);
                    }
                } catch (error) {
                    console.error('Error al guardar partida:', error);
                    alert(error.message);
                    
                    if (error.message.includes('No autorizado')) {
                        navigate('/login');
                    }
                }
            }
        };

        checkGameComplete();
    }, [cards, timeRemaining, turns, currentLevelIndex, navigate]);

    //game starts automatically
    useEffect(() => {
        shuffleCards();
    }, [currentLevelIndex]);

    const handlePlayAgain = () => {
        setShowResultModal(false);
        shuffleCards();
    };

    const handleViewRanking = () => {
        navigate('/ranking/memory-cards');
    };

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
                <p className="memory-cards__level">NIVEL {currentLevel.id}</p>
                <p className={`memory-cards__timer ${timeRemaining <= 10 ? 'memory-cards__timer--warning' : ''}`}>{formatTime(timeRemaining)}</p>
            </article>
        </header>
        <main className={`memory-cards__grid memory-cards__grid--${currentLevel.grid}`}>
            {cards.map(card => (
                <SingleMemoryCard 
                    key={card.id} 
                    card={card} 
                    handleChoice={handleChoice}
                    flipped={card === choiceOne || card === choiceTwo || card.matched || showPreview}
                    disabled={disabled}/>
            ))}  
        </main>
        </>
    );
}
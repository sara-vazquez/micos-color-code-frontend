import React, {useEffect, useState, useMemo, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './MemoryCardsGamePage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import SingleMemoryCard from '../../components/singleMemoryCard/SingleMemoryCard';
import RankingChart from '../../components/rankingChart/RankingChart';
import FeedbackGameModal from '../../components/feedbackGameModal/FeedbackGameModal';
import ConfirmationModal from '../../components/confirmationModal/ConfirmationModal';
import {LEVELS} from '../../constants/gameConfig';
import { gameSessionService } from '../../services/gameSessionService';
import { rankingService } from '../../services/rankingService';

export default function MemoryCardsGamePage() {
    const navigate = useNavigate();

    const [isVolumeOn, setIsVolumeOn] = useState(true);
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);

    // Level
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [isLoadingLevel, setIsLoadingLevel] = useState(true);
    const currentLevel = LEVELS[currentLevelIndex];

    // Preview de cards
    const [showPreview, setShowPreview] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    
    // Cronómetro
    const [timeRemaining, setTimeRemaining] = useState(currentLevel.timeLimitSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    // Overlays (confirmation, feedback and ranking)
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [showRankingChart, setShowRankingChart] = useState(false);
    const [sessionResult, setSessionResult] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const GAME_ID = 1;

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

    // Load current level from back
    useEffect(() => {
        const loadCurrentLevel = async () => {
            try {
                setIsLoadingLevel(true);
                const data = await rankingService.getRanking(GAME_ID);
                const levelFromBackend = data.currentLevel || 1;
                setCurrentLevelIndex(levelFromBackend - 1); 
            } catch (error) {
                console.error('Error al cargar nivel:', error);
                setCurrentLevelIndex(0); 
            } finally {
                setIsLoadingLevel(false);
            }
        };

        loadCurrentLevel();
    }, []);

    // Crono - time remaining
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

    const allCardImages = [
        {"src": "/img/sun.png"},
        {"src": "/img/watermelon.png"},
        {"src": "/img/flower.png"},
    ];

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

    // Reset turn
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
                timeUsed,
                currentLevel.id,
                false
            );
            
            setSessionResult({
                sessionPoints: result.sessionPoints,
                totalPoints: result.newTotalPoints
            });
            
            setCurrentLevelIndex(result.currentLevel - 1);
            
            setShowFeedbackModal(true);
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
                        timeUsed,
                        currentLevel.id,
                        true 
                    );
                    
                    setSessionResult({
                        sessionPoints: result.sessionPoints,
                        totalPoints: result.newTotalPoints
                    });
                    
                    setCurrentLevelIndex(result.currentLevel - 1);
                    
                    setShowFeedbackModal(true);
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
    }, [cards]);

    // Init game when level changes
    useEffect(() => {
        shuffleCards();
    }, [currentLevelIndex]);

    const handleOpenConfirmation = () => {
        setShowConfirmationModal(true);
    }

    const handleCloseConfirmation = () => {
        setShowConfirmationModal(false);
    };

    const handlePlayAgain = () => {
        setShowFeedbackModal(false);
        setShowRankingChart(false);
        shuffleCards();
    };

    const handleOpenRanking = () => {
        setShowFeedbackModal(false);
        setShowRankingChart(true);
    };

    if (isLoadingLevel) {
        return <div className="memory-cards__message">Cargando nivel...</div>;
    }

    return(
        <div className="memory-cards">
        <header className="memory-cards__header">
                <button className="memory-cards__back" aria-label="botón para volver atrás" onClick={handleOpenConfirmation}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>
                <h1 className="memory-cards__title">Memoriza la carta</h1>
                <button className="memory-cards__volume" aria-label={ariaLabelText} onClick={toggleVolume}>
                    <FontAwesomeIcon icon={isVolumeOn ? faVolumeHigh : faVolumeXmark}/>
                </button>
        </header>
        <section className='memory-cards__info'>
                <h3 className="memory-cards__level">NIVEL {currentLevel.id}</h3>
                <h3 className={`memory-cards__timer ${timeRemaining <= 10 ? 'memory-cards__timer--warning' : ''}`}>
                    {formatTime(timeRemaining)}
                </h3>
        </section>
        <main className="memory-cards__grid-container">
        <section className={`memory-cards__grid memory-cards__grid--${currentLevel.grid}`}>
            {cards.map(card => (
                <SingleMemoryCard 
                    key={card.id} 
                    card={card} 
                    handleChoice={handleChoice}
                    flipped={card === choiceOne || card === choiceTwo || card.matched || showPreview}
                    disabled={disabled}
                />
            ))}  
        </section>
        </main>

        {/* Confirmation modal */}
        {showConfirmationModal && <ConfirmationModal onClose={handleCloseConfirmation}/>}

        {/* Feedback game modal */}
        {showFeedbackModal && sessionResult && (
            <FeedbackGameModal
                sessionPoints={sessionResult.sessionPoints}
                totalPoints={sessionResult.totalPoints}
                onPlayAgain={handlePlayAgain}
                onRankingChart={handleOpenRanking}
            />
        )}

        {/* Ranking Chart */}
        {showRankingChart && <RankingChart onPlayAgain={handlePlayAgain}/>}
        </div>
    );
}
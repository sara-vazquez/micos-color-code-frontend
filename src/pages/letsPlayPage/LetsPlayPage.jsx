import React from 'react';
import './LetsPlayPage.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import FeedbackButton from '../../components/feedbackButtons/FeedbackButton'
import CardPlay from '../../components/cardPlay/CardPlay';
import memory from '../../assets/memory.png';


export default function LetsPlayPage() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }
    return(
        <section className="play-page" id="top">
            <header className="play-page__intro">
                <article className="play-page__header">
                <button className="play-page__back" aria-label="botón para volver a la página anterior" onClick={handleBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h1 className="play-page__title">¡A jugar!</h1>
                </article>
                <p className = "play-page__text">Aquí tienes una selección de juegos para poner en práctica lo aprendido y seguir mejorando cada día un poquito más.</p>
            </header>
            <main className="play-page__content">
                <CardPlay 
                title="Memoriza la carta"
                description="Encuentra la pareja de cada carta según sus colores y formas"
                img={memory}
                path="/users/play/memory-cards"
                />
            </main>
            <article className="feedback__flying-button">
                <FeedbackButton />
            </article>
        </section>
    );
}
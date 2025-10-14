import React from 'react';
import './LetsPlayPage.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function LetsPlayPage() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }
    return(
        <section className="play-page" id="top">
            <header className="play-page__intro">
                <article className="play-page__header">
                <button className="play-page-back" aria-label="botón para volver a la página anterior" onClick={handleBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h1 className="play-page__title">¡A jugar!</h1>
                </article>
                <p className = "play-page__text">Aquí tienes una selección de juegos para poner en práctica lo aprendido y seguir mejorando cada día un poquito más.</p>
            </header>
            <main className="play-page__content">

            </main>
        </section>
    );
}
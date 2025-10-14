import React from 'react';
import './ResourcesPage.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import FeedbackButton from '../../components/feedbackButtons/FeedbackButton';

export default function ResourcesPage() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    return(
        <section className="resources__page" id="top">
            <article className='resources__intro'>
                <article className="resources__header">
                    <button className="resources__back" aria-label="botón para volver atrás" onClick={handleBack}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </button>
                    <h1 className="resources__title" aria-label='título de la página actual'>Recursos</h1>
                </article>
                <p className='resources__text' aria-label="texto descriptivo de la página actual">Te presentamos la sección de recursos, donde podrás descargar diferentes materiales gráficos para que los peques sigan practicando mientras se manchan las manitas 🎨.</p>
            </article>
            <article className='resources__action'>
                <FeedbackButton className="feedback__flying-button" />
            </article>
        </section>
    );
}
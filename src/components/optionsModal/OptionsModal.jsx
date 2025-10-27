import React, { useState } from "react";
import './OptionsModal.css';
import InfoModal from '../infoModal/InfoModal';
import FeedbackForm from '../feedbackForm/FeedbackForm';

export default function OptionsModal({ onClose }) {
    const [showGuide, setShowGuide] = useState(false);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);

    if(showGuide) return <InfoModal onClose={onClose}/>
    if(showFeedbackForm) return <FeedbackForm onClose={onClose} />

    return(
        <div className="options-modal__overlay" onClick={onClose}>
            <section className="options-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
                <article className="options-modal__actions">
                    <button type="button" className="options-modal__link" aria-label="botón para abrir el modal con los consejos de uso" onClick={() => setShowGuide(true)}>Consejos de uso</button>
                    <button type="button" className="options-modal__link" aria-label="botón para abrir el formulario de feedback" onClick={() => setShowFeedbackForm(true)}>¡Queremos tu feedback!</button>
                </article>
            </section>
        </div>
    );
}
import React from "react";
import './OptionsModal.css';

export default function OptionsModal({ onGoToGuide, onGoToFeedback, onClose }) {
    return(
        <div className="options-modal__overlay" onClick={onClose}>
            <section className="options-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
                <article className="options-modal__actions">
                    <button type="button" className="options-modal__link" onClick={onGoToGuide}>Consejos de uso</button>
                    <button type="button" className="options-modal__link" onClick={onGoToFeedback}>¡Queremos tu feedback!</button>
                </article>
            </section>
        </div>
    );
}
import React, { useState } from "react";
import './OptionsModal.css';
import InfoModal from '../infoModal/InfoModal';

export default function OptionsModal({ onClose }) {
    const [showGuide, setShowGuide] = useState(false);

    if(showGuide) return <InfoModal onClose={onClose}/>

    return(
        <div className="options-modal__overlay" onClick={onClose}>
            <section className="options-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
                <article className="options-modal__actions">
                    <button type="button" className="options-modal__link" onClick={() => setShowGuide(true)}>Consejos de uso</button>
                    <button type="button" className="options-modal__link"onClick={() =>(window.location.href=
                        "mailto:micoscolorcode@gmail.com?subject=Feedback%20sobre%20Micos&body=Hola,%20quería%20daros%20mi%20opinión...")}>
                        ¡Queremos tu feedback!</button>
                </article>
            </section>
        </div>
    );
}
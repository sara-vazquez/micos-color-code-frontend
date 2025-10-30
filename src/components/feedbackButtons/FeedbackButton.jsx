import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointUp } from "@fortawesome/free-regular-svg-icons"; 
import "./FeedbackButton.css";
import OptionsModal from '../optionsModal/OptionsModal';

export default function FeedbackButton() {
    const [isOpen, setIsOpen] = useState(false);
    
    return(
        <div className="feedback-wrapper">
            <div className="wavy-background"></div>
            <button className="feedback" aria-label="botón para dar feedback o ver los consejos de uso" onClick={() => setIsOpen(true)}>
                <FontAwesomeIcon icon={faHandPointUp} size="2x" />   
            </button>
            {isOpen && <OptionsModal onClose={() => setIsOpen(false)} />}
        </div>
    )
}


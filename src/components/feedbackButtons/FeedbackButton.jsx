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
            <button className="feedback" onClick={() => setIsOpen(true)}>
                <FontAwesomeIcon icon={faHandPointUp} size="2x" />   
            </button>
            {isOpen && <OptionsModal onClose={() => setIsOpen(false)} />}
        </div>
    )
}


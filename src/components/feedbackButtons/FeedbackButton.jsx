import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointUp } from "@fortawesome/free-regular-svg-icons"; 
import "./FeedbackButton.css";

export default function FeedbackButton() {
    return(
        <div className="feedback-wrapper">
            <div className="wavy-background"></div>
            <button className="feedback">
                <FontAwesomeIcon icon={faHandPointUp} size="2x" />   
            </button>
        </div>
    )
}


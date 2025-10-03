import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointUp } from "@fortawesome/free-regular-svg-icons"; 
import "./FeedbackButton.css";

export default function FeedbackButton(props) {
    return(
        <div className="feedback-wrapper">
            <div className="wavy-background"></div>
            <button className="feedback" {...props}>
                <FontAwesomeIcon icon={faHandPointUp} size="2x" />   
            </button>
        </div>
    )
}


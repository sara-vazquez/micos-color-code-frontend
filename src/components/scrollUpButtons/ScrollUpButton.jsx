import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"; 
import "./ScrollUpButton.css";

export default function ScrollUpButton() {
    return(
         <button className="scroll-up">
            <FontAwesomeIcon icon={faArrowUp} className="faArrowUp"/>        
        </button>
    )
}


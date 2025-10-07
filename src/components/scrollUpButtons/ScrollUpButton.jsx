import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"; 
import "./ScrollUpButton.css";

export default function ScrollUpButton() {

    const handleClick = () => {
        document.getElementById('top').scrollIntoView({ 
            behavior: 'smooth' 
        });
    };
 
    return (
        <>
           
            <button className="scroll-up" type="button" onClick={handleClick}>
                <FontAwesomeIcon icon={faArrowUp} className="faArrowUp" />
            </button>
        
        </>
    );
}


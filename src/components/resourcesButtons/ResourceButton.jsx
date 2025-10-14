import React from 'react';
import './ResourceButton.css';


export default function ResourceButton({onClick}) {
    return(
        <button className="resources__button" onClick={onClick}>RECURSOS</button>
    )
}
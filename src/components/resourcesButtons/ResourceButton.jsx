import React from 'react';
import './ResourceButton.css';


export default function ResourceButton({onClick}) {
    return(
        <button className="resources__button" onClick={onClick} aria-label="botón para acceder a la página de recursos">RECURSOS</button>
    )
}
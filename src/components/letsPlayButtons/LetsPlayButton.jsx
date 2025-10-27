import React from 'react';
import './LetsPlayButton.css';

export default function LetsPlayButton({onClick}) {
    return(
        <button onClick = {onClick} className="lets-play" aria-label="botón para ir a la página de juegos">¡A JUGAR!</button>
    )
}
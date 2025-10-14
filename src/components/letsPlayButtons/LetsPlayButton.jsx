import React from 'react';
import './LetsPlayButton.css';

export default function LetsPlayButton({onClick}) {
    return(
        <button onClick = {onClick} className="lets-play">¡A JUGAR!</button>
    )
}
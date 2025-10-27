import React from 'react';
import './DaltonicButton.css';

export default function DaltonicButton({ onClick }) {
    return(
        <button onClick = {onClick} className="daltonic" aria-label="botón para navegar a la página de daltonismo">¿QUÉ ES EL DALTONISMO?</button>
    )
}
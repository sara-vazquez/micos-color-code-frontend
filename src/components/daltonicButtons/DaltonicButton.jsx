import React from 'react';
import './DaltonicButton.css';

export default function DaltonicButton({ onClick }) {
    return(
        <button onClick = {onClick} className="daltonic">¿QUÉ ES EL DALTONISMO?</button>
    )
}
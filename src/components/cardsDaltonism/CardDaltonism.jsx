import React from 'react';
import './CardDaltonism.css';

export default function CardDaltonism({ title, text, image }) {
    return(
        <>
        <div className='daltonism-card__container'>
            <div className="daltonsim-card__content">
                <h3 className='daltonism-card__h3'>{title}</h3>
                <p className="daltonism-card__text">{text}</p>
            </div>
            <div className="daltonism-card__image">
                <img src={image} alt={title} />
            </div>
        </div>
        </>
    )
}
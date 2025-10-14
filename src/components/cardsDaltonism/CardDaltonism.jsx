import React from 'react';
import './CardDaltonism.css';

export default function CardDaltonism({ title, text, image }) {
    return(
        <>
        <section className='daltonism-card__container'>
            <article className="daltonsim-card__content">
                <h3 className='daltonism-card__h3'>{title}</h3>
                <p className="daltonism-card__text">{text}</p>
            </article>
            <article className="daltonism-card__image">
                <img src={image} alt={title} />
            </article>
        </section>
        </>
    )
}
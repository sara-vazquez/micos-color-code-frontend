import React from 'react';
import './ResourcesCard.css';
import { Eye, Download } from 'lucide-react';

export default function ResourcesCard({ title, text }) {
    return(
        <>
        <section className='resources-card__container'>
            <article className="daltonsim-card__content">
                <h3 className='resources-card__h3'>{title}</h3>
                <p className="resources-card__text">{text}</p>
            </article>
            <article className="resources-card__actions">
                <button className="resources-card__icon" aria-label="Botón de vista previa del material">
                    <Eye />
                </button>
                <button className="resources-card__icon" aria-label="Botón de descargar el material">
                    <Download />
                </button>
            </article>
        </section>
        </>
    )
}
import React, {useState} from 'react';
import './ResourcesCard.css';
import { Eye, Download } from 'lucide-react';
import ModalResources from '../modalResources/ModalResources';

export default function ResourcesCard({ title, text, onClose }) {
    const [openModalResources, setOpenModalResources] = useState(false);

        if(openModalResources) return <ModalResources onClose={onClose}/>

    return(
        <>
        <section className='resources-card__container'>
            <article className="daltonsim-card__content">
                <h3 className='resources-card__h3'>{title}</h3>
                <p className="resources-card__text">{text}</p>
            </article>
            <article className="resources-card__actions">
                <button className="resources-card__icon" aria-label="Botón de vista previa del material" onClick={() => setOpenModalResources(true)}>
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
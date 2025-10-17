import React from 'react';
import './ModalResources.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export default function ModalResources({resource, onClose}) {
    
    return(
        <div className="modal-resources__overlay" onClick={onClose}>
            <section className='modal-resources' onClick={(e) => e.stopPropagation()}>
                <header className="modal-resources__header">
                    <button className="modal-resources__exit">
                        <FontAwesomeIcon icon={faXmark} onClick={onClose}/>
                    </button>
                </header>
                <article className="modal-resources__content">
                    <section className="modal-resources__img-container">
                    <img src={resource.image} className="modal-resources__img" alt={resource.name} aria-label="imagen del recurso seleccionado" />
                    </section>
                    <h3 className="modal-resources__title">{resource.name}</h3>
                    <p className='modal-resources__text'>{resource.description}</p>                    
                </article>
            </section>
        </div>
    );
}
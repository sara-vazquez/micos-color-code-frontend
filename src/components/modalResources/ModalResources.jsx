import React from 'react';
import './ModalResources.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import sistema from '../../assets/sistema.svg';


export default function ModalResources({onClose}) {
    
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
                    <img src={sistema} className="modal-resources__img" aria-label="imagen del recurso seleccionado" />
                    </section>
                    <h3 className="modal-resources__title">El sistema</h3>
                    <p className='modal-resources__text'>Presentamos el sistema en un formato póster con indicaciones para plegar en formato tríptico y que así se pueda consultar el paso a paso de la creación de los colores.</p>                    
                </article>
            </section>
        </div>
    );
}
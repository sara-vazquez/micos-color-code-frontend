import React from 'react';
import './ModalResources.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ModalResources({onClose}) {
    return(
        <div className="modal-resources__overlay">
            <section className='modal-resources'>
                <header className="modal-resources__header">
                    <button className="modal-resources__exit">
                        <FontAwesomeIcon icon={faXmark} onClick={onClose}/>
                    </button>
                </header>

            </section>
        </div>
    );
}
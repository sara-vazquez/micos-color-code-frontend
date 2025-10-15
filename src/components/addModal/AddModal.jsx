import React from 'react';
import './AddModal.css';
import Button from '../buttons/Button';

export default function AddModal({onCancel }) {
    return(
        <section className="add-modal__overlay">
            <form className="add-modal__content">
                <h1 className="add-modal__title">Añadir recurso</h1>
                <article className="add-modal__img-container" placeholder="Vista previa de tu archivo">
                    <img className="add-modal__img" />
                </article>
                <article className="add-modal__input-group">
                    <label className="add-modal__label">Nombre</label>
                    <input className="add-modal__input" placeholder='Nombre del recurso'></input>

                    <label className="add-modal__label">Introducción</label>
                    <input className="add-modal__input" placeholder='Cuenta brevemente qué es el archivo'></input>

                    <label className="add-modal__label">Descripción</label>
                    <textarea className="add-modal__textarea" placeholder="Describe en qué consiste este recurso"></textarea>
                
                    <label className="add-modal__label" htmlFor={fileId}>Selecciona un archivo</label>
                    <input className="add-modal__input" id={fileId} type="file" />
                </article>
                <article className="add-modal__actions">
                    <Button type="button" onClick={onCancel} variant="secondary">Cancelar</Button>
                    <Button type="submit" variant="primary">Guardar</Button>
                </article>
            </form>
        </section>
    );
}
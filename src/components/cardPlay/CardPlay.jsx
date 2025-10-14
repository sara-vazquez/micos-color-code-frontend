import React from "react";
import './CardPlay.css'
import Button from '../buttons/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import memory from '../../assets/memory.png';

export default function CardPlay({onClose}) {
    return(
        <div className="play-card__overlay" onClick={onClose}>
            <section className="play-card"  onClick={(e) => e.stopPropagation()}>
            <header className="play-card_header">
                    <button className="play-card__exit">
                        <FontAwesomeIcon icon={faXmark} onClick={onClose}/>
                    </button>
                </header>
                <article className="play-card__content">
                    <h3 className="play-card__title">Memoriza la carta</h3>
                    <p className='play-card__text'>Encuentra la pareja de cada carta según sus colores, formas y patrones.</p>   
                    <section className="play-card__img-container">
                    <img src={memory} className="play-card__img" aria-label="ilustración descriptiva sobre el juego" />
                    <Button variant="primary">JUGAR</Button>
                    </section>                 
                </article>
            </section>
        </div>
    );
}
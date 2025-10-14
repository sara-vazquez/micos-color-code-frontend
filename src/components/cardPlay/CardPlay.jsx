import React from "react";
import './CardPlay.css'
import Button from '../buttons/Button';

import memory from '../../assets/memory.png';

export default function CardPlay() {
    return(
            <section className="play-card"  onClick={(e) => e.stopPropagation()}>
                <article className="play-card__content">
                    <h2 className="play-card__title">Memoriza la carta</h2>
                    <p className='play-card__text'>Encuentra la pareja de cada carta según sus colores, formas y patrones.</p>   
                    <section className="play-card__img-container">
                    <img src={memory} className="play-card__img" aria-label="ilustración descriptiva sobre el juego" />
                    </section>    
                    <Button variant="primary">JUGAR</Button>             
                </article>
            </section>
    );
}
import React from "react";
import { Link } from "react-router-dom";
import './CardPlay.css'
import Button from '../buttons/Button';

export default function CardPlay({title, description, img, path}) {
    
    return(
            <section className="play-card"  onClick={(e) => e.stopPropagation()}>
                <article className="play-card__content">
                    <h2 className="play-card__title">{title}</h2>
                    <p className='play-card__text'>{description}</p>   
                    <section className="play-card__img-container">
                    <img src={img}  className="play-card__img" aria-label="ilustración descriptiva sobre el juego" alt={title} />
                    </section>    
                    <Link to={path}>
                        <Button variant="primary">JUGAR</Button>      
                    </Link>       
                </article>
            </section>
    );
}
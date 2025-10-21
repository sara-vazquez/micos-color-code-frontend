import React from 'react';
import {useNavigate} from 'react-router-dom';
import './RankingChart.css';
import Button from '../buttons/Button';

export default function RankingChart() {
    const navigate = useNavigate();
    const goToPlayPage = () => { navigate("/users/play"); }

    return(
        <div className="ranking-chart__overlay">
            <main className='ranking-chart'>
                <section className='ranking-chart__title'>
                    <h1>CLASIFICACIÓN</h1>
                </section>

                <section className="ranking-chart__bar-group">
                    <article className="ranking-chart__bar">
                        <h3 className="ranking-chart__bar-username">{username}</h3>
                        <p className="ranking-chart__bar-points">{points} puntos</p>
                        <h1 className="ranking-chart__bar-position--1">{position}</h1>
                    </article>
                    <article className="ranking-chart__bar">
                        <h3 className="ranking-chart__bar-username">{username}</h3>
                        <p className="ranking-chart__bar-points">{points} puntos</p>
                        <h1 className="ranking-chart__bar-position--2">{position}</h1>
                    </article>
                    <article className="ranking-chart__bar">
                        <h3 className="ranking-chart__bar-username">{username}</h3>
                        <p className="ranking-chart__bar-points">{points} puntos</p>
                        <h1 className="ranking-chart__bar-position--3">{position}</h1>
                    </article>
                </section>
                <section className="ranking-chart__personal-card">
                    <p className="rankging-chart__personal-card--username">{username}</p>
                    <p className="rankging-chart__personal-card--points">{points} puntos</p>
                    <p className="rankging-chart__personal-card--position">{position}</p>
                </section>

                <section className="ranking-chart__actions">
                    <Button type="button" variant='primary' aria-label="botón para volver a jugar">JUGAR DE NUEVO</Button>
                    <Button type="button" variant='secondary' aria-label="botón para volver al menú de juegos" onClick={goToPlayPage}>VOLVER AL MENÚ</Button>
                </section>
            </main>
        </div>
    );
}
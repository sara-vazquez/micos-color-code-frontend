import React from 'react';
import './RankingChart.css';
import Button from '../buttons/Button';

export default function RankingChart() {
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
                        <h1 className="ranking-chart__bar-position">{position}</h1>
                    </article>
                </section>
                <section className="ranking-chart__personal-card">
                    <p className="rankging-chart__personal-card--username">{username}</p>
                    <p className="rankging-chart__personal-card--points">{points} puntos</p>
                    <p className="rankging-chart__personal-card--position">{position}</p>
                </section>

                <section className="ranking-chart__actions">
                    <Button variant='primary'>JUGAR DE NUEVO</Button>
                    <Button variant='secondary'>VOLVER AL MENÚ</Button>
                </section>
            </main>
        </div>
    );
}
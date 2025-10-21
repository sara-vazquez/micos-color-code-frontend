import React from 'react';
import './RankingChart.css';
import Button from '../buttons/Button';

export default function RankingChart() {
    return(
        <div className="ranking-chart__overlay">
            <section className='ranking-chart'>
                <article className='ranking-chart__title'>
                    <h1>CLASIFICACIÓN</h1>
                </article>

                <article className="ranking-chart__actions">
                    <Button variant='primary'>JUGAR DE NUEVO</Button>
                    <Button variant='secondary'>VOLVER AL MENÚ</Button>
                </article>
            </section>
        </div>
    );
}
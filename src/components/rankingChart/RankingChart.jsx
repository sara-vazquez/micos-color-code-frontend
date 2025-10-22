import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './RankingChart.css';
import Button from '../buttons/Button';

export default function RankingChart() {
    const [rankgingChart, setRankingChart] = useState(null);
    const navigate = useNavigate();
    const goToPlayPage = () => { navigate("/users/play"); }
    const gameId = 1;

    //useEffect

    return(
        <div className="ranking-chart__overlay">
            <main className='ranking-chart'>
                <section className='ranking-chart__title'>
                    <h1>CLASIFICACIÓN</h1>
                </section>

                <section className="ranking-chart__bar-group">
                    {rankingChart.top3.map((player, index) => (
                        <article key={player.username} className="ranking-chart__bar">
                            <h3 className="ranking-chart__bar-username">{player.username}</h3>
                            <p className="ranking-chart__bar-points">{player.totalPoints} puntos</p>
                            <h1 className={`ranking-chart__bar-position--${index + 1}`}>
                                {player.position}º
                            </h1>
                        </article>
                    ))}
                </section>
                <section className="ranking-chart__personal-card">
                    <p className="rankging-chart__personal-card--username">{rankingChart.currentUser.username}</p>
                    <p className="rankging-chart__personal-card--points">{rankingChart.currentUser.totalPoints} puntos</p>
                    <p className="rankging-chart__personal-card--position">{rankingChart.currentUser.position}º</p>
                </section>

                <section className="ranking-chart__actions">
                    <Button type="button" variant='primary' aria-label="botón para volver a jugar" onClick={() => navigate("/users/play/memory-cards")}>JUGAR DE NUEVO</Button>
                    <Button type="button" variant='secondary' aria-label="botón para volver al menú de juegos" onClick={goToPlayPage}>VOLVER AL MENÚ</Button>
                </section>
            </main>
        </div>
    );
}
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './RankingChart.css';
import Button from '../buttons/Button';
import { rankingService } from '../../services/rankingService';

export default function RankingChart() {
    const [rankingChart, setRankingChart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const gameId = 1; 

    const goToPlayPage = () => { 
        navigate("/users/play"); 
    }

    useEffect(() => {
        const fetchRanking= async () => {
            try {
                setLoading(true);
                const data = await rankingService.getRanking(gameId);
                setRankingChart(data);
            } catch (err) {
                setError(err.message);
                console.error('Error al cargar ranking:', err);
                
                if (err.message.includes('No autorizado')) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRanking();
    }, [gameId, navigate]);

    if (loading) {
        return (
            <div className="ranking-chart__overlay">
                <div className="ranking-chart">
                    <p>Cargando clasificación...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="ranking-chart__overlay">
                <div className="ranking-chart">
                    <p>Error al cargar la clasificación: {error}</p>
                    <Button onClick={goToPlayPage}>VOLVER AL MENÚ</Button>
                </div>
            </div>
        );
    }

    if (!rankingChart || !rankingChart.top3) {
        return (
            <div className="ranking-chart__overlay">
                <div className="ranking-chart">
                    <p>No hay datos de clasificación disponibles</p>
                    <Button onClick={goToPlayPage}>VOLVER AL MENÚ</Button>
                </div>
            </div>
        );
    }

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

            {rankingChart.currentUser && (
                <section className="ranking-chart__personal-card">
                    <p className="ranking-chart__personal-card--username">
                        {rankingChart.currentUser.username}
                    </p>
                    <p className="ranking-chart__personal-card--points">
                        {rankingChart.currentUser.totalPoints} puntos
                    </p>
                    <p className="ranking-chart__personal-card--position">
                        {rankingChart.currentUser.position}º
                    </p>
                </section>
            )}

            <section className="ranking-chart__actions">
                <Button 
                    type="button" 
                    variant='primary' 
                    aria-label="botón para volver a jugar" 
                    onClick={() => navigate("/users/play/memory-cards")}
                >JUGAR DE NUEVO</Button>
                <Button 
                    type="button" 
                    variant='secondary' 
                    aria-label="botón para volver al menú de juegos" 
                    onClick={goToPlayPage}
                >VOLVER AL MENÚ</Button>
            </section>
        </main>
    </div>
);
}
import React from 'react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import MemoryCardsGamePage from '../../pages/memoryCardsGamePage/MemoryCardsGamePage';
import { rankingService } from '../../services/rankingService';
import { gameSessionService } from '../../services/gameSessionService';

vi.mock('../../services/rankingService', () => ({
    rankingService: {
        getRanking: vi.fn()
    }
}));

vi.mock('../../services/gameSessionService', () => ({
    gameSessionService: {
        completeSession: vi.fn()
    }
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

vi.mock('../../components/singleMemoryCard/SingleMemoryCard', () => ({
    default: ({ card, handleChoice, flipped, disabled }) => (
        <div data-testid={`memory-card-${card.id}`}>
            <img 
                src={card.src} 
                alt="cara de arriba de la carta"
                className={flipped ? 'flipped' : ''}
            />
            <img 
                src="/img/cover.png" 
                alt="cara de abajo de la carta"
                onClick={() => !disabled && handleChoice(card)}
            />
        </div>
    )
}));

vi.mock('../../components/confirmationModal/ConfirmationModal', () => ({
    default: ({ onClose }) => (
        <div role="dialog" data-testid="confirmation-modal">
            <button onClick={onClose}>Cerrar</button>
        </div>
    )
}));

vi.mock('../../components/feedbackGameModal/FeedbackGameModal', () => ({
    default: ({ sessionPoints, onPlayAgain, onRankingChart }) => (
        <div role="dialog" data-testid="feedback-modal">
            <p>Puntos: {sessionPoints}</p>
            <button onClick={onPlayAgain}>Jugar de nuevo</button>
            <button onClick={onRankingChart}>Ver ranking</button>
        </div>
    )
}));

vi.mock('../../components/rankingChart/RankingChart', () => ({
    default: ({ onPlayAgain }) => (
        <div role="dialog" data-testid="ranking-chart">
            <button onClick={onPlayAgain}>Jugar de nuevo</button>
        </div>
    )
}));

window.Audio = vi.fn().mockImplementation(() => ({
    play: vi.fn(),
    pause: vi.fn(),
    currentTime: 0
}));

describe('MemoryCardsGamePage', () => {
    const mockRankingData = {
        currentLevel: 1,
        top3: [],
        currentUser: {
            username: 'marisabenito',
            totalPoints: 1000,
            position: 1
        }
    };

    const mockSessionResult = {
        sessionPoints: 1500,
        newTotalPoints: 2500,
        currentLevel: 1
    };

    beforeEach(() => {
        vi.clearAllMocks();
        rankingService.getRanking.mockResolvedValue(mockRankingData);
        gameSessionService.completeSession.mockResolvedValue(mockSessionResult);
        
        window.Audio = vi.fn().mockImplementation(() => ({
            play: vi.fn(),
            pause: vi.fn(),
            currentTime: 0
        }));
    });

    const renderComponent = async () => {
        const result = render(
            <BrowserRouter>
                <MemoryCardsGamePage />
            </BrowserRouter>
        );
        
        await waitFor(() => {
            expect(screen.queryByText('Cargando nivel...')).not.toBeInTheDocument();
        }, { timeout: 3000 });
        
        return result;
    };

    describe('Initial Rendering', () => {
        it('shows loading message initially', async () => {
            rankingService.getRanking.mockImplementation(() => new Promise(() => {}));
            
            render(
                <BrowserRouter>
                    <MemoryCardsGamePage />
                </BrowserRouter>
            );

            expect(screen.getByText('Cargando nivel...')).toBeInTheDocument();
        });

        it('renders game correctly after loading', async () => {
            await renderComponent();

            await waitFor(() => {
                expect(screen.getByText('Memoriza la carta')).toBeInTheDocument();
            });
            
            expect(screen.getByText('NIVEL 1')).toBeInTheDocument();
            expect(screen.getByLabelText('botón para volver atrás')).toBeInTheDocument();
        });

        it('loads current level from backend', async () => {
            await renderComponent();

            expect(rankingService.getRanking).toHaveBeenCalledWith(1);
            
            await waitFor(() => {
                expect(screen.getByText('NIVEL 1')).toBeInTheDocument();
            });
        });

        it('displays cards on the grid', async () => {
            await renderComponent();

            await waitFor(() => {
                const cards = screen.getAllByAltText('cara de abajo de la carta');
                expect(cards.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Volume Control', () => {
        it('toggles volume when volume button is clicked', async () => {
            const user = userEvent.setup();
            await renderComponent();

            await waitFor(() => {
                expect(screen.getByLabelText('Botón para silenciar el sonido')).toBeInTheDocument();
            });

            const volumeButton = screen.getByLabelText('Botón para silenciar el sonido');
            await user.click(volumeButton);

            await waitFor(() => {
                expect(screen.getByLabelText('Botón para activar el sonido')).toBeInTheDocument();
            });
        });
    });

    describe('Timer', () => {
        it('displays initial time correctly', async () => {
            await renderComponent();

            await waitFor(() => {
                expect(screen.getByText(/\d+:\d{2}/)).toBeInTheDocument();
            });
        });
    });

    describe('Card Selection', () => {
        it('allows clicking on cards', async () => {
            const user = userEvent.setup();
            await renderComponent();

            await waitFor(() => {
                expect(screen.getAllByAltText('cara de abajo de la carta').length).toBeGreaterThan(0);
            });

            const cards = screen.getAllByAltText('cara de abajo de la carta');
            await user.click(cards[0]);

            expect(cards[0]).toBeInTheDocument();
        });

        it('verifies Audio is instantiated', async () => {
            await renderComponent();

            await waitFor(() => {
                expect(window.Audio).toHaveBeenCalled();
            });
        });
    });

    describe('Confirmation Modal', () => {
        it('opens confirmation modal when back button is clicked', async () => {
            const user = userEvent.setup();
            await renderComponent();

            await waitFor(() => {
                expect(screen.getByLabelText('botón para volver atrás')).toBeInTheDocument();
            });

            const backButton = screen.getByLabelText('botón para volver atrás');
            await user.click(backButton);

            await waitFor(() => {
                expect(screen.getByTestId('confirmation-modal')).toBeInTheDocument();
            });
        });
    });

    describe('Error Handling', () => {
        it('handles error when loading level and defaults to level 1', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            rankingService.getRanking.mockRejectedValue(new Error('Error de red'));

            await renderComponent();

            await waitFor(() => {
                expect(screen.getByText('NIVEL 1')).toBeInTheDocument();
            });
            
            consoleErrorSpy.mockRestore();
        });
    });

    describe('Level System', () => {
        it('loads correct level from backend', async () => {
            rankingService.getRanking.mockResolvedValue({
                ...mockRankingData,
                currentLevel: 2
            });

            await renderComponent();

            await waitFor(() => {
                expect(screen.getByText('NIVEL 2')).toBeInTheDocument();
            });
        });

        it('starts at level 1 if backend returns no level', async () => {
            rankingService.getRanking.mockResolvedValue({
                ...mockRankingData,
                currentLevel: null
            });

            await renderComponent();

            await waitFor(() => {
                expect(screen.getByText('NIVEL 1')).toBeInTheDocument();
            });
        });
    });

    describe('Service calls', () => {
        it('calls rankingService on mount', async () => {
            await renderComponent();

            expect(rankingService.getRanking).toHaveBeenCalledWith(1);
            expect(rankingService.getRanking).toHaveBeenCalledTimes(1);
        });
    });
});
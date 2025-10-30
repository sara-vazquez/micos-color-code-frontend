import Reac from 'react';
import {describe, it, vi, expect, beforeEach} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import RankingChart from '../../components/rankingChart/RankingChart';
import { rankingService } from '../../services/rankingService';

vi.mock('../../services/rankingService', () => ({
    rankingService: {
        getRanking: vi.fn()
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
describe('RankingChart', () => {
        const mockRankingData = {
            top3: [
                {
                    username: "vicentabenito",
                    totalPoints: 15000,
                    position: 1
                },
                {
                    username: "maurihidalgo",
                    totalPoints: 12000,
                    position: 2
                },
                {
                    username: "palomacuesta",
                    totalPoints: 9500,
                    position: 3
                }
            ],
            currentUser: {
                username: "vicentabenito",
                totalPoints: 15000,
                position: 1
            }
        };

    const mockOnPlayAgain = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <RankingChart onPlayAgain={mockOnPlayAgain} />
            </BrowserRouter>
        );
    };

    it('renders ranking data correctly', async () => {
        rankingService.getRanking.mockResolvedValue(mockRankingData);
        
        renderComponent();

        await waitFor(() => {
            expect(screen.getByText('CLASIFICACIÓN')).toBeInTheDocument();
        });

        expect(screen.getByText('vicentabenito')).toBeInTheDocument();
        expect(screen.getByText('15000 puntos')).toBeInTheDocument();
        expect(screen.getByText('1º')).toBeInTheDocument();
        
        expect(screen.getByText('maurihidalgo')).toBeInTheDocument();
        expect(screen.getByText('12000 puntos')).toBeInTheDocument();
        expect(screen.getByText('2º')).toBeInTheDocument();
        
        expect(screen.getByText('palomacuesta')).toBeInTheDocument();
        expect(screen.getByText('9500 puntos')).toBeInTheDocument();
        expect(screen.getByText('3º')).toBeInTheDocument();
    });

    it('renders current user information', async () => {
        rankingService.getRanking.mockResolvedValue(mockRankingData);
        
        renderComponent();

        await waitFor(() => {
            expect(screen.getByText('CLASIFICACIÓN')).toBeInTheDocument();
        });

        const personalCard = screen.getByText('vicentabenito').closest('.ranking-chart__personal-card');
        expect(personalCard).toBeInTheDocument();
    });

    it('shows error message when ranking fetch fails', async () => {
        const errorMessage = 'Error de conexión';
        rankingService.getRanking.mockRejectedValue(new Error(errorMessage));
        
        renderComponent();

        await waitFor(() => {
            expect(screen.getByText(/Error al cargar la clasificación/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/Error de conexión/i)).toBeInTheDocument();
    });

    it('shows message when no ranking data is available', async () => {
        rankingService.getRanking.mockResolvedValue(null);
        
        renderComponent();

        await waitFor(() => {
            expect(screen.getByText('No hay datos de clasificación disponibles')).toBeInTheDocument();
        });
    });

    it('calls onPlayAgain when "JUGAR DE NUEVO" button is clicked', async () => {
        const user = userEvent.setup();
        rankingService.getRanking.mockResolvedValue(mockRankingData);
        
        renderComponent();

        await waitFor(() => {
            expect(screen.getByText('CLASIFICACIÓN')).toBeInTheDocument();
        });

        const playAgainButton = screen.getByLabelText('botón para volver a jugar');
        await user.click(playAgainButton);

        expect(mockOnPlayAgain).toHaveBeenCalledTimes(1);
    });

    it('navigates to play page when "VOLVER AL MENÚ" button is clicked', async () => {
        const user = userEvent.setup();
        rankingService.getRanking.mockResolvedValue(mockRankingData);
        
        renderComponent();

        await waitFor(() => {
            expect(screen.getByText('CLASIFICACIÓN')).toBeInTheDocument();
        });

        const backButton = screen.getByLabelText('botón para volver al menú de juegos');
        await user.click(backButton);

        expect(mockNavigate).toHaveBeenCalledWith('/users/play');
    });

    it('calls rankingService.getRanking with correct gameId', async () => {
        rankingService.getRanking.mockResolvedValue(mockRankingData);
        
        renderComponent();

        await waitFor(() => {
            expect(rankingService.getRanking).toHaveBeenCalledWith(1);
        });
    });
})
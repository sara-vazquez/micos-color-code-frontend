import React from "react";
import {describe, it, vi, expect, beforeEach} from 'vitest'
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import FeedbackGameModal from "../../components/feedbackGameModal/FeedbackGameModal";

describe('FeedbackGameModal', () => {
    const mockCurrentUserData = {
        currentUser: {
            sessionPoints: 1200,
            totalPoints: 3700
        }
    };

    const mockOnPlayAgain = vi.fn();
    const mockOnRankingChart = vi.fn();

    beforeEach(() => {
         vi.clearAllMocks();
    });

    it('renders currentUser game data correctly', async () => {
        render(<FeedbackGameModal currentUser={mockCurrentUserData.currentUser} onPlayAgain={mockOnPlayAgain} onRankingChart={mockOnRankingChart}/>)

        const section = screen.getByText('¡BIEN HECHO! 🎉');
        expect(section).toHaveClass('feedback-game__title').toBeInTheDocument();
    })

   it('calls onPlayAgain when "JUGAR DE NUEVO" button is clicked', async () => {
        const user = userEvent.setup();
        render(<FeedbackGameModal currentUser={mockCurrentUserData.currentUser} onPlayAgain={mockOnPlayAgain} onRankingChart={mockOnRankingChart}/>);

        await waitFor(() => {
            expect(screen.getByText('¡BIEN HECHO! 🎉')).toBeInTheDocument();
        });
        const playAgainButton = screen.getByLabelText('botón para jugar de nuevo');
        await user.click(playAgainButton);

        expect(mockOnPlayAgain).toHaveBeenCalledTimes(1);
    })

    it('calls onRankingChart when "VER CLASIFICACIÓN" button is clicked', async () => {

        const user = userEvent.setup();
        render(<FeedbackGameModal currentUser={mockCurrentUserData.currentUser} onPlayAgain={mockOnPlayAgain} onRankingChart={mockOnRankingChart}/>);

        await waitFor(() => {
            expect(screen.getByText('¡BIEN HECHO! 🎉')).toBeInTheDocument();
        });
        const rankingChartButton = screen.getByLabelText('botón para ver la clasificación');
        await user.click(rankingChartButton);

        expect(mockOnRankingChart).toHaveBeenCalledTimes(1);
    }) 
    

})
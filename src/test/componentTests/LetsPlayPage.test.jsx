import React from 'react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import LetsPlayPage from '../../pages/letsPlayPage/LetsPlayPage';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

vi.mock('../../components/feedbackButtons/FeedbackButton', () => ({
    default: () => <button>Feedback</button>
}));

vi.mock('../../components/cardPlay/CardPlay', () => ({
    default: ({ title, description, img, path }) => (
        <div data-testid="card-play">
            <h3>{title}</h3>
            <p>{description}</p>
            <img src={img} alt={title} />
            <span data-path={path}>Path: {path}</span>
        </div>
    )
}));

describe('LetsPlayPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <LetsPlayPage />
            </BrowserRouter>
        );
    };

    describe('Initial Rendering', () => {
        it('renders page title correctly', () => {
            renderComponent();

            expect(screen.getByText('¡A jugar!')).toBeInTheDocument();
        });

        it('renders introduction text', () => {
            renderComponent();

            expect(screen.getByText(/Aquí tienes una selección de juegos/i)).toBeInTheDocument();
            expect(screen.getByText(/poner en práctica lo aprendido/i)).toBeInTheDocument();
        });

        it('renders back button', () => {
            renderComponent();

            const backButton = screen.getByLabelText('botón para volver a la página anterior');
            expect(backButton).toBeInTheDocument();
        });
    });

    describe('Game Cards', () => {
        it('renders memory game card', () => {
            renderComponent();

            expect(screen.getByTestId('card-play')).toBeInTheDocument();
            expect(screen.getByText('Memoriza la carta')).toBeInTheDocument();
        });

        it('displays memory game description', () => {
            renderComponent();

            expect(screen.getByText(/Encuentra la pareja de cada carta según sus colores y formas/i)).toBeInTheDocument();
        });

        it('memory game card has correct path', () => {
            renderComponent();

            expect(screen.getByText('Path: /users/play/memory-cards')).toBeInTheDocument();
        });
    });

    describe('Navigation', () => {
        it('navigates back when back button is clicked', async () => {
            const user = userEvent.setup();
            renderComponent();

            const backButton = screen.getByLabelText('botón para volver a la página anterior');
            await user.click(backButton);

            expect(mockNavigate).toHaveBeenCalledWith(-1);
        });
    });

    describe('Additional Components', () => {
        it('renders FeedbackButton', () => {
            renderComponent();

            expect(screen.getByText('Feedback')).toBeInTheDocument();
        });
    });

    describe('Page Structure', () => {
        it('has header section', () => {
            renderComponent();

            const header = screen.getByRole('banner');
            expect(header).toBeInTheDocument();
        });

        it('has main content section', () => {
            renderComponent();

            const main = screen.getByRole('main');
            expect(main).toBeInTheDocument();
        });
    });
});
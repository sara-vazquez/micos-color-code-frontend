import React from 'react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../../pages/homePage/HomePage';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

vi.mock('../../components/buttons/Button', () => ({
    default: ({ children, onClick, variant }) => (
        <button onClick={onClick} data-variant={variant}>
            {children}
        </button>
    )
}));

vi.mock('../../components/feedbackButtons/FeedbackButton', () => ({
    default: ({ className }) => <button className={className}>Feedback</button>
}));

vi.mock('../../components/letsPlayButtons/LetsPlayButton', () => ({
    default: ({ onClick }) => (
        <button onClick={onClick} data-testid="play-button">
            Jugar
        </button>
    )
}));

vi.mock('../../components/resourcesButtons/ResourceButton', () => ({
    default: ({ onClick }) => (
        <button onClick={onClick} data-testid="resource-button">
            Recursos
        </button>
    )
}));

vi.mock('../../components/daltonicButtons/DaltonicButton', () => ({
    default: ({ onClick }) => (
        <button onClick={onClick} data-testid="daltonic-button">
            Daltonismo
        </button>
    )
}));

describe('HomePage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );
    };

    describe('Initial Rendering', () => {
        it('renders page title correctly', () => {
            renderComponent();

            expect(screen.getByText('¿Qué es Micos Color Code?')).toBeInTheDocument();
        });

        it('renders introduction text', () => {
            renderComponent();

            expect(screen.getByText(/Micos es un sistema visual creado para niños y niñas/i)).toBeInTheDocument();
            expect(screen.getByText(/3 y 8 años con daltonismo dicromático/i)).toBeInTheDocument();
            expect(screen.getByText(/facilitar el aprendizaje de los colores/i)).toBeInTheDocument();
        });

        it('renders "Saber más" button', () => {
            renderComponent();

            expect(screen.getByText('Saber más →')).toBeInTheDocument();
        });
    });

    describe('Navigation Buttons', () => {
        it('renders all navigation buttons', () => {
            renderComponent();

            expect(screen.getByTestId('play-button')).toBeInTheDocument();
            expect(screen.getByTestId('resource-button')).toBeInTheDocument();
            expect(screen.getByTestId('daltonic-button')).toBeInTheDocument();
        });

        it('navigates to system page when "Saber más" is clicked', async () => {
            const user = userEvent.setup();
            renderComponent();

            const saberMasButton = screen.getByText('Saber más →');
            await user.click(saberMasButton);

            expect(mockNavigate).toHaveBeenCalledWith('/users/system');
        });

        it('navigates to play page when play button is clicked', async () => {
            const user = userEvent.setup();
            renderComponent();

            const playButton = screen.getByTestId('play-button');
            await user.click(playButton);

            expect(mockNavigate).toHaveBeenCalledWith('/users/play');
        });

        it('navigates to resources page when resource button is clicked', async () => {
            const user = userEvent.setup();
            renderComponent();

            const resourceButton = screen.getByTestId('resource-button');
            await user.click(resourceButton);

            expect(mockNavigate).toHaveBeenCalledWith('/users/resources');
        });

        it('navigates to daltonism page when daltonic button is clicked', async () => {
            const user = userEvent.setup();
            renderComponent();

            const daltonicButton = screen.getByTestId('daltonic-button');
            await user.click(daltonicButton);

            expect(mockNavigate).toHaveBeenCalledWith('/users/daltonism');
        });
    });

    describe('Button Variants', () => {
        it('renders primary button with correct variant', () => {
            renderComponent();

            const saberMasButton = screen.getByText('Saber más →');
            expect(saberMasButton).toHaveAttribute('data-variant', 'primary');
        });
    });

    describe('Additional Components', () => {
        it('renders FeedbackButton', () => {
            renderComponent();

            expect(screen.getByText('Feedback')).toBeInTheDocument();
        });

        it('FeedbackButton has correct class', () => {
            renderComponent();

            const feedbackButton = screen.getByText('Feedback');
            expect(feedbackButton).toHaveClass('feedback__flying-button');
        });
    });

    describe('Content Emphasis', () => {
        it('emphasizes target age range', () => {
            renderComponent();

            const strongElement = screen.getByText(/3 y 8 años con daltonismo dicromático/i);
            expect(strongElement.tagName).toBe('STRONG');
        });

        it('emphasizes learning objective', () => {
            renderComponent();

            const strongElement = screen.getByText(/facilitar el aprendizaje de los colores/i);
            expect(strongElement.tagName).toBe('STRONG');
        });
    });

    describe('Page Structure', () => {
        it('has intro section', () => {
            renderComponent();

            const introSection = screen.getByText('¿Qué es Micos Color Code?').closest('section');
            expect(introSection).toHaveClass('homepage__intro');
        });

        it('has buttons container', () => {
            renderComponent();

            const buttonsContainer = screen.getByTestId('play-button').closest('section');
            expect(buttonsContainer).toHaveClass('buttons__container');
        });
    });

    describe('Navigation Functions', () => {
        it('goToSystem function navigates correctly', async () => {
            const user = userEvent.setup();
            renderComponent();

            await user.click(screen.getByText('Saber más →'));

            expect(mockNavigate).toHaveBeenCalledTimes(1);
            expect(mockNavigate).toHaveBeenCalledWith('/users/system');
        });

        it('goToDaltonism function navigates correctly', async () => {
            const user = userEvent.setup();
            renderComponent();

            await user.click(screen.getByTestId('daltonic-button'));

            expect(mockNavigate).toHaveBeenCalledTimes(1);
            expect(mockNavigate).toHaveBeenCalledWith('/users/daltonism');
        });

        it('goToPlay function navigates correctly', async () => {
            const user = userEvent.setup();
            renderComponent();

            await user.click(screen.getByTestId('play-button'));

            expect(mockNavigate).toHaveBeenCalledTimes(1);
            expect(mockNavigate).toHaveBeenCalledWith('/users/play');
        });

        it('goToResources function navigates correctly', async () => {
            const user = userEvent.setup();
            renderComponent();

            await user.click(screen.getByTestId('resource-button'));

            expect(mockNavigate).toHaveBeenCalledTimes(1);
            expect(mockNavigate).toHaveBeenCalledWith('/users/resources');
        });
    });
});
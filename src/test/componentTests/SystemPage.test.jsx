import React from 'react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SystemPage from '../../pages/systemPage/SystemPage';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

vi.mock('../../components/feedbackButtons/FeedbackButton', () => ({
    default: ({ className }) => <button className={className}>Feedback</button>
}));

vi.mock('../../components/scrollUpButtons/ScrollUpButton', () => ({
    default: () => <button>Scroll Up</button>
}));

describe('SystemPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <SystemPage />
            </BrowserRouter>
        );
    };

    describe('Initial Rendering', () => {
        it('renders page title correctly', () => {
            renderComponent();

            expect(screen.getByText('Micos, el sistema')).toBeInTheDocument();
        });

        it('renders introduction text', () => {
            renderComponent();

            expect(screen.getByText(/MICOS color code es un proyecto social/i)).toBeInTheDocument();
        });

        it('renders back button', () => {
            renderComponent();

            const backButton = screen.getByLabelText('botón para volver a la página anterior');
            expect(backButton).toBeInTheDocument();
        });

        it('renders section title "Paso a paso"', () => {
            renderComponent();

            expect(screen.getByText('Paso a paso')).toBeInTheDocument();
        });
    });

    describe('Color Sections', () => {
        it('renders primary colors section', () => {
            renderComponent();

            expect(screen.getByText('Colores primarios')).toBeInTheDocument();
            expect(screen.getByText(/Los colores primarios se representan/i)).toBeInTheDocument();
        });

        it('renders secondary colors section', () => {
            renderComponent();

            expect(screen.getByText('Colores secundarios')).toBeInTheDocument();
            expect(screen.getByText(/Cuando mezclamos los colores primarios/i)).toBeInTheDocument();
        });

        it('renders neutral colors section', () => {
            renderComponent();

            expect(screen.getByText('Colores neutros')).toBeInTheDocument();
            expect(screen.getByText(/También existen los colores neutros/i)).toBeInTheDocument();
        });

        it('renders dark colors section', () => {
            renderComponent();

            expect(screen.getByText('Colores oscuros')).toBeInTheDocument();
            expect(screen.getByText(/Los colores oscuros se consiguen sumando el negro/i)).toBeInTheDocument();
        });

        it('renders light colors section', () => {
            renderComponent();

            expect(screen.getByText('Colores claros')).toBeInTheDocument();
            expect(screen.getByText(/Los colores claros por su parte/i)).toBeInTheDocument();
        });
    });

    describe('Images', () => {
        it('renders all images with correct alt text', () => {
            renderComponent();

            expect(screen.getByLabelText('Ilustración del sistema')).toBeInTheDocument();
            expect(screen.getByLabelText('Ilustración de los colores primarios')).toBeInTheDocument();
            expect(screen.getByLabelText('Ilustración de los colores secundarios')).toBeInTheDocument();
            expect(screen.getByLabelText('Ilustración de los colores neutros')).toBeInTheDocument();
            expect(screen.getByLabelText('Ilustración de los colores oscuros')).toBeInTheDocument();
            expect(screen.getByLabelText('Ilustración de los colores claros')).toBeInTheDocument();
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

        it('renders ScrollUpButton', () => {
            renderComponent();

            expect(screen.getByText('Scroll Up')).toBeInTheDocument();
        });
    });

    describe('Content Structure', () => {
        it('renders all article cards', () => {
            renderComponent();

            const cards = screen.getAllByRole('article');
            expect(cards.length).toBeGreaterThan(0);
        });
    });
});
import React from 'react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import DaltonismPage from '../../pages/daltonismPage/DaltonismPage';

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

vi.mock('../../components/cardsDaltonism/CardDaltonism', () => ({
    default: ({ title, text, image }) => (
        <div data-testid={`card-${title.toLowerCase()}`}>
            <h3>{title}</h3>
            <p>{text}</p>
            <img src={image} alt={title} />
        </div>
    )
}));

describe('DaltonismPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <DaltonismPage />
            </BrowserRouter>
        );
    };

    describe('Initial Rendering', () => {
        it('renders page title correctly', () => {
            renderComponent();

            expect(screen.getByText('Daltonismo')).toBeInTheDocument();
        });

        it('renders introduction text with statistics', () => {
            renderComponent();

            expect(screen.getByText(/350 millones de personas/i)).toBeInTheDocument();
            expect(screen.getByText(/1 de cada 12 hombres y 1 de cada 200 mujeres/i)).toBeInTheDocument();
        });

        it('renders back button', () => {
            renderComponent();

            const backButton = screen.getByLabelText('botón para volver atrás');
            expect(backButton).toBeInTheDocument();
        });

        it('renders "Tipos de daltonismo" section', () => {
            renderComponent();

            expect(screen.getByText('Tipos de daltonismo')).toBeInTheDocument();
        });

        it('renders "Daltonismo dicromático" section', () => {
            renderComponent();

            expect(screen.getByText('Daltonismo dicromático. Casos principales')).toBeInTheDocument();
        });
    });

    describe('Daltonism Cards', () => {
        it('renders acromático card', () => {
            renderComponent();

            expect(screen.getByTestId('card-acromático')).toBeInTheDocument();
            expect(screen.getByText('ACROMÁTICO')).toBeInTheDocument();
        });

        it('renders dicromático card', () => {
            renderComponent();

            expect(screen.getByTestId('card-dicromático')).toBeInTheDocument();
            expect(screen.getByText('DICROMÁTICO')).toBeInTheDocument();
        });

        it('renders protanopia card', () => {
            renderComponent();

            expect(screen.getByTestId('card-protanopia')).toBeInTheDocument();
            expect(screen.getByText('PROTANOPIA')).toBeInTheDocument();
        });

        it('renders deuteranopia card', () => {
            renderComponent();

            expect(screen.getByTestId('card-deuteranopia')).toBeInTheDocument();
            expect(screen.getByText('DEUTERANOPIA')).toBeInTheDocument();
        });

        it('renders tritanopia card', () => {
            renderComponent();

            expect(screen.getByTestId('card-tritanopia')).toBeInTheDocument();
            expect(screen.getByText('TRITANOPIA')).toBeInTheDocument();
        });
    });

    describe('Content Details', () => {
        it('displays information about acromático daltonism', () => {
            renderComponent();

            expect(screen.getByText(/1 de cada 100.000 personas/i)).toBeInTheDocument();
            expect(screen.getByText(/ve en blanco y negro/i)).toBeInTheDocument();
        });

        it('displays information about protanopia', () => {
            renderComponent();

            expect(screen.getByText(/no posee los conos encargados de distinguir el rojo/i)).toBeInTheDocument();
        });

        it('displays information about deuteranopia', () => {
            renderComponent();

            expect(screen.getByText(/No son capaces de percibir los verdes/i)).toBeInTheDocument();
        });

        it('displays information about tritanopia', () => {
            renderComponent();

            expect(screen.getByText(/no distinguen el azul y el amarillo/i)).toBeInTheDocument();
            expect(screen.getByText(/la menos común/i)).toBeInTheDocument();
        });
    });

    describe('Navigation', () => {
        it('navigates back when back button is clicked', async () => {
            const user = userEvent.setup();
            renderComponent();

            const backButton = screen.getByLabelText('botón para volver atrás');
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

    describe('Statistical Information', () => {
        it('mentions common types of dichromatic daltonism', () => {
            renderComponent();

            expect(screen.getByText(/protanopia y la deuteranopia/i)).toBeInTheDocument();
        });
    });
});
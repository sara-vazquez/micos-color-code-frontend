import React from 'react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ResourcesPage from '../../pages/resourcesPage/ResourcesPage';
import { getResources } from '../../services/resourcesService';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

vi.mock('../../services/resourcesService', () => ({
    getResources: vi.fn()
}));

vi.mock('../../components/feedbackButtons/FeedbackButton', () => ({
    default: ({ className }) => <button className={className}>Feedback</button>
}));

vi.mock('../../components/scrollUpButtons/ScrollUpButton', () => ({
    default: () => <button>Scroll Up</button>
}));

vi.mock('../../components/resourcesCard/ResourcesCard', () => ({
    default: ({ resource }) => (
        <div data-testid={`resource-card-${resource.id}`}>
            <h3>{resource.name}</h3>
            <p>{resource.intro}</p>
        </div>
    )
}));

describe('ResourcesPage', () => {
    const mockResources = [
        {
            id: 1,
            name: 'Recurso de Daltonismo',
            intro: 'Guía sobre daltonismo',
            pdfFile: '/uploads/daltonismo.pdf'
        },
        {
            id: 2,
            name: 'Material Educativo',
            intro: 'Material para niños',
            pdfFile: '/uploads/material.pdf'
        }
    ];

    beforeEach(() => {
        vi.clearAllMocks();
        getResources.mockResolvedValue(mockResources);
    });

    const renderComponent = async () => {
        const result = render(
            <BrowserRouter>
                <ResourcesPage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.queryByText('Cargando recursos...')).not.toBeInTheDocument();
        });

        return result;
    };

    describe('Initial Rendering', () => {
        it('shows loading message initially', () => {
            getResources.mockImplementation(() => new Promise(() => {}));

            render(
                <BrowserRouter>
                    <ResourcesPage />
                </BrowserRouter>
            );

            expect(screen.getByText('Cargando recursos...')).toBeInTheDocument();
        });

        it('renders page correctly after loading', async () => {
            await renderComponent();

            expect(screen.getByText('Recursos')).toBeInTheDocument();
            expect(screen.getByLabelText('título de la página actual')).toBeInTheDocument();
        });

        it('renders introduction text', async () => {
            await renderComponent();

            expect(screen.getByText(/Te presentamos la sección de recursos/i)).toBeInTheDocument();
        });

        it('renders back button', async () => {
            await renderComponent();

            const backButton = screen.getByLabelText('botón para volver atrás');
            expect(backButton).toBeInTheDocument();
        });

        it('fetches resources on mount', async () => {
            await renderComponent();

            expect(getResources).toHaveBeenCalledTimes(1);
        });
    });

    describe('Resources Display', () => {
        it('displays all resources', async () => {
            await renderComponent();

            expect(screen.getByText('Recurso de Daltonismo')).toBeInTheDocument();
            expect(screen.getByText('Material Educativo')).toBeInTheDocument();
        });

        it('renders ResourcesCard components', async () => {
            await renderComponent();

            expect(screen.getByTestId('resource-card-1')).toBeInTheDocument();
            expect(screen.getByTestId('resource-card-2')).toBeInTheDocument();
        });

        it('shows message when no resources available', async () => {
            getResources.mockResolvedValue([]);

            render(
                <BrowserRouter>
                    <ResourcesPage />
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(screen.getByText('No hay recursos disponibles en este momento.')).toBeInTheDocument();
            });
        });
    });

    describe('Error Handling', () => {
        it('shows error message when fetch fails', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            getResources.mockRejectedValue(new Error('Network error'));

            render(
                <BrowserRouter>
                    <ResourcesPage />
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(screen.getByText('Error al cargar los recursos')).toBeInTheDocument();
            });

            consoleErrorSpy.mockRestore();
        });

        it('does not show resources when error occurs', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            getResources.mockRejectedValue(new Error('Network error'));

            render(
                <BrowserRouter>
                    <ResourcesPage />
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(screen.getByText('Error al cargar los recursos')).toBeInTheDocument();
            });

            expect(screen.queryByTestId('resource-card-1')).not.toBeInTheDocument();

            consoleErrorSpy.mockRestore();
        });
    });

    describe('Navigation', () => {
        it('navigates back when back button is clicked', async () => {
            const user = userEvent.setup();
            await renderComponent();

            const backButton = screen.getByLabelText('botón para volver atrás');
            await user.click(backButton);

            expect(mockNavigate).toHaveBeenCalledWith(-1);
        });
    });

    describe('Additional Components', () => {
        it('renders FeedbackButton', async () => {
            await renderComponent();

            expect(screen.getByText('Feedback')).toBeInTheDocument();
        });

        it('renders ScrollUpButton', async () => {
            await renderComponent();

            expect(screen.getByText('Scroll Up')).toBeInTheDocument();
        });
    });
});
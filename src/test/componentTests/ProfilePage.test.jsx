import React from 'react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ProfilePage from '../../pages/profilePage/ProfilePage';
import { getProfile } from '../../services/profileService';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

vi.mock('../../services/profileService', () => ({
    getProfile: vi.fn()
}));

vi.mock('../../components/feedbackButtons/FeedbackButton', () => ({
    default: ({ className }) => <button className={className}>Feedback</button>
}));

vi.mock('../../components/optionsProfile/OptionsProfile', () => ({
    default: ({ onClose, onEditProfile }) => (
        <div data-testid="options-profile">
            <button onClick={onClose}>Cerrar</button>
            <button onClick={onEditProfile}>Editar</button>
        </div>
    )
}));

vi.mock('../../components/editProfileModal/EditProfileModal', () => ({
    default: ({ profile, onClose, onProfileUpdate }) => (
        <div data-testid="edit-profile-modal">
            <h2>Editar Perfil</h2>
            <button onClick={onClose}>Cerrar Modal</button>
            <button onClick={() => onProfileUpdate({ ...profile, username: 'Updated' })}>
                Actualizar
            </button>
        </div>
    )
}));

describe('ProfilePage', () => {
    const mockProfile = {
        username: 'marisabenito',
        email: 'marisa@example.com'
    };

    beforeEach(() => {
        vi.clearAllMocks();
        getProfile.mockResolvedValue(mockProfile);
    });

    const renderComponent = async () => {
        const result = render(
            <BrowserRouter>
                <ProfilePage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.queryByText('Cargando perfil...')).not.toBeInTheDocument();
        });

        return result;
    };

    describe('Initial Rendering', () => {
        it('shows loading message initially', () => {
            getProfile.mockImplementation(() => new Promise(() => {}));

            render(
                <BrowserRouter>
                    <ProfilePage />
                </BrowserRouter>
            );

            expect(screen.getByText('Cargando perfil...')).toBeInTheDocument();
        });

        it('renders profile correctly after loading', async () => {
            await renderComponent();

            expect(screen.getByText('¡Hola, marisabenito!')).toBeInTheDocument();
        });

        it('fetches profile on mount', async () => {
            await renderComponent();

            expect(getProfile).toHaveBeenCalledTimes(1);
        });

        it('renders back button', async () => {
            await renderComponent();

            const backButton = screen.getByLabelText('botón para volver atrás');
            expect(backButton).toBeInTheDocument();
        });

        it('renders menu button', async () => {
            await renderComponent();

            const menuButton = screen.getByLabelText('menú opciones del perfil');
            expect(menuButton).toBeInTheDocument();
        });
    });

    describe('Profile Information Display', () => {
        it('displays username', async () => {
            await renderComponent();

            expect(screen.getByText('Nombre de usuario')).toBeInTheDocument();
            expect(screen.getByText('marisabenito')).toBeInTheDocument();
        });

        it('displays email', async () => {
            await renderComponent();

            expect(screen.getByText('Correo electrónico')).toBeInTheDocument();
            expect(screen.getByText('marisa@example.com')).toBeInTheDocument();
        });

        it('displays masked password', async () => {
            await renderComponent();

            expect(screen.getByText('Contraseña')).toBeInTheDocument();
            expect(screen.getByText('●●●●●●●●●●●')).toBeInTheDocument();
        });
    });

    describe('Options Menu', () => {
        it('opens options menu when menu button is clicked', async () => {
            const user = userEvent.setup();
            await renderComponent();

            const menuButton = screen.getByLabelText('menú opciones del perfil');
            await user.click(menuButton);

            await waitFor(() => {
                expect(screen.getByTestId('options-profile')).toBeInTheDocument();
            });
        });

        it('closes options menu when close button is clicked', async () => {
            const user = userEvent.setup();
            await renderComponent();

            const menuButton = screen.getByLabelText('menú opciones del perfil');
            await user.click(menuButton);

            await waitFor(() => {
                expect(screen.getByTestId('options-profile')).toBeInTheDocument();
            });

            const closeButton = screen.getByText('Cerrar');
            await user.click(closeButton);

            await waitFor(() => {
                expect(screen.queryByTestId('options-profile')).not.toBeInTheDocument();
            });
        });
    });

    describe('Edit Profile Modal', () => {
        it('opens edit modal when edit button in options is clicked', async () => {
            const user = userEvent.setup();
            await renderComponent();

            const menuButton = screen.getByLabelText('menú opciones del perfil');
            await user.click(menuButton);

            await waitFor(() => {
                expect(screen.getByTestId('options-profile')).toBeInTheDocument();
            });

            const editButton = screen.getByText('Editar');
            await user.click(editButton);

            await waitFor(() => {
                expect(screen.getByTestId('edit-profile-modal')).toBeInTheDocument();
            });
        });

        it('closes edit modal when close button is clicked', async () => {
            const user = userEvent.setup();
            await renderComponent();

            const menuButton = screen.getByLabelText('menú opciones del perfil');
            await user.click(menuButton);

            const editButton = screen.getByText('Editar');
            await user.click(editButton);

            await waitFor(() => {
                expect(screen.getByTestId('edit-profile-modal')).toBeInTheDocument();
            });

            const closeModalButton = screen.getByText('Cerrar Modal');
            await user.click(closeModalButton);

            await waitFor(() => {
                expect(screen.queryByTestId('edit-profile-modal')).not.toBeInTheDocument();
            });
        });

        it('updates profile when update button is clicked', async () => {
            const user = userEvent.setup();
            await renderComponent();

            const menuButton = screen.getByLabelText('menú opciones del perfil');
            await user.click(menuButton);

            const editButton = screen.getByText('Editar');
            await user.click(editButton);

            await waitFor(() => {
                expect(screen.getByTestId('edit-profile-modal')).toBeInTheDocument();
            });

            const updateButton = screen.getByText('Actualizar');
            await user.click(updateButton);

            await waitFor(() => {
                expect(screen.getByText('¡Hola, Updated!')).toBeInTheDocument();
            });
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

    describe('Error Handling', () => {
        it('shows error message when profile fetch fails', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            getProfile.mockRejectedValue(new Error('Network error'));

            render(
                <BrowserRouter>
                    <ProfilePage />
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(screen.getByText('No se pudieron cargar los datos del perfil 😔')).toBeInTheDocument();
            });

            consoleErrorSpy.mockRestore();
        });

        it('logs error to console when fetch fails', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const error = new Error('Network error');
            getProfile.mockRejectedValue(error);

            render(
                <BrowserRouter>
                    <ProfilePage />
                </BrowserRouter>
            );

            await waitFor(() => {
                expect(consoleErrorSpy).toHaveBeenCalledWith('Error al obtener perfil:', error);
            });

            consoleErrorSpy.mockRestore();
        });
    });

    describe('Additional Components', () => {
        it('renders FeedbackButton', async () => {
            await renderComponent();

            expect(screen.getByText('Feedback')).toBeInTheDocument();
        });
    });
});
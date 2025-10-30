import React from 'react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../../pages/loginPage/LoginPage';
import { loginUser } from '../../services/authService';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

vi.mock('../../services/authService', () => ({
    loginUser: vi.fn()
}));

vi.mock('../../components/loginForm/LoginForm', () => ({
    default: ({ onSubmit, loading, error, onGoToRegister }) => (
        <div data-testid="login-form">
            <button onClick={() => onSubmit({ email: 'test@test.com', password: 'Test123!' })}>
                Submit
            </button>
            <button onClick={onGoToRegister}>Go to Register</button>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
        </div>
    )
}));

describe('LoginPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );
    };

    describe('Initial Rendering', () => {
        it('renders LoginForm component', () => {
            renderComponent();

            expect(screen.getByTestId('login-form')).toBeInTheDocument();
        });

        it('renders submit and register buttons', () => {
            renderComponent();

            expect(screen.getByText('Submit')).toBeInTheDocument();
            expect(screen.getByText('Go to Register')).toBeInTheDocument();
        });
    });

    describe('Login Flow', () => {
        it('shows loading state during login', async () => {
            loginUser.mockImplementation(() => new Promise(() => {}));
            renderComponent();

            const submitButton = screen.getByText('Submit');
            submitButton.click();

            await waitFor(() => {
                expect(screen.getByText('Loading...')).toBeInTheDocument();
            });
        });

        it('calls loginUser with form data on submit', async () => {
            loginUser.mockResolvedValue({ role: 'USER' });
            renderComponent();

            const submitButton = screen.getByText('Submit');
            submitButton.click();

            await waitFor(() => {
                expect(loginUser).toHaveBeenCalledWith({
                    email: 'test@test.com',
                    password: 'Test123!'
                });
            });
        });

        it('navigates to admin dashboard when user is ADMIN', async () => {
            loginUser.mockResolvedValue({ role: 'ADMIN' });
            renderComponent();

            const submitButton = screen.getByText('Submit');
            submitButton.click();

            await waitFor(() => {
                expect(mockNavigate).toHaveBeenCalledWith('/admin/dashboard', { replace: true });
            });
        });

        it('navigates to user home when user is not ADMIN', async () => {
            loginUser.mockResolvedValue({ role: 'USER' });
            renderComponent();

            const submitButton = screen.getByText('Submit');
            submitButton.click();

            await waitFor(() => {
                expect(mockNavigate).toHaveBeenCalledWith('/users/home', { replace: true });
            });
        });

        it('uses replace option when navigating', async () => {
            loginUser.mockResolvedValue({ role: 'USER' });
            renderComponent();

            const submitButton = screen.getByText('Submit');
            submitButton.click();

            await waitFor(() => {
                expect(mockNavigate).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.objectContaining({ replace: true })
                );
            });
        });
    });

    describe('Error Handling', () => {
        it('shows error message when login fails', async () => {
            loginUser.mockRejectedValue(new Error('Credenciales incorrectas'));
            renderComponent();

            const submitButton = screen.getByText('Submit');
            submitButton.click();

            await waitFor(() => {
                expect(screen.getByText('Credenciales incorrectas')).toBeInTheDocument();
            });
        });

        it('stops loading after error', async () => {
            loginUser.mockRejectedValue(new Error('Error'));
            renderComponent();

            const submitButton = screen.getByText('Submit');
            submitButton.click();

            await waitFor(() => {
                expect(screen.getByText('Error')).toBeInTheDocument();
            });

            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });

        it('does not navigate when login fails', async () => {
            loginUser.mockRejectedValue(new Error('Error'));
            renderComponent();

            const submitButton = screen.getByText('Submit');
            submitButton.click();

            await waitFor(() => {
                expect(screen.getByText('Error')).toBeInTheDocument();
            });

            expect(mockNavigate).not.toHaveBeenCalled();
        });
    });

    describe('Navigation to Register', () => {
        it('navigates to register when "Go to Register" button is clicked', async () => {
            renderComponent();

            const registerButton = screen.getByText('Go to Register');
            registerButton.click();

            expect(mockNavigate).toHaveBeenCalledWith('/register');
        });
    });

    describe('State Management', () => {
        it('clears error when new submission starts', async () => {
            loginUser.mockRejectedValueOnce(new Error('Error inicial'));
            renderComponent();

            const submitButton = screen.getByText('Submit');
            submitButton.click();

            await waitFor(() => {
                expect(screen.getByText('Error inicial')).toBeInTheDocument();
            });

            loginUser.mockResolvedValue({ role: 'USER' });
            submitButton.click();

            await waitFor(() => {
                expect(screen.queryByText('Error inicial')).not.toBeInTheDocument();
            });
        });
    });
});
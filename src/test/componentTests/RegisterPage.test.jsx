import React from 'react';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterPage from '../../pages/registerPage/RegisterPage';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

vi.mock('../../services/registerService', () => ({
    registerUser: vi.fn()
}));

vi.mock('../../components/signUpForm/SignUpForm', () => ({
    default: ({ onSubmit, loading, error, success, onGoToLogin }) => (
        <div data-testid="signup-form">
            <button onClick={() => onSubmit({ username: 'test', email: 'test@test.com', password: 'Test123!' })}>
                Submit
            </button>
            <button onClick={onGoToLogin}>Go to Login</button>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Registro exitoso</p>}
        </div>
    )
}));

describe('RegisterPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <RegisterPage />
            </BrowserRouter>
        );
    };

    describe('Initial Rendering', () => {
        it('renders SignUpForm component', () => {
            renderComponent();
            expect(screen.getByTestId('signup-form')).toBeInTheDocument();
        });

        it('renders submit and login buttons', () => {
            renderComponent();
            expect(screen.getByText('Submit')).toBeInTheDocument();
            expect(screen.getByText('Go to Login')).toBeInTheDocument();
        });
    });
});
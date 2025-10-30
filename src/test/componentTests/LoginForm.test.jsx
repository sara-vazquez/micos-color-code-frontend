import React from 'react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../../components/loginForm/LoginForm';

vi.mock('../../components/buttons/Button', () => ({
    default: ({ children, onClick, type, disabled, variant }) => (
      <button 
        onClick={onClick} 
        type={type} 
        disabled={disabled}
        data-variant={variant}
      >
        {children}
      </button>
    )
}))

describe('LoginForm', () => {
    const mockOnSubmit = vi.fn()
    const mockOnGoToRegister = vi.fn()

    const defaultProps = {
        onSubmit: mockOnSubmit,
        loading: false,
        error: null,
        onGoToRegister: mockOnGoToRegister
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders form right', () => {
        render(<LoginForm {...defaultProps}/>)

        expect(screen.getByLabelText('Iniciar sesión')).toBeInTheDocument()
        expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument()
        expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeInTheDocument()
    })

    it('shows loading state when loading is true', () => {
        render(<LoginForm {...defaultProps} loading={true} />)
          
        expect(screen.getByText('Iniciando sesión...')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Iniciando sesión...' })).toBeDisabled()
    })
      
    it('displays error message when error prop is provided', () => {
        const errorMessage = 'Usuario no encontrado'
        render(<LoginForm {...defaultProps} error={errorMessage} />)
          
        expect(screen.getByText(errorMessage)).toBeInTheDocument()
        expect(screen.getByText(errorMessage)).toHaveClass('login-form__error')
    })

    it('calls onGoToRegister when login link is clicked', async () => {
        const user = userEvent.setup()
        render(<LoginForm {...defaultProps} />)
          
        const registerLink = screen.getByText('Regístrate aquí')
        await user.click(registerLink)
          
        expect(mockOnGoToRegister).toHaveBeenCalledTimes(1)
    })
      
    it('renders register link text correctly', () => {
        render(<LoginForm {...defaultProps} />)
          
        expect(screen.getByText('¿No tienes cuenta?')).toBeInTheDocument()
        expect(screen.getByText('Regístrate aquí')).toBeInTheDocument()
    })
})

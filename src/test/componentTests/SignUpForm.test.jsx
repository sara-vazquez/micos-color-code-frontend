import React from 'react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUpForm from '../../components/signUpForm/SignUpForm';

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
  
vi.mock('../../components/captcha/Captcha', () => ({
    default: ({ onCaptchaSolved }) => (
      <div data-testid="captcha-mock">
        <button 
          type="button"
          onClick={() => onCaptchaSolved({ captchaId: '123', captchaAnswer: 4 })}
        >
          Resolver Captcha
        </button>
      </div>
    )
}))
  
describe('SignUpForm', () => {
    const mockOnSubmit = vi.fn()
    const mockOnGoToLogin = vi.fn()
    
    const defaultProps = {
      onSubmit: mockOnSubmit,
      loading: false,
      error: null,
      success: false,
      onGoToLogin: mockOnGoToLogin
    }
  
    beforeEach(() => {
      vi.clearAllMocks()
    })
  
    it('renders form correctly', () => {
      render(<SignUpForm {...defaultProps} />)
      
      expect(screen.getByText('Regístrate')).toBeInTheDocument()
      expect(screen.getByLabelText('Nombre de usuario')).toBeInTheDocument()
      expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument()
      expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Registrarse' })).toBeInTheDocument()
    })
  
    it('renders captcha component', () => {
      render(<SignUpForm {...defaultProps} />)
      expect(screen.getByTestId('captcha-mock')).toBeInTheDocument()
    })
  
    it('updates form data when user types', async () => {
      const user = userEvent.setup()
      render(<SignUpForm {...defaultProps} />)
      
      const usernameInput = screen.getByLabelText('Nombre de usuario')
      const emailInput = screen.getByLabelText('Correo electrónico')
      const passwordInput = screen.getByLabelText('Contraseña')
      
      await user.type(usernameInput, 'lisasimpson8')
      await user.type(emailInput, 'lisasimpson@gmail.com')
      await user.type(passwordInput, 'UsaUnaContraseñaSegura123!')
      
      expect(usernameInput).toHaveValue('lisasimpson8')
      expect(emailInput).toHaveValue('lisasimpson@gmail.com')
      expect(passwordInput).toHaveValue('UsaUnaContraseñaSegura123!')
    })
  
    it('shows alert if captcha is not solved on submit', async () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
      const user = userEvent.setup()
      
      render(<SignUpForm {...defaultProps} />)
      
      await user.type(screen.getByLabelText('Nombre de usuario'), 'lisasimpson8')
      await user.type(screen.getByLabelText('Correo electrónico'), 'lisasimpson8@gmail.com')
      await user.type(screen.getByLabelText('Contraseña'), 'UsaUnaContraseñaSegura123!')
      
      const submitButton = screen.getByRole('button', { name: 'Registrarse' })
      await user.click(submitButton)
      
      expect(alertSpy).toHaveBeenCalledWith('Para registrarte debes resolver el captcha')
      expect(mockOnSubmit).not.toHaveBeenCalled()
      
      alertSpy.mockRestore()
    })
  
    it('submits form with all data when captcha is solved', async () => {
      const user = userEvent.setup()
      render(<SignUpForm {...defaultProps} />)
      
      await user.type(screen.getByLabelText('Nombre de usuario'), 'lisasimpson8')
      await user.type(screen.getByLabelText('Correo electrónico'), 'lisasimpson@gmail.com')
      await user.type(screen.getByLabelText('Contraseña'), 'UsaUnaContraseñaSegura123!')

      const resolveCaptchaButton = screen.getByText('Resolver Captcha')
      await user.click(resolveCaptchaButton)
      
      const submitButton = screen.getByRole('button', { name: 'Registrarse' })
      await user.click(submitButton)
      
      expect(mockOnSubmit).toHaveBeenCalledWith({
        username: 'lisasimpson8',
        email: 'lisasimpson@gmail.com',
        password: 'UsaUnaContraseñaSegura123!',
        captchaId: '123',
        captchaAnswer: 4
      })
    })
  
    it('shows loading state when loading is true', () => {
      render(<SignUpForm {...defaultProps} loading={true} />)
      
      expect(screen.getByText('Registrando...')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Registrando...' })).toBeDisabled()
    })
  
    it('displays error message when error prop is provided', () => {
      const errorMessage = 'El usuario ya existe'
      render(<SignUpForm {...defaultProps} error={errorMessage} />)
      
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
      expect(screen.getByText(errorMessage)).toHaveClass('signup-form__error')
    })
  
    it('displays success message when success is true', () => {
      render(<SignUpForm {...defaultProps} success={true} />)
      
      expect(screen.getByText('🎉 Registro exitoso')).toBeInTheDocument()
      expect(screen.getByText('🎉 Registro exitoso')).toHaveClass('signup-form__success')
    })
  
    it('calls onGoToLogin when login link is clicked', async () => {
      const user = userEvent.setup()
      render(<SignUpForm {...defaultProps} />)
      
      const loginLink = screen.getByText('Inicia sesión aquí')
      await user.click(loginLink)
      
      expect(mockOnGoToLogin).toHaveBeenCalledTimes(1)
    })
  
    it('renders login link text correctly', () => {
      render(<SignUpForm {...defaultProps} />)
      
      expect(screen.getByText('¿Ya tienes cuenta?')).toBeInTheDocument()
      expect(screen.getByText('Inicia sesión aquí')).toBeInTheDocument()
    })
})
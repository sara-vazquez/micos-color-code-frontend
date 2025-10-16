import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import Captcha from '../../components/captcha/Captcha';
import * as captchaService from '../../services/captchaService';

vi.mock('../../services/captchaService')

describe('Captcha', () => {
    const mockOnCaptchaSolved = vi.fn()
    const mockCaptchaData = {
        id: '123',
        question: '¿Cuánto es 2 + 2 x 1?'
    }

    beforeEach(() => {
        vi.clearAllMocks()
        captchaService.getCaptcha.mockResolvedValue(mockCaptchaData)
    })

    it('shows "Cargando captcha..." in the begining', () => {
        render(<Captcha onCaptchaSolved={mockOnCaptchaSolved}/>)
        expect(screen.getByText('Cargando captcha...')).toBeInTheDocument()
    })

    it('gets and shows captcha right', async () => {
        render(<Captcha onCaptchaSolved={mockOnCaptchaSolved} />)

        await waitFor(() => {
            expect(screen.getByText('¿Cuánto es 2 + 2 x 1?')).toBeInTheDocument()
        })
        expect(captchaService.getCaptcha).toHaveBeenCalledTimes(1)
    })

    it('calls onCaptchaSolved with answer null', async () => {
        render(<Captcha onCaptchaSolved={mockOnCaptchaSolved} />)

        await waitFor(() => {
            expect(mockOnCaptchaSolved).toHaveBeenCalledWith({
                captchaId: '123',
                captchaAnswer: null
            })
        })
    })

    it('updates answer when user writes', async () => {
        const user = userEvent.setup()
        render(<Captcha onCaptchaSolved={mockOnCaptchaSolved} />)
        
        await waitFor(() => {
          expect(screen.getByPlaceholderText('Tu respuesta')).toBeInTheDocument()
        })
        
        const input = screen.getByPlaceholderText('Tu respuesta')
        await user.type(input, '4')
        
        expect(input).toHaveValue('4')
        expect(mockOnCaptchaSolved).toHaveBeenCalledWith({
          captchaId: '123',
          captchaAnswer: 4
        })
    })

    it('allows negative numbers', async () => {
        const user = userEvent.setup()
        render(<Captcha onCaptchaSolved={mockOnCaptchaSolved} />)
        
        await waitFor(() => {
          expect(screen.getByPlaceholderText('Tu respuesta')).toBeInTheDocument()
        })
        
        const input = screen.getByPlaceholderText('Tu respuesta')
        await user.type(input, '-5')
        
        expect(input).toHaveValue('-5')
        expect(mockOnCaptchaSolved).toHaveBeenLastCalledWith({
          captchaId: '123',
          captchaAnswer: -5
        })
    })

    it('letters are not allowed in the input', async () => {
        const user = userEvent.setup()
        render(<Captcha onCaptchaSolved={mockOnCaptchaSolved} />)
        
        await waitFor(() => {
          expect(screen.getByPlaceholderText('Tu respuesta')).toBeInTheDocument()
        })
        
        const input = screen.getByPlaceholderText('Tu respuesta')
        await user.type(input, 'abc')
        
        expect(input).toHaveValue('')
    })

    it('reload captcha when clicking in refresh button', async () => {
        const user = userEvent.setup()
        render(<Captcha onCaptchaSolved={mockOnCaptchaSolved} />)
        
        await waitFor(() => {
          expect(screen.getByLabelText('Recargar captcha')).toBeInTheDocument()
        })
        
        const refreshButton = screen.getByLabelText('Recargar captcha')
        await user.click(refreshButton)
        
        expect(captchaService.getCaptcha).toHaveBeenCalledTimes(2)
    })
    
    it('shows error if captcha load fails', async () => {
        captchaService.getCaptcha.mockRejectedValueOnce(new Error('Error'))
        
        render(<Captcha onCaptchaSolved={mockOnCaptchaSolved} />)
        
        expect(screen.getByText('Cargando captcha...')).toBeInTheDocument()

        await waitFor(() => {
            expect(screen.queryByText('Cargando captcha...')).toBeInTheDocument()
        })
        expect(captchaService.getCaptcha).toHaveBeenCalledTimes(1)
    })

})
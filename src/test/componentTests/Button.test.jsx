import React from 'react';
import { render, screen } from '@testing-library/react';
import {describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Button from '../../components/buttons/Button';

describe('Button', () => {
    it('renders button right', () => {
        render(<Button />)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveClass('btn')
    })

    it('executes onClick when you click on it', async () => {
        const handleClick = vi.fn()
        const user = userEvent.setup()

        render(<Button onClick={handleClick} />)
        const button = screen.getByRole('button')

        await user.click(button)

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('executes additional props', () => {
        render(<Button disabled data-testid = "test-button" />)
        const button = screen.getByRole('button')

        expect(button).toBeDisabled()
        expect(button).toHaveAttribute('data-testid', 'test-button')
    })
})
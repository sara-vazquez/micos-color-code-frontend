import React from 'react';
import { render, screen } from '@testing-library/react';
import {describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import AddButton from '../../components/addButton/AddButton';

describe('AddButton', () => {
    it('renders button right', () => {
        render (<AddButton />)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveClass('add')
    })

    it('renders plus icon', () => {
        render (<AddButton />)
        const icon = document.querySelector('.faPlus')
        expect(icon).toBeInTheDocument()
    })

    it('executes onClick when you clic on it', async () => {
        const handleClick = vi.fn()
        const user = userEvent.setup()

        render(<AddButton onClick={handleClick} />)
        const button = screen.getByRole('button')

        await user.click(button)

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('executes additional props', () => {
        render(<AddButton disabled data-testid = "test-button" />)
        const button = screen.getByRole('button')

        expect(button).toBeDisabled()
        expect(button).toHaveAttribute('data-testid', 'test-button')
    })
})


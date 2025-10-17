import React from "react";
import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import userEvent from "@testing-library/user-event";
import ResourceButton from "../../components/resourcesButtons/ResourceButton";
describe('LetsPlayButton', () => {
    it('renders button right', () => {
        render(<ResourceButton />)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveClass('resources__button')
    })

    it('calls onClick when clicked', async () => {
        const user = userEvent.setup()
        const mockOnClick = vi.fn()
        render(<ResourceButton onClick={mockOnClick}/>)

        const button = screen.getByRole('button')
        await user.click(button)
        expect(mockOnClick).toHaveBeenCalledOnce()
    })
})
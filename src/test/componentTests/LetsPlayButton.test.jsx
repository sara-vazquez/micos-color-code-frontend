import React from "react";
import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import userEvent from "@testing-library/user-event";
import LetsPlayButton from "../../components/letsPlayButtons/LetsPlayButton";

describe('LetsPlayButton', () => {
    it('renders button right', () => {
        render(<LetsPlayButton />)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveClass('lets-play')
    })

    it('calls onClick when clicked', async () => {
        const user = userEvent.setup()
        const mockOnClick = vi.fn()
        render(<LetsPlayButton onClick={mockOnClick}/>)

        const button = screen.getByRole('button')
        await user.click(button)
        expect(mockOnClick).toHaveBeenCalledOnce()
    })
})
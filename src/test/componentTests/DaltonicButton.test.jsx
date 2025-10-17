import React from "react";
import { BrowserRouter } from "react-router-dom";
import {render, screen} from '@testing-library/react'
import {describe, it, expect, vi} from 'vitest';
import userEvent from "@testing-library/user-event";
import DaltonicButton from "../../components/daltonicButtons/DaltonicButton";

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
      ...actual,
      useLocation: () => ({ pathname: '/daltonism' })
    }
})
describe('DaltonicButton', () => {
    it('renders button right', () => {
        render(<DaltonicButton />)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveClass('daltonic')
    })

   it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const mockOnClick = vi.fn()
    render(<DaltonicButton onClick={mockOnClick}/>)

    const button = screen.getByRole('button')
    await user.click(button)
    expect(mockOnClick).toHaveBeenCalledOnce()
   })
})
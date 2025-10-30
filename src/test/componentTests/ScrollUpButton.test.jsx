import React from "react";
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi} from 'vitest';
import userEvent from '@testing-library/user-event';
import ScrollUpButton from '../../components/scrollUpButtons/ScrollUpButton';

describe('ScrollUpButton', () => {

    it('renders button right', () => {
        render(<ScrollUpButton />)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveClass('scroll-up')
    })

    it('renders arrow up icon', () => {
        const {container} = render(<ScrollUpButton />)
        const icon = container.querySelector('svg')
        expect(icon).toBeInTheDocument()
    })

    it('scrolls to top when you click on it', async () => {
        const mockScrollIntoView = vi.fn()
        const mockElement = { scrollIntoView: mockScrollIntoView }
        
        vi.spyOn(document, 'getElementById').mockReturnValue(mockElement)
        
        const user = userEvent.setup()
        render(<ScrollUpButton />)
        
        const button = screen.getByRole('button')
        await user.click(button)
        
        expect(document.getElementById).toHaveBeenCalledWith('top')
        
        expect(mockScrollIntoView).toHaveBeenCalledWith({
          behavior: 'smooth'
        })
        
        vi.restoreAllMocks()
      })
    
})
import React from 'react';
import { render, screen } from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import userEvent from '@testing-library/user-event';
import SingleMemoryCard from '../../components/singleMemoryCard/SingleMemoryCard';

describe('SingleMemoryCard', () => {
    const mockCard = {
        id: 1,
        src: '/img/watermelon.png',
        matched: false
    };
    const mockHandleChoice = vi.fn();

    it('renders the card correctly', () => {
        render(<SingleMemoryCard  card={mockCard} 
            handleChoice={mockHandleChoice} 
            flipped={false} 
            disabled={false} />);

            const frontImage = screen.getByAltText('cara de arriba de la carta');
            const backImage = screen.getByAltText('cara de abajo de la carta');
    
            expect(frontImage).toBeInTheDocument();
            expect(backImage).toBeInTheDocument();
            expect(frontImage).toHaveAttribute('src', mockCard.src);
            expect(backImage).toHaveAttribute('src', '/img/cover.png');
        });

        it('applies flipped class when flipped prop is true', () => {
            render(
                <SingleMemoryCard 
                    card={mockCard} 
                    handleChoice={mockHandleChoice} 
                    flipped={true} 
                    disabled={false} 
                />
            );
    
            const section = screen.getByRole('main').querySelector('section');
            expect(section).toHaveClass('flipped');
        });

        it('does not apply flipped class when flipped prop is false', () => {
            render(
                <SingleMemoryCard 
                    card={mockCard} 
                    handleChoice={mockHandleChoice} 
                    flipped={false} 
                    disabled={false} 
                />
            );
    
            const section = screen.getByRole('main').querySelector('section');
            expect(section).not.toHaveClass('flipped');
        });

        it('executes handleChoice when clicking on back image', async () => {
            const user = userEvent.setup();
            
            render(
                <SingleMemoryCard 
                    card={mockCard} 
                    handleChoice={mockHandleChoice} 
                    flipped={false} 
                    disabled={false} 
                />
            );
    
            const backImage = screen.getByAltText('cara de abajo de la carta');
            await user.click(backImage);
    
            expect(mockHandleChoice).toHaveBeenCalledTimes(1);
            expect(mockHandleChoice).toHaveBeenCalledWith(mockCard);
        });
})
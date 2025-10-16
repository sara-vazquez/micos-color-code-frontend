import React from "react";
import {render, screen } from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import userEvent from "@testing-library/user-event";
import FeedbackButton from "../../components/feedbackButtons/FeedbackButton";

vi.mock('../../components/optionsModal/OptionsModal', () => ({
    default: ({ onClose }) => (
      <div data-testid="options-modal">
        <button onClick={onClose}>Cerrar</button>
      </div>
    )
}))

describe('FeedbackButton', () => {
    it('renders button right', () => {
        render(<FeedbackButton />)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).toHaveClass('feedback')
    })

    it('renders hand icon', () => {
        const {container} = render(<FeedbackButton />)
        const icon = container.querySelector('svg')
        expect(icon).toBeInTheDocument()
    })

    it('opens options modal when you click on it', async () => {
        const user = userEvent.setup()
        render(<FeedbackButton />)

        //make sure open modal is not at the begining
        expect(screen.queryByTestId('options-modal')).not.toBeInTheDocument()

        const button = screen.getByRole('button')
        await user.click(button)

        expect(screen.getByTestId('options-modal')).toBeInTheDocument()
    })
})
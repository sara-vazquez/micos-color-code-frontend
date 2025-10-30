import React from "react";
import { render, screen } from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import userEvent from "@testing-library/user-event";
import SearchInput from "../../components/searchInput/SearchInput";

describe('SearhInput', () => {
    it('renders input right', () =>{
        render(<SearchInput />)
        const input = screen.getByRole('textbox')
        expect(input).toBeInTheDocument()
        expect(input).toHaveClass('search-input__field')
    })

    it('renders with default placeholder', () => {
        render(<SearchInput />)
        const input = screen.getByPlaceholderText('Buscar...')
        expect(input).toBeInTheDocument()
    })

    it('renders search icon', () => {
        const {container} = render(<SearchInput />)
        const icon = container.querySelector('svg')
        expect(icon).toBeInTheDocument()
    })

    it('updates input when user types', async () => {
        const user = userEvent.setup()
        render(<SearchInput />)

        const input = screen.getByRole('textbox')
        await user.type(input, 'test search')

        expect(input).toHaveValue('test search')
    })

    it('calls onSearch in real time when user types', async () => {
        const mockOnSearch = vi.fn()
        const user = userEvent.setup()
        
        render(<SearchInput onSearch={mockOnSearch} />)
        const input = screen.getByRole('textbox')
        
        await user.type(input, 'abc')
        
        // Calls once by each letter
        expect(mockOnSearch).toHaveBeenCalledTimes(3)
        expect(mockOnSearch).toHaveBeenNthCalledWith(1, 'a')
        expect(mockOnSearch).toHaveBeenNthCalledWith(2, 'ab')
        expect(mockOnSearch).toHaveBeenNthCalledWith(3, 'abc')
    })

    it('calls onSearch when form is submitted', async () => {
        const mockOnSearch = vi.fn()
        const user = userEvent.setup()
        
        render(<SearchInput onSearch={mockOnSearch} />)
        const input = screen.getByRole('textbox')
        
        await user.type(input, 'test')
        
        mockOnSearch.mockClear()
        
        await user.keyboard('{Enter}')
        
        expect(mockOnSearch).toHaveBeenCalledTimes(1)
        expect(mockOnSearch).toHaveBeenCalledWith('test')
      })


})
import React from 'react';
import {render, screen, within } from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import userEvent from '@testing-library/user-event';
import ResourcesTable from '../../components/resourcesTable/ResourcesTable';

describe('ResourcesTable', () => {
    const mockOnEdit = vi.fn()
    const mockOnDelete = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
        vi.stubEnv('VITE_API_BASE_URL', 'https://example.com/')
    })

    const mockData = [{
      id: 1,
      image: 'https://example.com/image1.jpg',
      pdf: 'sistema.pdf',
      name: 'El sistema',
      intro: 'Poster/tríptico del sistema',
      description: 'Guía de construcción del sistema visual, paso a paso para entender cómo se forman los colores.'
    },
    {
      id: 2,
      image: 'https://example.com/image2.jpg',
      pdf: 'marcadoresUniversales.pdf',
      name: 'Marcadores universales',
      intro: 'Marcadores para pinturas',
      description: 'Marcadores universales para cualquier tipo de pintura (ceras, temperas, plastilina incluso, etc.). Recomendamos imprimirlo en papel pegatina.'
    }]

    const defaultProps = {
        data: mockData,
        onEdit: mockOnEdit,
        onDelete: mockOnDelete
    }

    it('render table right', () => {
        render(<ResourcesTable {...defaultProps}/>)

        expect(screen.getByText('Imagen')).toBeInTheDocument()
        expect(screen.getByText('PDF')).toBeInTheDocument()
        expect(screen.getByText('Nombre')).toBeInTheDocument()
        expect(screen.getByText('Intro')).toBeInTheDocument()
        expect(screen.getByText('Descripción')).toBeInTheDocument()
        expect(screen.getByText('Acciones')).toBeInTheDocument()
    })

    it('renders all resources data', () => {
        render(<ResourcesTable {...defaultProps} />)
    
        expect(screen.getByText('El sistema')).toBeInTheDocument()
        expect(screen.getByText('Poster/tríptico del sistema')).toBeInTheDocument()
        expect(
          screen.getByText('Guía de construcción del sistema visual, paso a paso para entender cómo se forman los colores.')
        ).toBeInTheDocument()
    
        expect(screen.getByText('Marcadores universales')).toBeInTheDocument()
        expect(screen.getByText('Marcadores para pinturas')).toBeInTheDocument()
        expect(
          screen.getByText(
            'Marcadores universales para cualquier tipo de pintura (ceras, temperas, plastilina incluso, etc.). Recomendamos imprimirlo en papel pegatina.'
          )
        ).toBeInTheDocument()
    })
    
    it('shows empty message when data is empty', () => {
        render(<ResourcesTable data={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />)
        
        expect(screen.getByText('No hay recursos disponibles')).toBeInTheDocument()
    })
    
    it('empty message spans all columns', () => {
        render(<ResourcesTable data={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />)
        
        const emptyCell = screen.getByText('No hay recursos disponibles')
        expect(emptyCell).toHaveAttribute('colSpan', '6')
    })

    it('renders edit and delete buttons for each resource', () => {
        render(<ResourcesTable {...defaultProps} />)
        
        const editButtons = screen.getAllByLabelText('Editar recurso')
        const deleteButtons = screen.getAllByLabelText('Eliminar recurso')
        
        expect(editButtons).toHaveLength(2)
        expect(deleteButtons).toHaveLength(2)
    })
    
    it('calls onEdit with resource when edit button is clicked', async () => {
        const user = userEvent.setup()
        render(<ResourcesTable {...defaultProps} />)
        
        const editButtons = screen.getAllByLabelText('Editar recurso')
        await user.click(editButtons[0])
        
        expect(mockOnEdit).toHaveBeenCalledTimes(1)
        expect(mockOnEdit).toHaveBeenCalledWith(mockData[0])
    })

    it('calls onDelete with resource id when delete button is clicked', async () => {
        const user = userEvent.setup()
        render(<ResourcesTable {...defaultProps} />)
        
        const deleteButtons = screen.getAllByLabelText('Eliminar recurso')
        await user.click(deleteButtons[1])
        
        expect(mockOnDelete).toHaveBeenCalledTimes(1)
        expect(mockOnDelete).toHaveBeenCalledWith(2)
    })
    
    it('renders correct number of rows', () => {
        const { container } = render(<ResourcesTable {...defaultProps} />)
        
        const rows = container.querySelectorAll('tbody tr')
        expect(rows).toHaveLength(2)
    })
    
    it('each row has correct number of cells', () => {
        const { container } = render(<ResourcesTable {...defaultProps} />)
        
        const firstRow = container.querySelector('tbody tr')
        const cells = within(firstRow).getAllByRole('cell')
        expect(cells).toHaveLength(6)
    })
    
})
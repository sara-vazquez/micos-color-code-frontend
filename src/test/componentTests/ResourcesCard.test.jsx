import React from "react";
import {render, screen} from '@testing-library/react';
import {describe, it, vi, expect, beforeEach} from 'vitest';
import userEvent from "@testing-library/user-event";
import ResourcesCard from "../../components/resourcesCard/ResourcesCard";

describe('ResourcesCard', () => {
    const mockResourcesCard = {
        name: "Sistema",
        intro: "Póster / tríptico visual del sistema."
    }

    beforeEach(() => {
        // Mock de import.meta.env
        import.meta.env.VITE_API_BASE_URL = 'http://localhost:8080';
    });

    it('renders card correctly', () => {
        render(<ResourcesCard resource={mockResourcesCard} />)

        const name = screen.getByText('Sistema');
        const intro  = screen.getByText('Póster / tríptico visual del sistema.');
        const previewButton = screen.getByLabelText('Botón de vista previa del material');
        const downloadButton = screen.getByLabelText('Botón de descargar el material');

        expect(name).toBeInTheDocument();
        expect(intro).toBeInTheDocument();
        expect(previewButton).toBeInTheDocument();
        expect(downloadButton).toBeInTheDocument();
 
    });

    it('opens resources modal when clicking on Eye icon', async () => {
        const user = userEvent.setup();
        render(<ResourcesCard resource={mockResourcesCard} />)

        const previewButton = screen.getByLabelText('Botón de vista previa del material');
        await user.click(previewButton);

        const modal = screen.getByRole('dialog') || screen.getByText(mockResourcesCard.name);
        expect(modal).toBeInTheDocument();
    });

    it('triggers download when clicking on Download icon', async () => {
        const user = userEvent.setup();
        
        const mockLink = {
            href: '',
            download: '',
            target: '',
            click: vi.fn()
        };
        
        const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue(mockLink);

        render(<ResourcesCard resource={mockResourcesCard} />);

        const downloadButton = screen.getByLabelText('Botón de descargar el material');
        await user.click(downloadButton);

        expect(createElementSpy).toHaveBeenCalledWith('a');
        expect(mockLink.href).toBe('http://localhost:8080/uploads/daltonismo-guia.pdf');
        expect(mockLink.download).toBe('Material de Daltonismo.pdf');
        expect(mockLink.target).toBe('_blank');
        
        expect(mockLink.click).toHaveBeenCalledTimes(1);

        createElementSpy.mockRestore();
    });
})
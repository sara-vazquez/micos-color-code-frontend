import React from "react";
import {render, screen} from '@testing-library/react';
import {describe, it, expect, beforeEach} from 'vitest';
import userEvent from "@testing-library/user-event";
import ResourcesCard from "../../components/resourcesCard/ResourcesCard";

describe('ResourcesCard', () => {
    const mockResourcesCard = {
        name: "Sistema",
        intro: "Póster / tríptico visual del sistema."
    }

    beforeEach(() => {
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

        const modal = screen.getByText(mockResourcesCard.name);
        expect(modal).toBeInTheDocument();
    });

    
})
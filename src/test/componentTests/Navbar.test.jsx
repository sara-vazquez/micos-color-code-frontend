import React from "react";
import { BrowserRouter } from "react-router-dom";
import {render, screen } from '@testing-library/react';
import {describe, it, expect, vi} from 'vitest';
import userEvent from "@testing-library/user-event";
import Navbar from '../../components/navbar/Navbar';

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
      ...actual,
      useLocation: () => ({ pathname: '/home' })
    }
})
describe('Navbar', () => {
    const renderWithRouter = (component) => {
        return render(<BrowserRouter>{component}</BrowserRouter>)
    }
    it('renders navbar with logo and buttons', () => {
        renderWithRouter(<Navbar />)
        expect(screen.getByAltText('logotype')).toBeInTheDocument()
        expect(screen.getByLabelText('Ir al perfil del usuario')).toBeInTheDocument()
        expect(screen.getByLabelText('Abrir el menú de navegación')).toBeInTheDocument()
    })

    it('toggles menu when hamburger button is clicked', async () => {
        const user = userEvent.setup()
        renderWithRouter(<Navbar />)
        
        const menuButton = screen.getByLabelText('Abrir el menú de navegación')
        
        expect(screen.queryByText('Micos color code')).not.toBeVisible()
        
        await user.click(menuButton)
        expect(screen.getByText('Micos color code')).toBeVisible()
        expect(screen.getByLabelText('Cerrar el menú de navegación')).toBeInTheDocument()
        
        await user.click(screen.getByLabelText('Cerrar el menú de navegación'))
        expect(screen.queryByText('Micos color code')).not.toBeVisible()
    })

    it('renders all navigation links', async () => {
        const user = userEvent.setup()
        renderWithRouter(<Navbar />)
        
        await user.click(screen.getByLabelText('Abrir el menú de navegación'))
        
        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Micos color code')).toBeInTheDocument()
        expect(screen.getByText('Daltonismo')).toBeInTheDocument()
        expect(screen.getByText('¡A jugar!')).toBeInTheDocument()
        expect(screen.getByText('Recursos')).toBeInTheDocument()
    })

    it('closes menu when clicking the overlay', async () => {
        const user = userEvent.setup()
        renderWithRouter(<Navbar />)
        
        await user.click(screen.getByLabelText('Abrir el menú de navegación'))
        expect(screen.getByText('Home')).toBeVisible()
        
        const overlay = document.querySelector('.hamburger-menu__overlay')
        await user.click(overlay)
        
        expect(screen.queryByText('Home')).not.toBeVisible()
    })
})

import React from 'react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardPage from '../../pages/dashboardPage/DashboardPage';
import { getAdminResources, createResource, updateResource, deleteResource } from '../../services/resourcesService';

vi.mock('../../services/resourcesService', () => ({
    getAdminResources: vi.fn(),
    createResource: vi.fn(),
    updateResource: vi.fn(),
    deleteResource: vi.fn()
}));

vi.mock('../../components/addButton/AddButton', () => ({
    default: ({ onClick }) => (
        <button onClick={onClick} data-testid="add-button">
            Añadir
        </button>
    )
}));

vi.mock('../../components/resourcesTable/ResourcesTable', () => ({
    default: ({ data, onEdit, onDelete }) => (
        <div data-testid="resources-table">
            {data.length === 0 ? (
                <p>No hay recursos</p>
            ) : (
                data.map(resource => (
                    <div key={resource.id} data-testid={`resource-${resource.id}`}>
                        <span>{resource.name}</span>
                        <span>{resource.intro}</span>
                        <button onClick={() => onEdit(resource)}>Editar</button>
                        <button onClick={() => onDelete(resource.id)}>Eliminar</button>
                    </div>
                ))
            )}
        </div>
    )
}));

vi.mock('../../components/addModal/AddModal', () => ({
    default: ({ resource, onSave, onClose }) => (
        <div role="dialog" data-testid="add-modal">
            <h2>{resource ? 'Editar Recurso' : 'Añadir Recurso'}</h2>
            <button onClick={() => onSave({ name: 'Test Resource', intro: 'Test intro' })}>
                Guardar
            </button>
            <button onClick={onClose}>Cerrar</button>
        </div>
    )
}));

describe('DashboardPage', () => {
    const mockResources = [
        {
            id: 1,
            name: 'Recurso de Daltonismo',
            intro: 'Guía sobre daltonismo',
            pdfFile: '/uploads/daltonismo.pdf'
        },
        {
            id: 2,
            name: 'Material de Apoyo',
            intro: 'Material educativo',
            pdfFile: '/uploads/material.pdf'
        },
        {
            id: 3,
            name: 'Guía de Protanopia',
            intro: 'Información sobre protanopia',
            pdfFile: '/uploads/protanopia.pdf'
        }
    ];

    beforeEach(() => {
        vi.clearAllMocks();
        getAdminResources.mockResolvedValue(mockResources);
        createResource.mockResolvedValue({ id: 4, name: 'Nuevo recurso' });
        updateResource.mockResolvedValue({ id: 1, name: 'Recurso actualizado' });
        deleteResource.mockResolvedValue({});
    });

    const renderComponent = async (searchTerm = '') => {
        const result = render(<DashboardPage searchTerm={searchTerm} />);
        
        await waitFor(() => {
            expect(screen.queryByText('Cargando recursos...')).not.toBeInTheDocument();
        });
        
        return result;
    };

    describe('Initial Rendering', () => {
        it('shows loading state initially', () => {
            getAdminResources.mockImplementation(() => new Promise(() => {}));
            
            render(<DashboardPage searchTerm="" />);

            expect(screen.getByText('Cargando recursos...')).toBeInTheDocument();
        });

        it('renders dashboard correctly after loading', async () => {
            await renderComponent();

            expect(screen.getByTestId('resources-table')).toBeInTheDocument();
            expect(screen.getByTestId('add-button')).toBeInTheDocument();
        });

        it('fetches resources on mount', async () => {
            await renderComponent();

            expect(getAdminResources).toHaveBeenCalledTimes(1);
        });

        it('displays all resources', async () => {
            await renderComponent();

            expect(screen.getByText('Recurso de Daltonismo')).toBeInTheDocument();
            expect(screen.getByText('Material de Apoyo')).toBeInTheDocument();
            expect(screen.getByText('Guía de Protanopia')).toBeInTheDocument();
        });
    });

    describe('Search Functionality', () => {
        it('filters resources by name', async () => {
            await renderComponent('Daltonismo');

            expect(screen.getByText('Recurso de Daltonismo')).toBeInTheDocument();
            expect(screen.queryByText('Material de Apoyo')).not.toBeInTheDocument();
            expect(screen.queryByText('Guía de Protanopia')).not.toBeInTheDocument();
        });

        it('filters resources by intro', async () => {
            await renderComponent('educativo');

            expect(screen.getByText('Material de Apoyo')).toBeInTheDocument();
            expect(screen.queryByText('Recurso de Daltonismo')).not.toBeInTheDocument();
        });

        it('is case insensitive', async () => {
            await renderComponent('DALTONISMO');

            expect(screen.getByText('Recurso de Daltonismo')).toBeInTheDocument();
        });

        it('shows all resources when searchTerm is empty', async () => {
            await renderComponent('');

            expect(screen.getByText('Recurso de Daltonismo')).toBeInTheDocument();
            expect(screen.getByText('Material de Apoyo')).toBeInTheDocument();
            expect(screen.getByText('Guía de Protanopia')).toBeInTheDocument();
        });

        it('shows no resources when no match', async () => {
            await renderComponent('NoExiste');

            expect(screen.queryByText('Recurso de Daltonismo')).not.toBeInTheDocument();
            expect(screen.queryByText('Material de Apoyo')).not.toBeInTheDocument();
        });
    });

    describe('Add Modal', () => {
        it('opens add modal when add button is clicked', async () => {
            const user = userEvent.setup();
            await renderComponent();

            const addButton = screen.getByTestId('add-button');
            await user.click(addButton);

            await waitFor(() => {
                expect(screen.getByTestId('add-modal')).toBeInTheDocument();
            });
            
            expect(screen.getByText('Añadir Recurso')).toBeInTheDocument();
        });

        it('closes modal when close button is clicked', async () => {
            const user = userEvent.setup();
            await renderComponent();

            const addButton = screen.getByTestId('add-button');
            await user.click(addButton);

            await waitFor(() => {
                expect(screen.getByTestId('add-modal')).toBeInTheDocument();
            });

            const closeButton = screen.getByText('Cerrar');
            await user.click(closeButton);

            await waitFor(() => {
                expect(screen.queryByTestId('add-modal')).not.toBeInTheDocument();
            });
        });

        it('creates new resource when save is clicked', async () => {
            const user = userEvent.setup();
            await renderComponent();

            const addButton = screen.getByTestId('add-button');
            await user.click(addButton);

            await waitFor(() => {
                expect(screen.getByTestId('add-modal')).toBeInTheDocument();
            });

            const saveButton = screen.getByText('Guardar');
            await user.click(saveButton);

            await waitFor(() => {
                expect(createResource).toHaveBeenCalledWith({
                    name: 'Test Resource',
                    intro: 'Test intro'
                });
            });

            expect(getAdminResources).toHaveBeenCalledTimes(2);
        });
    });

    describe('Edit Modal', () => {
        it('opens edit modal when edit button is clicked', async () => {
            const user = userEvent.setup();
            await renderComponent();

            const editButtons = screen.getAllByText('Editar');
            await user.click(editButtons[0]);

            await waitFor(() => {
                expect(screen.getByTestId('add-modal')).toBeInTheDocument();
            });
            
            expect(screen.getByText('Editar Recurso')).toBeInTheDocument();
        });

        it('updates resource when save is clicked in edit mode', async () => {
            const user = userEvent.setup();
            await renderComponent();

            const editButtons = screen.getAllByText('Editar');
            await user.click(editButtons[0]);

            await waitFor(() => {
                expect(screen.getByTestId('add-modal')).toBeInTheDocument();
            });

            const saveButton = screen.getByText('Guardar');
            await user.click(saveButton);

            await waitFor(() => {
                expect(updateResource).toHaveBeenCalledWith(
                    1,
                    { name: 'Test Resource', intro: 'Test intro' }
                );
            });

            expect(getAdminResources).toHaveBeenCalledTimes(2);
        });
    });

    describe('Delete Functionality', () => {
        it('shows confirmation dialog when delete is clicked', async () => {
            const user = userEvent.setup();
            const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
            
            await renderComponent();

            const deleteButtons = screen.getAllByText('Eliminar');
            await user.click(deleteButtons[0]);

            expect(confirmSpy).toHaveBeenCalledWith('¿Seguro que quieres eliminar este recurso?');
            
            confirmSpy.mockRestore();
        });

        it('deletes resource when confirmed', async () => {
            const user = userEvent.setup();
            const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
            
            await renderComponent();

            const deleteButtons = screen.getAllByText('Eliminar');
            await user.click(deleteButtons[0]);

            await waitFor(() => {
                expect(deleteResource).toHaveBeenCalledWith(1);
            });

            expect(getAdminResources).toHaveBeenCalledTimes(2);
            
            confirmSpy.mockRestore();
        });

        it('does not delete resource when cancelled', async () => {
            const user = userEvent.setup();
            const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);
            
            await renderComponent();

            const deleteButtons = screen.getAllByText('Eliminar');
            await user.click(deleteButtons[0]);

            expect(deleteResource).not.toHaveBeenCalled();
            expect(getAdminResources).toHaveBeenCalledTimes(1);
            
            confirmSpy.mockRestore();
        });
    });

    describe('Error Handling', () => {
        it('shows error message when fetch fails', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            getAdminResources.mockRejectedValue(new Error('Network error'));

            render(<DashboardPage searchTerm="" />);

            await waitFor(() => {
                expect(screen.getByText('Error al cargar los recursos')).toBeInTheDocument();
            });
            
            consoleErrorSpy.mockRestore();
        });

        it('shows error when create fails', async () => {
            const user = userEvent.setup();
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            createResource.mockRejectedValue(new Error('Create error'));
            
            await renderComponent();

            const addButton = screen.getByTestId('add-button');
            await user.click(addButton);

            await waitFor(() => {
                expect(screen.getByTestId('add-modal')).toBeInTheDocument();
            });

            const saveButton = screen.getByText('Guardar');
            await user.click(saveButton);

            await waitFor(() => {
                expect(screen.getByText('Error al guardar el recurso')).toBeInTheDocument();
            });
            
            consoleErrorSpy.mockRestore();
        });

        it('shows error when update fails', async () => {
            const user = userEvent.setup();
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            updateResource.mockRejectedValue(new Error('Update error'));
            
            await renderComponent();

            const editButtons = screen.getAllByText('Editar');
            await user.click(editButtons[0]);

            await waitFor(() => {
                expect(screen.getByTestId('add-modal')).toBeInTheDocument();
            });

            const saveButton = screen.getByText('Guardar');
            await user.click(saveButton);

            await waitFor(() => {
                expect(screen.getByText('Error al guardar el recurso')).toBeInTheDocument();
            });
            
            consoleErrorSpy.mockRestore();
        });

        it('shows error when delete fails', async () => {
            const user = userEvent.setup();
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
            deleteResource.mockRejectedValue(new Error('Delete error'));
            
            await renderComponent();

            const deleteButtons = screen.getAllByText('Eliminar');
            await user.click(deleteButtons[0]);

            await waitFor(() => {
                expect(screen.getByText('Error al eliminar el recurso')).toBeInTheDocument();
            });
            
            consoleErrorSpy.mockRestore();
            confirmSpy.mockRestore();
        });
    });
});
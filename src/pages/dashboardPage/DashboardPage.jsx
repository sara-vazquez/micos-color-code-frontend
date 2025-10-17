import React, { useState, useEffect } from 'react';
import './DashboardPage.css';
import AddButton from '../../components/addButton/AddButton';
import ResourcesTable from '../../components/resourcesTable/ResourcesTable';
import SearchInput from '../../components/searchInput/SearchInput';
import AddModal from '../../components/addModal/AddModal';
import NavbarAdmin from '../../components/navbarAdmin/NavbarAdmin';
// import { getResources, createResource, updateResource, deleteResource } from '../../services/resourcesService';

export default function DashboardPage() {
    const [resources, setResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingResource, setEditingResource] = useState(null); // use null for create and object for edit
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        setLoading(true);
        try {
            // const data = await getResources();
            // setResources(data);
            // setFilteredResources(data);
            
            setResources([]);
            setFilteredResources([]);
        } catch (err) {
            setError('Error al cargar los recursos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchTerm) => {
        const filtered = resources.filter(resource =>
            resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.intro.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredResources(filtered);
    };

    const handleSaveResource = async (resourceData) => {
        try {
            if (editingResource) {
                // const updated = await updateResource(editingResource.id, resourceData);
                // setResources(resources.map(r => r.id === editingResource.id ? updated : r));
                
                // TODO: Reemplazar con llamada real al backend
                setResources(resources.map(r => 
                    r.id === editingResource.id ? { ...r, ...resourceData } : r
                ));
            } else {
                // const newResource = await createResource(resourceData);
                // setResources([...resources, newResource]);
                
                // TODO: Reemplazar con llamada real al backend
                const newResource = {
                    id: Date.now(),
                    ...resourceData
                };
                setResources([...resources, newResource]);
            }
            setFilteredResources(resources);
            handleCloseModal();
        } catch (err) {
            console.error('Error al guardar recurso:', err);
            setError('Error al guardar el recurso');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este recurso?')) {
            try {
                // await deleteResource(id);
                
                // TODO: Reemplazar con llamada real al backend
                const updated = resources.filter(r => r.id !== id);
                setResources(updated);
                setFilteredResources(updated);
            } catch (err) {
                console.error('Error al eliminar recurso:', err);
                setError('Error al eliminar el recurso');
            }
        }
    };

    const handleOpenAddModal = () => {
        setEditingResource(null); //just for add a new resource
        setShowModal(true);
    }

    const handleOpenEditModal = (resource) => {
        setEditingResource(resource); //opens addModal to edit the resource
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingResource(null);
    }

    const handleSaveResource = (resourceData) => {
        if (editingResource) {
            // PUT: updates existing resource
            setResources(resources.map(r => 
                r.id === editingResource.id ? { ...r, ...resourceData } : r
            ));
        } else {
            // POST: create new resource 
            const newResource = {
                id: Date.now(), // o generar ID apropiado
                ...resourceData
            };
            setResources([...resources, newResource]);
        }
        handleCloseModal();
    };

    
    const handleDelete = async (id) => {
        if (window.confirm('¿Eliminar este recurso?')) {
          // await fetch(`/resources/${id}`, { method: 'DELETE' });
          setResources(resources.filter(r => r.id !== id));
        }
    };
      
    return(
        <section className="dashboard-page">
            <header className="dashboard-page__header">
                <NavbarAdmin />
            </header>
            <main className="dashboard-page__content">
            {error && <p className="dashboard-page__error">{error}</p>}
                <article className="dashboard-page__search-input">
                <SearchInput onSearch={handleSearch} />
                </article>
                {loading ? (
                    <p>Cargando recursos...</p>
                ) : (
                    <ResourcesTable 
                        data={filteredResources}
                        onEdit={handleOpenEditModal}
                        onDelete={handleDelete}
                    />
                )}
                <article className="dashboard-page__btn">
                    <AddButton onClick={handleOpenAddModal}/>
                </article>
            </main>
            {showModal && (<AddModal resource={editingResource} onSave={handleSaveResource} onClose={handleCloseModal}/>)}
        </section>
    );
}
import React, { useState, useEffect, useMemo } from 'react';
import { SearchProvider } from '../../contexts/SearchContext';
import './DashboardPage.css';
import AddButton from '../../components/addButton/AddButton';
import ResourcesTable from '../../components/resourcesTable/ResourcesTable';
import AddModal from '../../components/addModal/AddModal';
import { getAdminResources, createResource, updateResource, deleteResource } from '../../services/resourcesService';

export default function DashboardPage() {
    const [resources, setResources] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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
          const data = await getAdminResources();
          setResources(data);
        } catch (err) {
          setError('Error al cargar los recursos');
          console.error('❌', err);
        } finally {
          setLoading(false);
        }
      };

      const handleSearch = (term) => {
        setSearchTerm(term); 
    };

    const resourcesToShow = useMemo(() => {
        if (!searchTerm) {
            return resources;
        }

        const term = searchTerm.toLowerCase();
        
        return resources.filter(r =>
            r.name.toLowerCase().includes(term) ||
            r.intro.toLowerCase().includes(term) 
        );
    }, [resources, searchTerm]);
    
      const handleSaveResource = async (resourceData) => {
        try {
          if (editingResource) {
            await updateResource(editingResource.id, resourceData);
          } else {
            await createResource(resourceData);
          }
          
          await fetchResources();
          handleCloseModal();
        } catch (err) {
          console.error('❌ Error al guardar recurso:', err);
          setError('Error al guardar el recurso');
        }
    };
    
      const handleDelete = async (id) => {
        if (window.confirm('¿Seguro que quieres eliminar este recurso?')) {
          try {
            await deleteResource(id);
            const updated = resources.filter(r => r.id !== id);
            setResources(updated);
          } catch (err) {
            console.error('❌ Error al eliminar recurso:', err);
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
      
    return(
      <SearchProvider handleSearch={handleSearch}>
        <section className="dashboard-page">
            <main className="dashboard-page__content">
            {error && <p className="dashboard-page__error">{error}</p>}
                {loading ? (
                    <p className="dashboard-page__loading">Cargando recursos...</p>
                ) : (
                    <ResourcesTable 
                        data={resourcesToShow}
                        onEdit={handleOpenEditModal}
                        onDelete={handleDelete}
                    />
                )}
            </main>
            <AddButton onClick={handleOpenAddModal}/>
            {showModal && (<AddModal resource={editingResource} onSave={handleSaveResource} onClose={handleCloseModal}/>)}
        </section>
        </SearchProvider>
    );
}
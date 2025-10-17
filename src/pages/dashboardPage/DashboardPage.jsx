import React, { useState } from 'react';
import './DashboardPage.css';
import AddButton from '../../components/addButton/AddButton';
import ResourcesTable from '../../components/resourcesTable/ResourcesTable';
import SearchInput from '../../components/searchInput/SearchInput';
import AddModal from '../../components/addModal/AddModal';
import NavbarAdmin from '../../components/navbarAdmin/NavbarAdmin';

export default function DashboardPage() {
    const [resources, setResources] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingResource, setEditingResource] = useState(null); // use null for create and object for edit

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
                <article className="dashboard-page__search-input">
                <SearchInput />
                </article>
                <ResourcesTable 
                data={resources}
                onEdit={handleOpenEditModal}
                onDelete={handleDelete}/>

                <article className="dashboard-page__btn">
                    <AddButton onClick={handleOpenAddModal}/>
                </article>
            </main>
            {showModal && (<AddModal resource={editingResource} onSave={handleSaveResource} onClose={handleCloseModal}/>)}
        </section>
    );
}
import React, { useState } from 'react';
import './DashboardPage.css';
import AddButton from '../../components/addButton/AddButton';
import ResourcesTable from '../../components/resourcesTable/ResourcesTable';
import SearchInput from '../../components/searchInput/SearchInput';

export default function DashboardPage() {
    const [resources, setResources] = useState([]);

    const handleEdit = (resource) => {
        console.log('Editar:', resource);
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
                <SearchInput />
            </header>
            <main className="dashboard-page__content">
                <ResourcesTable 
                data={resources}
                onEdit={handleEdit}
                onDelete={handleDelete}/>

                <article className="dashboard-page__btn">
                    <AddButton />
                </article>
            </main>

        </section>
    );
}
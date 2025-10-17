import React from 'react';
import './ResourcesTable.css';
import { Pencil, Trash2 } from 'lucide-react';

export default function ResourcesTable({data, onEdit, onDelete}) {
    return(
        <section className="resources-table__container">
            <table className="resources-table">
                <thead className="resources-table__thread">
                  <tr>
                      <th>Imagen</th>
                      <th>PDF</th>
                      <th>Nombre</th>
                      <th>Intro</th>
                      <th>Descripción</th>
                      <th>Acciones</th>
                    </tr>
                </thead>
                <tbody className='resources-table__body'>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="resources-table--empty">
                No hay recursos disponibles
              </td>
            </tr>
          ) : (
            data.map((resource) => (
              <tr key={resource.id}>
                <td className="resources-table__img-cell">
                  <img 
                    src={resource.imageFile} 
                    alt={resource.name}
                    className="resources-table__img"
                  />
                </td>
                <td className="resources-table__pdf-cell">
                  <span className="resources-table__pdf">{resource.pdfFile}</span>
                </td>
                <td className="resources-table__name-cell">
                  {resource.name}
                </td>
                <td className="resources-table__intro-cell">
                  {resource.intro}
                </td>
                <td className="resources-table__description-cell">
                  {resource.description}
                </td>
                <td className="resources-table__actions-cell">
                  <button onClick={() => onEdit(resource)} className="btn-edit" aria-label="Editar recurso">
                    <Pencil size={24} />
                  </button>
                  <button onClick={() => onDelete(resource.id)} className="btn-delete" aria-label="Eliminar recurso">
                    <Trash2 size={24} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
            </table>
        </section>
    );
}
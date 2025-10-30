import React, {useState} from 'react';
import './ResourcesCard.css';
import { Eye, Download } from 'lucide-react';
import ModalResources from '../modalResources/ModalResources';

export default function ResourcesCard({ resource }) {
    const [openModalResources, setOpenModalResources] = useState(false);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL  || 'http://localhost:8080';

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `${API_BASE_URL}${resource.pdfFile}`;
        link.download = resource.name + '.pdf';
        link.target = '_blank';
        link.click();
    };

        if(openModalResources) return <ModalResources resource={resource} onClose={() => setOpenModalResources(false)}/>

    return(
        <>
        <section className='resources-card__container'>
            <article className="daltonsim-card__content">
                <h3 className='resources-card__h3'>{resource.name}</h3>
                <p className="resources-card__text">{resource.intro}</p>
            </article>
            <article className="resources-card__actions">
                <button className="resources-card__icon" aria-label="Botón de vista previa del material" onClick={() => setOpenModalResources(true)}>
                    <Eye />
                </button>
                <button className="resources-card__icon" aria-label="Botón de descargar el material" onClick={handleDownload}>
                    <Download />
                </button>
            </article>
        </section>
        </>
    )
}
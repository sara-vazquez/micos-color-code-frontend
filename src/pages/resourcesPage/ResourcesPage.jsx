import React, {useState, useEffect} from 'react';
import './ResourcesPage.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import FeedbackButton from '../../components/feedbackButtons/FeedbackButton';
import ResourcesCard from '../../components/resourcesCard/ResourcesCard';
import ScrollUpButton from '../../components/scrollUpButtons/ScrollUpButton';
import { getResources } from '../../services/resourcesService';


export default function ResourcesPage() {
    const navigate = useNavigate();
    const [resources, setResources] = useState([]);
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
            
            // TODO: Reemplazar con llamada real al backend
            setResources([]);
        } catch (err) {
            setError('Error al cargar los recursos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    }

    return(
        <section className="resources__page" id="top">
            <article className='resources__intro'>
                <article className="resources__header">
                    <button className="resources__back" aria-label="botón para volver atrás" onClick={handleBack}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </button>
                    <h1 className="resources__title" aria-label='título de la página actual'>Recursos</h1>
                </article>
                <p className='resources__text' aria-label="texto descriptivo de la página actual">Te presentamos la sección de recursos, donde podrás descargar diferentes materiales gráficos para que los peques sigan practicando mientras se manchan las manitas 🎨.</p>
            </article>
            <article className="resources__content">
            {loading && <p>Cargando recursos...</p>}
                {error && <p className="resources__error">{error}</p>}
                
                {!loading && !error && resources.length === 0 && (
                    <p>No hay recursos disponibles en este momento.</p>
                )}

                {!loading && resources.map((resource) => (
                    <ResourcesCard 
                        key={resource.id}
                        resource={resource}
                    />
                ))}
            </article>
            <article className='resources__actions'>
                <ScrollUpButton />
                <FeedbackButton className="feedback__flying-button" />
            </article>
        </section>
    );
}
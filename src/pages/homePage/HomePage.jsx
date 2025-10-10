import React from 'react';
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import Navbar from '../../components/navbar/Navbar';
import Button from '../../components/buttons/Button'
import FeedbackButton from '../../components/feedbackButtons/FeedbackButton';
import LetsPlayButton from '../../components/letsPlayButtons/LetsPlayButton';
import ResourceButton from '../../components/resourcesButtons/ResourceButton';
import DaltonicButton from '../../components/daltonicButtons/DaltonicButton';
import Footer from '../../components/footer/Footer';

export default function HomePage() {
    
    const navigate = useNavigate();
    const goToSystem = () => { navigate("/system"); }
    const goToDaltonism = () => { navigate("/daltonism"); }

    
    return(
        <div className="homepage">
        <Navbar />
        <section className = "homepage__intro">
            <h1 className = "homepage_title-h1">¿Qué es Micos Color Code?</h1>
            <p className = "homepage__text">Micos es un sistema visual creado para niños y niñas de entre <strong>3 y 8 años con daltonismo dicromático.</strong> El objetivo es <strong>facilitar el aprendizaje de los colores</strong> mediante formas geométricas y su superposición.
            </p>
            <Button variant="primary" aria-label="Ir a la página de información sobre el sistema" onClick={goToSystem}>Saber más →</Button>
        </section>
        <FeedbackButton className="feedback__flying-button"/>
      
        <section className="buttons__container">
            <LetsPlayButton  aria-label="Ir a la página de juegos en línea" />
            <ResourceButton  aria-label="Ir a la página de recursos descargables" />
            <DaltonicButton  aria-label="Ir a la página de información sobre el daltonismo" onClick={goToDaltonism}/>
        </section>
        
        <Footer />
            </div>
    )
}
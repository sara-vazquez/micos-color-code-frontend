import React from 'react';
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import Navbar from '../components/navbar/Navbar';
import Button from '../components/buttons/Button'
import FeedbackButton from '../components/feedbackButtons/FeedbackButton';
import LetsPlayButton from '../components/letsPlayButtons/LetsPlayButton';
import ResourceButton from '../components/resourcesButtons/ResourceButton';
import DaltonicButton from '../components/daltonicButtons/DaltonicButton';
import Footer from '../components/footer/Footer';

export default function HomePage() {
    
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/system");
    }
    
    return(
        <div className="homepage">
        <Navbar />
        <div className = "homepage__intro">
            <h1 className = "homepage_title-h1">¿Qué es Micos Color Code?</h1>
            <p className = "homepage__text">Micos es un sistema visual creado para niños y niñas de entre 3 y 8 años con daltonismo dicromático. El objetivo es <strong>facilitar el aprendizaje de los colores</strong> mediante formas geométricas y su superposición.
            </p>
            <Button variant="primary" onClick={handleClick}>Saber más →</Button>
        </div>
        <FeedbackButton />
      
        <div className="buttons__container">
            <LetsPlayButton onClick={handleClick}/>
            <ResourceButton onClick={handleClick}/>
            <DaltonicButton onClick={handleClick}/>
        </div>
        
        <Footer />
            </div>
    )
}
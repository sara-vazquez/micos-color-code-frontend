import React from 'react';
import './HomePage.css';
import Navbar from '../components/navbar/Navbar';
import Button from '../components/buttons/Button'
import FeedbackButton from '../components/feedbackButtons/FeedbackButton';
import LetsPlayButton from '../components/letsPlayButtons/LetsPlayButton';
import ResourceButton from '../components/resourcesButtons/ResourceButton';
import DaltonicButton from '../components/daltonicButtons/DaltonicButton';
import Footer from '../components/footer/Footer';

export default function HomePage() {
    return(
        <>
        <Navbar />
        <Button variant="primary">Saber más →</Button>
        <FeedbackButton />
        <div className="buttons__container">
            <LetsPlayButton />
            <ResourceButton />
            <DaltonicButton />
        </div>
        
        <Footer />
            </>
    )
}
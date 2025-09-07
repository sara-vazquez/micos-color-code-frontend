import React from 'react'
import Button from './components/buttons/Button'
import "./components/styles/Variables.css";
import './App.css'
import FeedbackButton from './components/feedbackButtons/FeedbackButton';
import ScrollUpButton from './components/scrollUpButtons/ScrollUpButton';
import LetsPlayButton from './components/letsPlayButtons/LetsPlayButton';
import ResourceButton from './components/resourcesButtons/ResourceButton';
import DaltonicButton from './components/daltonicButtons/DaltonicButton';
import Navbar from './components/navbar/Navbar'


function App() {

  return (
    <>
    <Navbar/>
    <Button variant="primary">ACEPTAR</Button>
    <Button variant="secondary">CANCELAR</Button>
    <FeedbackButton />
    <ScrollUpButton />
    <LetsPlayButton />
    <ResourceButton />
    <DaltonicButton />
    </>
  )
}

export default App;

import React from 'react'
import Button from './components/buttons/Button'
import "./components/styles/Variables.css";
import './App.css'
import FeedbackButton from './components/feedbackButtons/FeedbackButton';
import ScrollUpButton from './components/scrollUpButtons/ScrollUpButton';
import LetsPlayButton from './components/letsPlayButtons/LetsPlayButton';

function App() {

  return (
    <>
    <Button variant="primary">ACEPTAR</Button>
    <Button variant="secondary">CANCELAR</Button>
    <FeedbackButton />
    <ScrollUpButton />
    <LetsPlayButton />
    <Button />
    <Button />
    </>
  )
}

export default App;

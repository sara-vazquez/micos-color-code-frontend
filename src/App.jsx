import React from 'react'
import Button from './components/buttons/Button'
import "./components/styles/Variables.css";
import './App.css'
import FeedbackButton from './components/feedbackButtons/FeedbackButton';

function App() {

  return (
    <>
    <Button variant="primary">ACEPTAR</Button>
    <Button variant="secondary">CANCELAR</Button>
    <FeedbackButton />
    <Button />
    <Button />
    <Button />
    <Button />
    </>
  )
}

export default App;

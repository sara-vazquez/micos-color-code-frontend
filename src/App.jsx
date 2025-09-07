import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import "./components/styles/Variables.css";
import './App.css'
import HomePage from './pages/HomePage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import "./components/styles/Variables.css";
import './App.css'
import HomePage from './pages/HomePage';
import SystemPage from './pages/SystemPage';
import DaltonismPage from './pages/DaltonismPage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/system" element={<SystemPage />} />
        <Route path="/daltonism" element={<DaltonismPage />} />
      </Routes>
    </Router>
  )
}

export default App;

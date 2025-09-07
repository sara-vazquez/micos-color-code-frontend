import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import "./components/styles/Variables.css";
import './App.css'
import HomePage from './pages/HomePage';
import SystemPage from './pages/SystemPage';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<SystemPage />} />
      </Routes>
    </Router>
  )
}

export default App;

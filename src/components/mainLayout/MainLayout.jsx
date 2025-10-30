import React from 'react';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import './MainLayout.css';

export default function MainLayout({children, backgroundColor}) {
    return (
        <div className="main-layout" style={{ backgroundColor: backgroundColor || 'var(--white)' }}>
          <Navbar />
          <main className="main-layout__content">
            {children}
          </main>
          <Footer />
        </div>
      );
    }
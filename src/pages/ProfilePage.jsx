import React from "react";
import './ProfilePage.css';
import Navbar from '../components/navbar';
import Button from '../components/buttons/Button';
import Footer from '../components/footer/Footer';

export default function ProfilePage() {
    return(
        <>
        <Navbar />
        <header>
            <h1 className="profile__title">¡Hola `${}`</h1>
        </header>
        <section className="profile__container">

        <Button variant = "primary">Guardar</Button>
        </section>
        <Footer />
        </>
    )
}
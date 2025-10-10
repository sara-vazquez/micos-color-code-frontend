import React from "react";
import './ProfilePage.css';
import Navbar from '../components/navbar';
import Button from '../components/buttons/Button';
import Footer from '../components/footer/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ProfilePage() {
    return(
        <>
        <Navbar />
        <header className="profile__header">
            <button className="profile__back" aria-label="botón para volver atrás">
                <FontAwesomeIcon icon={faArrowLeft}/>
            </button>
            <h1 className="profile__title">¡Hola {username}</h1>
            <button className="profile__menu" aria-label="menú opciones del perfil">
                <FontAwesomeIcon icon={faEllipsisVertical}/>
            </button>
        </header>
        <section className="profile__container">
            <p className="profile__text">{username}</p>
            <p className="profile__text">{email}</p>
            <p className="profile__text">{password}</p>
        </section>
        <Footer />
        </>
    )
}
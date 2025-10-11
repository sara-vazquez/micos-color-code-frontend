import React from 'react';
import './Navbar.css';
import Logo from '../../assets/micosLogo.svg';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";


export default function Navbar() {
    return(
        <>
        <header className= "navbar">
            <div className= "navbar__container">
                <div className= "logo__container">
                    <Link to="/home" aria-label="Ir de vuelta a la home">
                    <img src={Logo} alt="logotype" className="logo"></img>
                    </Link>
                </div>
                <div className="navbar__buttons">
                <Link to="/profile" className="profile__button" aria-label="Ir al perfil del usuario">
                    <FontAwesomeIcon icon={faCircleUser} />
                </Link>
                <button className="menu__button" aria-label="Ir al menú de navegación">
                    <FontAwesomeIcon icon={faBars}/>
                </button>
                </div>
            </div>
        </header>
        </>
    );
}
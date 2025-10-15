import React, {useState} from 'react';
import './Navbar.css';
import Logo from '../../assets/micosLogo.svg';
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";


export default function Navbar({backgroundColor}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    // Verify if path's active
    const isActive = (path) => {
        return location.pathname === path;
    };

    return(
        <>
        <header className= "navbar">
            <section className= "navbar__container">
                <article className= "logo__container">
                    <Link to="/home" aria-label="Ir de vuelta a la home">
                    <img src={Logo} alt="logotype" className="logo"></img>
                    </Link>
                </article>
                <article className="navbar__buttons">
                <Link to="/profile" className="profile__button" aria-label="Ir al perfil del usuario">
                    <FontAwesomeIcon icon={faCircleUser} />
                </Link>
                <button className="menu__button" aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"} onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars}/>
                </button>
                </article>
            </section>
        </header>

         {/* menu */}
         <section className={`hamburger-menu ${isMenuOpen ? 'hamburger-menu--open' : ''}`} style={{ backgroundColor: backgroundColor || 'var(--white)' }}>
                <nav className="hamburger-menu__nav">
                    <Link 
                        to="/home" 
                        className={`hamburger-menu__link ${isActive('/home') ? 'hamburger-menu__link--active' : ''}`}
                        onClick={closeMenu}>Home
                    </Link>
                    
                    <Link 
                        to="/system" 
                        className={`hamburger-menu__link ${isActive('/system') ? 'hamburger-menu__link--active' : ''}`}
                        onClick={closeMenu}>Sistema
                    </Link>
                    
                    <Link 
                        to="/daltonism" 
                        className={`hamburger-menu__link ${isActive('/daltonism') ? 'hamburger-menu__link--active' : ''}`}
                        onClick={closeMenu}>Daltonismo
                    </Link>
                    
                    <Link 
                        to="/play" 
                        className={`hamburger-menu__link ${isActive('/play') ? 'hamburger-menu__link--active' : ''}`}
                        onClick={closeMenu}>¡A jugar!
                    </Link>
                    
                    <Link 
                        to="/resources" 
                        className={`hamburger-menu__link ${isActive('/resources') ? 'hamburger-menu__link--active' : ''}`}
                        onClick={closeMenu}>Recursos
                    </Link>
                </nav>
            </section>

            {/* menu overlay => close when click outside */}
            {isMenuOpen && (
                <div 
                    className="hamburger-menu__overlay" 
                    onClick={closeMenu}
                ></div>
            )}
        </>
    );
}
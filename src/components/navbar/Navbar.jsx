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
                    <Link to="/users/home" aria-label="Ir de vuelta a la home">
                    <img src={Logo} alt="logotype" className="logo"></img>
                    </Link>
                </article>
                <article className="navbar__buttons">
                <Link to="/users/profile" className="profile__button" aria-label="Ir al perfil del usuario">
                    <FontAwesomeIcon icon={faCircleUser} />
                </Link>
                <button className="menu__button" aria-label={isMenuOpen ? "Cerrar el menú de navegación" : "Abrir el menú de navegación"} onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars}/>
                </button>
                </article>
            </section>
        </header>

         {/* menu */}
         <section className={`hamburger-menu ${isMenuOpen ? 'hamburger-menu--open' : ''}`} style={{ backgroundColor: backgroundColor || 'var(--white)' }}hidden={!isMenuOpen}>
                <nav className="hamburger-menu__nav">
                    <Link 
                        to="/users/home" 
                        className={`hamburger-menu__link ${isActive('/users/home') ? 'hamburger-menu__link--active' : ''}`}
                        onClick={closeMenu}>Home</Link>
                    
                    <Link 
                        to="/users/system" 
                        className={`hamburger-menu__link ${isActive('/users/system') ? 'hamburger-menu__link--active' : ''}`}
                        onClick={closeMenu}>Micos color code</Link>
                    
                    <Link 
                        to="/users/daltonism" 
                        className={`hamburger-menu__link ${isActive('/users/daltonism') ? 'hamburger-menu__link--active' : ''}`}
                        onClick={closeMenu}>Daltonismo</Link>
                    
                    <Link 
                        to="/users/play" 
                        className={`hamburger-menu__link ${isActive('/users/play') ? 'hamburger-menu__link--active' : ''}`}
                        onClick={closeMenu}>¡A jugar!</Link>
                    
                    <Link 
                        to="/users/resources" 
                        className={`hamburger-menu__link ${isActive('/users/resources') ? 'hamburger-menu__link--active' : ''}`}
                        onClick={closeMenu}>Recursos</Link>
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
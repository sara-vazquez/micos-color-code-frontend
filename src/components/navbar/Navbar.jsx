import React from 'react';
import './Navbar.css';
import Logo from '../../assets/micosLogo.svg';
import Menu from './Menu';
import { Link } from 'react-router-dom'


export default function Navbar() {
    return(
        <>
        <header className= "navbar">
            <div className= "navbar__container">
                <div className= "logo__container">
                    <Link to="/">
                    <img src={Logo} alt="logotype" className="logo"></img>
                    </Link>
                </div>
                <div className="navbar__buttons">
                <Profile to="/profile" className="profile__button"/>
                <Menu className="menu__button"/>
                </div>
            </div>
        </header></>
    );
}
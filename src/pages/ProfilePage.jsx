import React from "react";
import './ProfilePage.css';
import Button from '../components/buttons/Button'

export default function ProfilePage() {
    return(
        <>
        <header>
            <h1 className="profile__title">¡Hola `${}`</h1>
        </header>
        <div className="profile__container">

        <Button variant = "primary">Guardar</Button>
        </div>
        </>
    )
}
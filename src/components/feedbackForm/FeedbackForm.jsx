import React, { useState } from 'react';
import './FeedbackForm.css';
import Button from '../buttons/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { sendFeedback } from '../../services/feedbackService';

export default function FeedbackForm({onClose}) {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("📩 Estado antes de enviar:");
        console.log("  Email:", email);
        console.log("  Message:", message);
        console.log("  Email length:", email.length);
        console.log("  Message length:", message.length);

        if(!message.trim()) {
            setStatus("Por favor, escribe tu mensaje antes de enviar");
            return;
        }

        try {
           const payload = { email, message };
        console.log("📦 Payload a enviar:", payload);
        console.log("📦 Payload JSON:", JSON.stringify(payload));
        
        const result = await sendFeedback(payload);
        setStatus(result); 
        setEmail("");
        setMessage("");
    } catch (error) {
        console.error("❌ Error capturado:", error);
        setStatus("Parece que ha habido un error 😔, inténtalo de nuevo");
        }
    }

    return(
        <div className="feedback-form__overlay" onClick={onClose}>
        <form className="feedback-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} >
            <article className="feedback-form__header">
                <button className="feedback-form__exit" aria-label="botón para cerrar el formulario">
                    <FontAwesomeIcon icon={faXmark} onClick={onClose}/>
                </button>
            </article>
            <h2 className='feedback-form__title' aria-label="¡Cuéntanos tu experiencia!">¡Cuéntanos tu experiencia!</h2>
            <article className="feedback-form__info">
                <label className="feedback-form__subtitle" aria-label="Correo electrónico">Correo electrónico</label>
                <input className="feedback-form__input"
                    id="email"
                    type="email"
                    value={email}
                    placeholder="mauriciohidalgo@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                
            </article>
            <article className="feedback-form__textarea">
                <label className="feedback-form__subtitle" aria-label="¿Qué piensas sobre la web? Aceptamos sugerencias">¿Qué piensas sobre la web? Aceptamos sugerencias 😋</label>
                <textarea className="feedback-form__textarea-field"
                id="message"
                value={message}
                placeholder="Escribe aquí tu experiencia y qué mejorarías de la web"
                onChange={(e) => setMessage(e.target.value)}required>
                </textarea>
            </article>
            <Button type="submit" variant="primary">Enviar</Button>
            {status && <p className="feedback-form__status">{status}</p>}
        </form>
        </div>
    );
}
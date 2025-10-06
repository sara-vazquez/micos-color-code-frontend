import React, { useState } from 'react';
import './FeedbackForm.css';
import Button from '../buttons/Button';

export default function FeedbackForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!message.trim()) {
            setStatus("Por favor, escribe tu mensaje antes de enviar");
            return;
        }

        try {
            await sendFeedback({ email, message});
                setStatus("¡Gracias por tu feedback!🤗 ✅");
                setEmail("");
                setMessage("");
        } catch (error) {
            setStatus("Parece que ha habido un error 😔, inténtalo de nuevo")
        }
    }

    return(
        <div className="feedback-form__overlay">
        <form className="feedback-form" onSubmit={handleSubmit}>
            <article className="feedback-form__header">
                <h2 className='feedback-form__title'>¡Cuéntanos tu experiencia!</h2>
            </article>
            <article className="feedback-form__info">
                <label className="feedback-form__subtitle">Correo electrónico</label>
                <input className="feedback-form__input"
                    id="email"
                    type="email"
                    value={email}
                    placeholder="mauriciohidalgo@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                
            </article>
            <article className="feedback-form__textarea">
                <label className="feedback-for__subtitle">¿Qué piensas sobre la web? Aceptamos sugerencias 😋</label>
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
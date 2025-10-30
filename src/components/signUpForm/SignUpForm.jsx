import React, { useState } from 'react';
import './SignUpForm.css';
import Button from '../buttons/Button';
import Captcha from '../captcha/Captcha';

export default function SignUpForm({ onSubmit, loading, error, success, onGoToLogin }) {
    const [formData, setFormData] = useState({
        username: "", 
        email: "", 
        password: "", 
        captchaId: null, 
        captchaAnswer: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCaptchaSolved = ({ captchaId, captchaAnswer }) => {
        setFormData({ ...formData, captchaId, captchaAnswer });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.captchaAnswer) {
            alert("Para registrarte debes resolver el captcha");
            return;
        }

        onSubmit(formData);
    };

    return (
        <>
            <form className="signup-form" onSubmit={handleSubmit}>
                <h1 className='signup-form__title'>Regístrate</h1>
                <section className="signup-form__input-group">
                    <article className="signup-form__input-field">
                        <label className="signup-form__label" htmlFor="username">Nombre de usuario</label>
                        <input 
                            id="username"
                            className="signup-form__input" 
                            name="username" 
                            aria-label="nombre de usuario"
                            value={formData.username} 
                            onChange={handleChange} 
                            placeholder="lisasimpson8" 
                            required
                        />
                    </article>

                    <article className="signup-form__input-field">
                        <label className="signup-form__label" htmlFor="email">Correo electrónico</label>
                        <input 
                            id="email"
                            className="signup-form__input" 
                            name="email"
                            type="email"
                            aria-label="correo electrónico"
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="lisasimpson@gmail.com" 
                            required
                        />
                    </article>

                    <article className="signup-form__input-field">
                        <label className="signup-form__label" htmlFor="password">Contraseña</label>
                        <input 
                            id="password"
                            className="signup-form__input" 
                            name="password" 
                            type="password" 
                            aria-label="contraseña"
                            value={formData.password} 
                            onChange={handleChange} 
                            placeholder="UsaUnaContraseñaSegura123!" 
                            required
                        />
                    </article>
                </section>
                
                <Captcha onCaptchaSolved={handleCaptchaSolved} />
                
                <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? "Registrando..." : "Registrarse"}
                </Button>
                
                {error && <p className="signup-form__error">{error}</p>}
                {success && <p className="signup-form__success">🎉 Registro exitoso</p>}
            </form>
            
            <section className="signup-form__footer">
                <span className="signup-form__footer-text">
                    ¿Ya tienes cuenta?{' '}
                    <button 
                        type="button" 
                        className="login-link" 
                        onClick={onGoToLogin}
                        aria-label="botón para redirigir a la página de iniciar sesión"
                    >
                        Inicia sesión aquí
                    </button>
                </span>
            </section>
        </>
    );
}
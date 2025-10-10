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
                        <label className="signup-form__label">Nombre de usuario</label>
                        <input 
                            className="signup-form__input" 
                            name="username" 
                            value={formData.username} 
                            onChange={handleChange} 
                            placeholder="lisasimpson8" 
                            required
                        />
                    </article>
                    <article className="signup-form__input-field">
                        <label className="signup-form__label">Correo electrónico</label>
                        <input 
                            className="signup-form__input" 
                            name="email"
                            type="email"
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="lisasimpson@gmail.com" 
                            required
                        />
                    </article>
                    <article className="signup-form__input-field">
                        <label className="signup-form__label">Contraseña</label>
                        <input 
                            className="signup-form__input" 
                            name="password" 
                            type="password" 
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
                    >
                        Inicia sesión aquí
                    </button>
                </span>
            </section>
        </>
    );
}
import React, { useState } from 'react';
import './SignUpForm.css';
import Button from '../buttons/Button';
import Captcha from '../captcha/Captcha';
//import {registerUser}

export default function SignUpForm({onGoToLogin}) {
    const [formData, setFormData] = useState({username: "", email: "", password: "", captchaId: null, captchaAnswer: null,});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleCaptchaSolved = ({captchaId, captchaAnswer}) => {
        setFormData({...formData, captchaId, captchaAnswer});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if(!formData.captchaAnswer) {
            alert("Para registrarte debes resolver el captcha");
            return;
        }

        try {
            setLoading(true);
            const result = await registerUser(formData);
            setSuccess(true);
            console.log("Usuario registrado:", result);
      
            setFormData({
              username: "",
              email: "",
              password: "",
              captchaId: null,
              captchaAnswer: null,
            });

          } catch (err) {
            console.error("Error al registrar:", err);
            setError("No se pudo completar el registro 😔");
          } finally {
            setLoading(false);
          }
        };
       
        return(
        <>
        <form className="signup-form" onSubmit={handleSubmit}>
            <input className="signup-form__input" name="username" value={formData.username}  onChange={handleChange} placeholder="lisasimpson8" required/>
            <input className="signup-form__input" name="email" value={formData.email} onChange={handleChange} placeholder="lisasimpson@gmail.com" required/>
            <input className="signup-form__input" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="UsaUnaContraseñaSegura123!" required/>

            <Captcha onCaptchaSolved={handleCaptchaSolved} />
            
            <Button type="submit" variant="primary" disabled={loading}>{loading ? "Registrando..." : "Registrarse"}</Button>
            {error && <p className="form-error">{error}</p>}
            {success && <p className="form-success">🎉 Registro exitoso</p>}
        </form>
        
        <section className="signup-form__footer">
        <span className="signup-form__footer-text">
            ¿Ya tienes cuenta?{' '}
            <button type="button" className="login-link" onClick={onGoToLogin}>Inicia sesión aquí</button>
        </span>
    </section>
    </>
    );
};

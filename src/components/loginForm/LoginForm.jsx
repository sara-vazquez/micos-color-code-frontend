import React, {useState, useEffect } from "react";
import './LoginForm.css';
import Button from '../buttons/Button';

export default function LoginForm({onSubmit, loading, error, onGoToRegister}) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [isConfirmationError, setIsConfirmationError] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        
        if (params.get('confirmed') === 'true') {
            setConfirmationMessage('✅ ¡Cuenta confirmada exitosamente! Ya puedes iniciar sesión.');
            setIsConfirmationError(false);
            
            setTimeout(() => {
                window.history.replaceState({}, '', '/login');
            }, 5000);
        } else if (params.get('error')) {
            setConfirmationMessage(`❌ ${params.get('error')}`);
            setIsConfirmationError(true);
            
            setTimeout(() => {
                window.history.replaceState({}, '', '/login');
            }, 5000);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return(
        <>
           <form className="login-form" onSubmit={handleSubmit}>
                <h1 className='login-form__title'>Iniciar sesión</h1>
                {confirmationMessage && (
                    <div className={`login-form__message ${isConfirmationError ? 'login-form__message--error' : 'login-form__message--success'}`}>
                        {confirmationMessage}
                    </div>
                )}
                <section className="login-form__input-group">
                    <article className="login-form__input-field">
                        <label className="login-form__label">Correo electrónico</label>
                        <input 
                            className="login-form__input" 
                            name="email" 
                            type="email"
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="lisasimpson@gmail.com" 
                            required
                        />
                    </article>
                    <article className="login-form__input-field">
                        <label className="login-form__label">Contraseña</label>
                        <input 
                            className="login-form__input" 
                            name="password" 
                            type="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            placeholder="UsaUnaContraseñaSegura123!" 
                            required
                        />
                    </article>
                </section>
                
                <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
                {error && <p className="login-form__error">{error}</p>}
            </form>
            
            <section className="login-form__footer">
                <span className="login-form__footer-text">
                    ¿No tienes cuenta?{' '}
                    <button 
                        type="button" 
                        className="register-link" 
                        onClick={onGoToRegister}
                    >
                        Regístrate aquí
                    </button>
                </span>
            </section>
        </>
    );
}
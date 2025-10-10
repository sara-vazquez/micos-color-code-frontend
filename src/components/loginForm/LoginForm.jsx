import React, {useState} from "react";
import './LoginForm.css';

export default function LoginForm({onLoginSucces, onGoToRegister}) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await authService.login(formData);
            onLoginSuccess?.(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
           <form className="login-form" onSubmit={handleSubmit}>
                    <h1 className='login-form__title'>Iniciar sesión</h1>
                    <section className="login-form__input-group">
                        <article className="login-form__input-field">
                            <label className="login-form__label">Correo electrónico</label>
                            <input className="login-form__input" name="email" value={formData.email} onChange={handleChange} placeholder="lisasimpson@gmail.com" required/>
                        </article>
                        <article className="login-form__input-field">
                            <label className="login-form__label">Contraseña</label>
                            <input className="loginp-form__input" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="UsaUnaContraseñaSegura123!" required/>
                        </article>
                    </section>
                    
                    <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                    </Button>
                    {error && <p className="login__error">{error}</p>}
                </form>
                
                <section className="login-form__footer">
                <span className="login-form__footer-text">
                    ¿No tienes cuenta?{' '}
                    <button type="button" className="register-link" onClick={onGoToRegister}>Regístrate aquí</button>
                </span>
            </section>
        </>
    );
}
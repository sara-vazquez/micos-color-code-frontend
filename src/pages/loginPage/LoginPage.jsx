import React, {useState} from "react";
import './LoginPage.css';
import LoginForm from "../../components/loginForm/LoginForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            const data = await authService.login(formData);
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    const handleGoToRegister = () => {
        navigate('/register');
    };

    return(
        <section className="login-page">
            <article className="login-page__content">
                <LoginForm onSubmit={handleLogin}
                loading={loading}
                error={error}
                onGoToRegister={handleGoToRegister} />
            </article>
        </section>
    );
}
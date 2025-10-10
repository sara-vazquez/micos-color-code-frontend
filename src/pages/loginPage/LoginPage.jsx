import React, {useState} from "react";
import './LoginPage.css';
import LoginForm from "../../components/loginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (formData) => {
        setLoading(true);
        setError(null);
    
        try {
            const data = await loginUser(formData);
            console.log('Usuario logueado:', data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
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
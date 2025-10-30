import React, {useState} from "react";
import './RegisterPage.css';
import SignUpForm from "../../components/signUpForm/SignUpForm";
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../../services/registerService";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (formData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const result = await registerUser(formData);
            setSuccess(true);
            console.log("✅ Usuario registrado:", result);

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            setError(err.message || "No se pudo completar el registro 😔");
        } finally {
            setLoading(false);
        }
    };

    const handleGoToLogin = () => {
        navigate('/login');
    };

    return(
        <section className="register-page">
            <article className="register-page__content">
                <SignUpForm onSubmit={handleRegister}
                loading={loading}
                error={error}
                success={success}
                onGoToLogin={handleGoToLogin}/>
            </article>
        </section>
    );
}
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './SignUpForm.css';
import Button from '../buttons/Button';

export default function SignUpForm({onClose, onSuccess, onGoToLogin}) {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [captchaData, setCaptchaData] = useState(null); 
    
    const password = watch("password");
    /* const handleCaptchaSolved = ({ captchaId, captchaAnswer }) => {
    setFormData((prev) => ({ ...prev, captchaId, captchaAnswer }));
  };*/

  const onSubmit = async (data) => {
    setIsLoading(true);
    setMessage('');

    if (!captchaData) {
      setMessage("⚠️ Por favor, resuelve el captcha antes de registrarte.");
      setIsLoading(false);
      return;
    }

    try {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("captchaId", captchaData.captchaId);
        formData.append("captchaAnswer", captchaData.captchaAnswer);
        // here i need to put the photo field

        const response = await registerUser(formData);

        onSuccess(response);
    }   catch (error) {
        console.error(error);
        setMessage(error.message || "❌ Error al registrarse. Inténtalo de nuevo.");
    } finally {
        setIsLoading(false);
    }
};


        return(
        <>
        <form className="signup-form" onSubmit={handleSubmit}>
            <input name="username" placeholder="Nombre de usuario" onChange={handleChange} />
            <input name="email" type="email" placeholder="Correo electrónico" onChange={handleChange} />
            <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />

            {/*<Captcha onCaptchaSolved={handleCaptchaSolved} />*/}
            
            <Button type="submit" variant="primary">Registrarse</Button>
            {status && <p>{status}</p>}
        </form>
        <section className="signup-form__footer">
        <span className="signup-form__footer-text">
            ¿Ya tienes cuenta?{' '}
            <button type="button" className="login-link" onClick={onGoToLogin}>Inicia sesión aquí</button>
        </span>
    </section>
    </>
    );
}

/* */
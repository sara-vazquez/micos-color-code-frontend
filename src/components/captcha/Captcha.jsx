import React, { useState, useEffect } from 'react';
import './Captcha.css';
import { getCaptcha } from '../../services/captchaService';

export default function Captcha({ onCaptchaSolved }) {
    const [captcha, setCaptcha] = useState(null);
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCaptcha();
    }, []);

    const fetchCaptcha = async () => {
        try {
            const data = await getCaptcha();
            setCaptcha(data);
            setAnswer("");
            setError(null);
            
            onCaptchaSolved({ captchaId: data.id, captchaAnswer: null });
        } catch {
            setError("No se pudo cargar el captcha");
        }
    };

    const handleAnswerChange = (e) => {
        const value = e.target.value;
        
        // Permite números negativos y positivos
        if (/^-?\d*$/.test(value)) {
            setAnswer(value);

            const numericAnswer = parseInt(value, 10);
            onCaptchaSolved({
                captchaId: captcha?.id || null,
                captchaAnswer: isNaN(numericAnswer) ? null : numericAnswer,
            });
        }
    };

    return (
        <section className="captcha">
            {captcha ? (
                <>
                    <p className="captcha__question" aria-label="pregunta del captcha">{captcha.question}</p>
                    <div className="captcha__input-group">
                        <input
                            type="text"
                            value={answer}
                            placeholder="Tu respuesta"
                            onChange={handleAnswerChange}
                            className="captcha__input"
                            aria-label='campo para añadir la respuesta del captcha'
                        />
                        <button 
                            type="button" 
                            className="captcha__refresh" 
                            onClick={fetchCaptcha}
                            aria-label="Recargar captcha"
                        >
                            🔄
                        </button>
                    </div>
                    {error && <p className="captcha__error">{error}</p>}
                </>
            ) : (
                <p className="captcha__text">Cargando captcha...</p>
            )}
        </section>
    );
}
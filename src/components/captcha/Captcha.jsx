import React, { useState, useEffect } from 'react';
import './Captcha.css';

export default function Captcha({ onCaptchaSolved }) {
    const [captcha, setCaptcha] = useState(null);
    const [captchaAnswer, setCaptchaAnswer] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCaptcha();
    }, []);

    const fetchCaptcha = async = () => {
        try {
            const data = await getCaptcha();
            setCaptcha(data);
            setAnswer("");
            setError(null);
            
            onCaptchaSolved({captchaId: data.id, captchaAnswer: null});
        } catch {
            setError("No se pudo cargar el captcha");
        }
    };

    const handleAnswerChange = (e) => {
        const value = e.target.value;
        if (/^-?\d*$/.test(value)) {
            setAnswer(value);
        

            const numericAnswer = parseInt(value, 10);
            onCaptchaSolved({
                captchaId: captcha?.id || null,
                captchaAnswer: isNaN(numericAnswer) ? null : numericAnswer,
            });
        }
    };

    return(
        <section className="captcha">
            {captcha ? (
        <>
          <p className="captcha__question">{captcha.question}</p>
          <div className="captcha__input-group">
            <input
              type="text"
              value={answer}
              placeholder="Tu respuesta"
              onChange={handleAnswerChange}
              className="captcha__input"
            />
            <button type="button" variant="ghost" onClick={fetchCaptcha}>🔄</button>
          </div>
          {error && <p className="captcha__error">{error}</p>}
        </>
      ) : (
        <p className="captcha__text">Cargando captcha...</p>
      )}
        </section>
    );
}
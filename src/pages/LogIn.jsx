import React from 'react';
import './LogIn.css';
import Button from '../components/buttons/Button';

export default function ProfilePage() {
    return(
        <>
        <div className= "login__container">
            <h1 className='login__title'>Regístrate o inicia sesión</h1>
            <Button variant = "primary">Iniciar sesión</Button>
            <Button variant = "secondary">Iniciar sesión con google</Button>
            <section className="login-checkbox__section"></section>
            <div className="login__checkbox-group">
                <label className="login__checkbox">
                    <input type="checkbox" className="login__checkbox-input"/>
                        <span className="login__checkbox-label">Recordarme</span>
                </label>
            </div>
            <div className="login__checkbox-group">
                <label className="login__checkbox">
                    <input type="checkbox" className={`login__checkbox-input ${errors.acceptTerms ? 'login__checkbox-input--error' : ''}`}
                                        {...register('acceptTerms', {
                                            required: 'Debes aceptar los términos y condiciones'
                                        })}
                                    />
                      <span className="login__checkbox-label">Para acceder es obligatorio que el tutor/a esté con el menor. *</span>
                </label>
                                {errors.acceptTerms && (
                                    <span className="login__error">{errors.acceptTerms.message}</span>
                                )}
                            </div>

            {/*Algo tipo capcha para que lo resuelvan los padres */}
        </div>
        </>
    );
}
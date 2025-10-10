import React from "react";
import './LoginPage.css';
import LoginForm from "../../components/loginForm/LoginForm";

export default function LoginPage() {
    return(
        <section className="login-page">
            <article className="login-page__content">
                <LoginForm />
            </article>
        </section>
    );
}
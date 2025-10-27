import React, {useState} from "react";
import './EditProfileModal.css';
import { updateProfile } from "../../services/profileService"; 
import Button from "../buttons/Button";

export default function EditProfileModal({profile, onClose, onProfileUpdate}) {
    const [formData, setFormData] = useState({username: profile.username, email: profile.email, password:"" })
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
            //just sends password if user changes it
            const dataToSend = { ...formData };
            if (!dataToSend.password) {
                delete dataToSend.password;
            }

            const updatedProfile = await updateProfile(dataToSend);
            onProfileUpdate(updatedProfile); // Update ProfilePage
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    return(
        <div className="edit-modal__overlay" onClick={onClose}>
        <section className="edit-modal" onSubmit={handleSubmit}>
            <header className="edit-modal__header">
                <h2 className="edit-modal__title" aria-label="Editar el perfil">Editar perfil</h2>
            </header>
            <article className="edit-modal__content">
            <article className="edit-modal__input-field">
                        <label className="edit-modal__label">Nombre de usuario</label>
                        <input 
                            className="edit-modal__input" 
                            aria-label="campo para rellenar el nombre de usuario"
                            name="username" 
                            value={formData.username} 
                            onChange={handleChange} 
                            placeholder={profile.username}
                            required
                        />
                    </article>
                    <article className="edit-modal__input-field">
                        <label className="edit-modal__label">Correo electrónico</label>
                        <input 
                            className="edit-modal__input" 
                            aria-label="campo para rellenar el correo electrónico"
                            name="email"
                            type="email"
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder={profile.email} 
                            required
                        />
                    </article>
                    <article className="edit-modal__input-field">
                        <label className="edit-modal__label">Contraseña</label>
                        <input 
                            className="edit-modal__input" 
                            aria-label="campo para rellenar la contraseña"
                            name="password" 
                            type="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            placeholder="" 
                            required
                        />
                    </article>
            </article>
            <article className="edit-modal__actions">
                <Button type="button" variant="secondary" aria-label="botón para cancelar la edición" onClick={onClose}>Cancelar</Button>
                <Button type="submit" variant="primary" aria-label="botón para guardar los cambios" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</Button>
                {error && <p className="edit-modal__error">{error}</p>}
            </article>
        </section>
        </div>
    );
}
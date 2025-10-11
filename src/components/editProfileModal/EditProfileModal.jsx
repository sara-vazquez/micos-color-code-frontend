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
            <header className="edit-modal">
                <h2 className="edit-modal__title">Editar perfil</h2>
            </header>
            <article className="edit-modal__content">

            </article>
            <article className="edit-modal__actions">
                <Button type="button" variant="secondary" aria-label="botón para cancelar la edición">Cancelar</Button>
                <Button type="submit" variant="primary" aria-label="botón para guardar los cambios" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</Button>
                {error && <p className="error">{error}</p>}
            </article>
        </section>
        </div>
    );
}
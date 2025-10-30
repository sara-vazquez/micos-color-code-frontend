import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './ProfilePage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import OptionsProfile from "../../components/optionsProfile/OptionsProfile";
import {getProfile} from "../../services/profileService";
import EditProfileModal from "../../components/editProfileModal/EditProfileModal";
import FeedbackButton from "../../components/feedbackButtons/FeedbackButton";

export default function ProfilePage() {
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleOpenOptions = () => setShowOptions(true);
    const handleCloseOptions = () => setShowOptions(false);

    const handleOpenEdit = () => setShowEditModal(true);
    const handleCloseEdit = () => setShowEditModal(false);

    const handleBack = () => {
        navigate(-1); // go back to the previous page the user was
    };

    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const data = await getProfile();
            setProfile(data);
          } catch (err) {
            console.error("Error al obtener perfil:", err);
            setError("No se pudieron cargar los datos del perfil 😔");
          } finally {
            setLoading(false);
          }
        };
        fetchProfile();
      }, []);
    
      if (loading) return <p className="profile__loading">Cargando perfil...</p>;
      if (error) return <p className="profile__error">{error}</p>;

    return(
      <section className="profile__page">
        <header className="profile__header">
            <button className="profile__back" aria-label="botón para volver atrás" onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft}/>
            </button>
            <h2 className="profile__title">¡Hola, {profile.username}!</h2>
            <button className="profile__menu" aria-label="menú opciones del perfil" onClick={handleOpenOptions}>
                <FontAwesomeIcon icon={faEllipsisVertical}/>
            </button>
        </header>
        <section className="profile__container">
            <label className="profile__label">Nombre de usuario</label>
            <p className="profile__text">{profile.username}</p>
            <label className="profile__label">Correo electrónico</label>
            <p className="profile__text">{profile.email}</p>
            <label className="profile__label">Contraseña</label>
            <p className="profile__text">●●●●●●●●●●●</p>
        </section>
        <article className="profile__action">
          <FeedbackButton className="feedback__flying-button"/>
        </article>

        {showOptions && <OptionsProfile onClose={handleCloseOptions} onEditProfile={handleOpenEdit}/>}
        {showEditModal && (<EditProfileModal profile={profile} onClose={handleCloseEdit} onProfileUpdate={setProfile}/>)}
        </section>
        
    )
}
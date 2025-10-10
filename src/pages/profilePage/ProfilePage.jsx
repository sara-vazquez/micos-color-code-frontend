import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './ProfilePage.css';
import Navbar from '../components/navbar';
import Button from '../../components/buttons/Button';
import Footer from '../../components/footer/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import OptionsProfile from "../../components/optionsProfile/OptionsProfile";

export default function ProfilePage() {
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleOpenOptions = () => setShowOptions(true);
    const handleCloseOptions = () => setShowOptions(false);

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
        <>
        <Navbar />
        <div className="profile__page">
        <header className="profile__header">
            <button className="profile__back" aria-label="botón para volver atrás" onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft}/>
            </button>
            <h1 className="profile__title">¡Hola {profile.username}</h1>
            <button className="profile__menu" aria-label="menú opciones del perfil" onClick={handleOpenOptions}>
                <FontAwesomeIcon icon={faEllipsisVertical}/>
            </button>
        </header>
        <section className="profile__container">
            <p className="profile__text">{profile.username}</p>
            <p className="profile__text">{profile.email}</p>
            <p className="profile__text">{profile.password}</p>
        </section>

        {showOptions && <OptionsProfile onClose={handleCloseOptions} />}
        </div>
        <Footer />
        </>
    )
}
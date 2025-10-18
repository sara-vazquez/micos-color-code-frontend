import React, {useState} from "react";
import './NavbarAdmin.css';
import Logo from '../../assets/micosLogo.svg';
import { LogOut } from "lucide-react";
import { logoutUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import SearchInput from "../searchInput/SearchInput";

export default function NavbarAdmin() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
            setLoading(true);
    
            try {
                await logoutUser();
                navigate("/login");
            } catch {
                navigate("/login");
            } finally {
                setLoading(false);
            }
    };

    return(
        <header className="navbar-admin">
            <section className= "navbar-admin__container">
                <article className= "logo__container">
                    <img src={Logo} alt="logotype" className="logo"></img>
                </article>
                <article className="navbar__buttons">
                    <SearchInput />
                    <button type ="button" className="logout__button" onClick={handleLogout} disabled={loading}>
                        <LogOut  size={24}/>
                    </button>
                </article>
            </section>
        </header>
    );
}
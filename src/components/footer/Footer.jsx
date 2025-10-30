import React from "react";
import './Footer.css'
import { Link } from "react-router-dom"; 
import Secondary from '../../assets/micosSecondary.svg';
export default function Footer() {
    return(
        <div className = "footer">
            <div className = "footer__container">
                <div className = "footer__logo">
                    <Link to = "/"><img src={Secondary} alt="secondary logo" className="secondary"></img>
                    </Link>
                </div>    
            </div> 
        </div>
    )
}
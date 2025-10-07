import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"; 
import "./ScrollUpButton.css";

export default function ScrollUpButton() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const toggleVisibility = () => {
            if(window.pageYOffset > 100) {
                setIsVisible(true);
            } else{
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () =>
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    return (
        <>
            {isVisible && (
                <button className="scroll-up" onClick={scrollToTop}>
                    <FontAwesomeIcon icon={faArrowUp} className="faArrowUp" />
                </button>
            )}
        </>
    );
}


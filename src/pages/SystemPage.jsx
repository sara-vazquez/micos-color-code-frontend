import React from "react";
import './SystemPage.css';
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer';
import sistema from '../assets/sistema.svg';
import coloresPrimarios from '../assets/coloresPrimarios.svg';
import coloresSecundarios from '../assets/coloresSecundarios.svg';
import coloresNeutros from '../assets/coloresNeutros.svg';
import coloresOscuros from '../assets/coloresOscuros.svg';
import coloresClaros from '../assets/coloresClaros.svg';


export default function SystemPage() {
    return(
        <div className="system">
        <Navbar />
        <div className="system__container">
            <h1 className="system__title">Micos, el sistema</h1>
            <p className="system__text">MICOS color code es un proyecto social con vocación inclusiva enfocado hacia un <strong>público infantil de entre 3 y 8 años con daltonismo dicromático</strong>. El fin de MICOS es facilitar a niños y niñas con esta alteración visual el <strong>aprendizaje de los colores de forma lúdica y aumentativa</strong> a partir de las tres figuras básicas (círculo, triángulo y cuadrado) y la superposición de estas, asociándolas a un color.</p>
            <div className="system-img__container">
                <img src={sistema} alt="Ilustración del sistema" className="system__image" />
            </div>
        </div>
        <div className="system__container">
            <h2 className="system__h2">Paso a paso</h2>
            <p className="system__text">Con este sistema conseguimos representar 21 tonos, los colores primarios, secundarios, colores claros y oscuros. Estos últimos se logran con la suma del blanco o el negro.</p>
            <div className="system__container">
                <h3 className="system__h3">Colores primarios</h3>
                <div className="system-img__container">
                    <img src={coloresPrimarios} alt="Ilustración de los colores primarios" className="system__image" />
                </div>
                <p className="system__text">Los colores primarios se representan con las formas básicas, asociándolas a un color determinado según la teoría del color de Kandinsky. Por tanto, el azul es el circulo, el rojo el cuadrado y el amarillo el triangulo.</p>
                <h3 className="system__h3">Colores secundarios</h3>
                <div className="system-img__container">
                    <img src={coloresSecundarios} alt="Ilustración de los colores secundarios" className="system__image" />
                </div>
                <p className="system__text">Cuando mezclamos los colores primarios entre ellos, nacen los colores secundarios. Entonces, cuando sumamos el azul y el amarillo obtenemos el verde, un triangulo contenido en un circulo, el amarillo con el rojo suman el naranja, con el triangulo en el interior del cuadrado. Y por último el rojo con el azul forman el púrpura, es decir, un circulo dentro de un cuadrado.</p>
                <h3 className="system__h3">Colores neutros</h3>
                <div className="system-img__container">
                    <img src={coloresNeutros} alt="Ilustración de los colores neutros" className="system__image" />
                </div>
                <p className="system__text">También existen los colores neutros: blanco, negro y gris. Son necesarios para crear nuevos tonos. Estos los representamos con otra forma geométrica: el rectángulo. El gris sería un rectángulo medio relleno, el blanco hueco y el negro con otro rectángulo en su espacio interior.</p>
                <h3 className="system__h3">Colores oscuros</h3>
                <div className="system-img__container">
                    <img src={coloresOscuros} alt="Ilustración de los colores oscuros" className="system__image" />
                </div>
                <p className="system__text">Los colores oscuros se consiguen sumando el negro al resto de tonalidades. Estos colores se basan en la misma filosofía que utiliza con el negro, rellenando el interior.</p>
                <h3 className="system__h3">Colores claros</h3>
                <div className="system-img__container">
                    <img src={coloresClaros} alt="Ilustración de los colores claros" className="system__image" />
                </div>
                <p className="system__text">Los colores claros por su parte, se obtienen añadiendo el blanco. Logramos representarlos también siguiendo la filosofía de este tono, por tanto dejamos los interiores huecos.</p>
            </div>
        </div>
        <Footer />
        </div>
    )
}
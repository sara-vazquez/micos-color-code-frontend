import React from "react";
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import './DaltonismPage.css';
import FeedbackButton from '../components/feedbackButtons/FeedbackButton';
import ScrollUpButton from '../components/scrollUpButtons/ScrollUpButton';
import CardDaltonism from "../components/cardsDaltonism/CardDaltonism";
import Acromatopsia from "../assets/acromatopsia.png";
import Dicromático from "../assets/anomalias.png";
import Deuteranopia from "../assets/deuteranopia.png";
import Protanopia from "../assets/protanopia.png";
import Tritanopia from "../assets/tritanopia.png";

export default function DaltonismPage() {
    return(
        <section className="daltonism">
            <Navbar />
            <article className="daltonism__intro">
                <h1 className="daltonism__title">Daltonismo</h1>
                <p className = "daltonism__text">El daltonismo afecta a <strong>350 millones de personas</strong>, el 8% de la población, aproximadamente <strong>1 de cada 12 hombres y 1 de cada 200 mujeres.</strong> Los primeros síntomas se detectan durante la etapa escolar, mostrando dificultades a la hora de reconocer colores.
                
                Con el tiempo, las limitaciones de esta patología van aumentando, afectando al abanico de posibilidades profesionales y a la realización personal.</p>
            </article>
            <section className="daltonism__types">
                <h2 className="daltonism__h2">Tipos de daltonismo</h2>
                <p className="daltonism__text">Existen diversos tipos de daltonismo reconocidos en la actualidad, en total <strong>8 arquetipos</strong> divididos en tres grandes bloques: <strong>acromático, monocromático y el dicromático.</strong></p>
                <article className="daltonism__cards">
                    <CardDaltonism 
                    title="ACROMÁTICO"
                    text="Uno de los tipos de daltonismo más extraños y por tanto poco frecuentes que existen (1 de cada 100.000 personas). El individuo ve en blanco y negro, sin distinguir ningún color, debido bien a problemas neurológicos o bien fisiológicos en el ojo."
                    image={Acromatopsia} />
                    <CardDaltonism
                    title="DICROMÁTICO"
                    text="En este gran grupo, existen tres casos principales y tres tipos parciales. Como parciales destacan la protanomalía, que hace que el rojo se vea más verde y menos brillante, la deuteranomalía que percibe el verde más rojizo y la tritanomalía que dificulta la diferencia entre el azul y el verde, y el rojo y amarillo."
                    image={Dicromático} />
                </article>
            </section>
            <section>
                <h2 className="daltonism__h2">Daltonismo dicromático. Casos principales</h2>
                <p className="daltonism__text">Estos son los casos principales del  daltonismo dicromático, de los cuales los más comunes son la <strong> protanopia y la deuteranopia.</strong></p>
                <article className="daltonism__cards">
                <CardDaltonism 
                title="PROTANOPIA"
                    text="El individuo no posee los conos encargados de distinguir el rojo. Por ello, los sujetos confunden el rojo y el verde."
                    image={Protanopia} />
                <CardDaltonism 
                title="DEUTERANOPIA"
                text="No son capaces de percibir los verdes. Aquí también existe una confusión entre el rojo y el verde."
                image={Deuteranopia} />
                <CardDaltonism 
                title="TRITANOPIA"
                    text="Las personas con tritanopia no distinguen el azul y el amarillo. Dentro del daltonismo dicromático, es la menos común"
                    image={Tritanopia} />
                </article>
                    
                <FeedbackButton className="feedback__flying-button"/>  
            </section>
            <ScrollUpButton />
            
            <Footer />
        </section>
    )
}

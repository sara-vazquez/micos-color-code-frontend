import React from "react";
import './DaltonismPage.css';

export default function DaltonismPage() {
    return(
        <div className="daltonism">
            <div className="daltonism__intro">
                <h1 className="daltonism__title">Daltonismo</h1>
                <p className = "daltonism__text">El daltonismo afecta a <strong>350 millones de personas</strong>, el 8% de la población, aproximadamente <strong>1 de cada 12 hombres y 1 de cada 200 mujeres.</strong> Los primeros síntomas se detectan durante la etapa escolar, mostrando dificultades a la hora de reconocer colores.
                
                Con el tiempo, las limitaciones de esta patología van aumentando, afectando al abanico de posibilidades profesionales y a la realización personal.</p>
            </div>
            <div className="daltonism__types">
                <h2 className="daltonism__h2">Tipos de daltonismo</h2>
                <p className="daltonism__text">Existen diversos tipos de daltonismo reconocidos en la actualidad, en total <strong>8 arquetipos</strong> divididos en tres grandes bloques: <strong>acromático, monocromático y el dicromático.</strong></p>
            </div>
        </div>
    )
}
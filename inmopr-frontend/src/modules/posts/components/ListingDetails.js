import { useLocation } from "react-router-dom";
import { useState } from "react";

import './ListingDetails.css';

const ListingDetails = () => {
    const location = useLocation();
    const property = location.state?.property;

    const [currentIndex, setCurrentIndex] = useState(0);


    if (!property) {
        return <p>No se encontró la propiedad.</p>;
    }

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? property.urls.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === property.urls.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="property-details">
            <h1 className="property-name">{property.name} </h1>
            <h2 className={"property-precio"}>{property.precio.toLocaleString('es-ES')} €</h2>
            <div className="carousel-container">
                <button onClick={handlePrev} className="carousel-btn">⬅</button>

                <div className="image-container">
                    <img src={property.urls[currentIndex]} alt={`property-${currentIndex}`} />
                </div>

                <button onClick={handleNext} className="carousel-btn">➡</button>
            </div>
            <p>{property.description}</p>
            <p>Precio: {property.price}</p>
            {/* Aquí puedes agregar más detalles de la propiedad */}
        </div>
    );
};

export default ListingDetails;

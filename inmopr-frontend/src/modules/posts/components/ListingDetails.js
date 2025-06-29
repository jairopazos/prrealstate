import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import './ListingDetails.css';
import { FormattedMessage, useIntl } from "react-intl";

const ListingDetails = () => {
    const location = useLocation();
    const property = location.state?.property;
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const intl = useIntl();
    const creationDate = property.creationDate; // Asegúrate de usar la propiedad correcta
    const modificationDate = property.modificationDate; // Asegúrate de usar la propiedad correcta

    const creationDateFormatted = new Date(creationDate).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const modificationDateFormatted = new Date(creationDate).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });


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

    function calcularPrecioPorMetro(precioNum, metrosStr) {
        if (typeof precioNum !== 'number' || isNaN(precioNum) || precioNum <= 0) {
            throw new Error('Precio inválido');
        }

        // 1. Limpiamos la cadena de metros para quedarnos solo con el número
        //    Permitimos dígitos y coma/punto decimal
        const metrosNum = parseFloat(
            metrosStr
                .replace(',', '.')        // coma → punto
                .replace(/[^\d.]+/g, '')  // quitamos todo menos dígitos y puntos
        );
        if (isNaN(metrosNum) || metrosNum <= 0) {
            throw new Error('Metros inválidos');
        }

        // 2. Calculamos el precio por m²
        const precioPorMetro = precioNum / metrosNum;

        // 3. Devolvemos el resultado con dos decimales
        return precioPorMetro.toFixed(2);
    }

    return (
        <div className="property-details">
            <button className="back-button" onClick={() => navigate(-1)}>
                ⮌ <FormattedMessage id="project.app.button.back" defaultMessage={intl.formatMessage({ id: "project.app.back" })} />
            </button>
            <div className="details-wrapper">
                {/* IZQUIERDA */}
                <div className="left-panel">
                    <h1 className="property-name">{property.name}</h1>
                    <h2 className="property-precio">{property.precio.toLocaleString('es-ES')} €</h2>

                    <div className="carousel-container">
                        <button onClick={handlePrev} className="carousel-btn">⬅</button>
                        <div className="image-container">
                            <img src={property.urls[currentIndex]} alt={`property-${currentIndex}`} />
                        </div>
                        <button onClick={handleNext} className="carousel-btn">➡</button>
                    </div>

                    <h3 className="property-precio">Comentario del anunciante</h3>
                    <p className={"property-description"}>{property.description}</p>
                    <br></br>
                    <h3 className="property-precio">Características</h3>
                    <p className="caracteristicas-p">Metros construidos: {property.metrosConstruidos}</p>
                    <p className="property-precio-p">Metros útiles: {property.metrosUtiles}</p>
                    <p className="property-precio-p">Número de habitaciones: {property.numHabitaciones}</p>
                    <p className="property-precio-p">Número de baños: {property.numBanos}</p>
                    <p className="property-precio-p">Estado: {property.estado}</p>
                    <p className="property-precio-p">Orientación: {property.orientacion}</p>
                    <div className="features-list">
                        <label>
                            <input type="checkbox" checked={property.ascensor} disabled />
                            Ascensor
                        </label>
                        <label>
                            <input type="checkbox" checked={property.garaje} disabled />
                            Garaje
                        </label>
                        <label>
                            <input type="checkbox" checked={property.trastero} disabled />
                            Trastero
                        </label>
                        <label>
                            <input type="checkbox" checked={property.calefaccion} disabled />
                            Calefacción
                        </label>
                        <label>
                            <input type="checkbox" checked={property.jardin} disabled />
                            Jardín
                        </label>
                        <label>
                            <input type="checkbox" checked={property.piscina} disabled />
                            Piscina
                        </label>
                        <label>
                            <input type="checkbox" checked={property.exterior} disabled />
                            Exterior
                        </label>
                        <label>
                            <input type="checkbox" checked={property.terraza} disabled />
                            Terraza
                        </label>
                        <label>
                            <input type="checkbox" checked={property.amueblado} disabled />
                            Amueblado
                        </label>

                        {/* Añade más según los booleanos que tengas */}
                    </div>
                    <br></br>
                    <h3 className="property-precio">Precio</h3>
                    <p className="property-precio-p">Precio de la propiedad: {property.precio.toLocaleString('es-ES')} €</p>
                    <p className="property-precio-p">Precio por metro cuadrado: {calcularPrecioPorMetro(property.precio, property.metrosConstruidos)} €/m²</p>
                    {/* ...otros detalles */}
                </div>

                {/* DERECHA */}
                {/* DERECHA */}
                <div className="right-panel">
                    <div className="agent-card">
                        <h3>Datos del anunciante</h3>
                        <p><strong>Nombre:</strong> {property?.ownerName || 'No disponible'}</p>
                        <p><strong>Teléfono:</strong> {property?.telephone || 'No disponible'}</p>
                        <p><strong>Publicado en:</strong> {creationDateFormatted || 'No disponible'}</p>
                        <p><strong>Modificado en:</strong> {modificationDateFormatted || 'No disponible'}</p>

                        <label htmlFor="contact-message" style={{ marginTop: '12px', fontWeight: '600' }}>
                            Escribe un mensaje:
                        </label>
                        <textarea
                            id="contact-message"
                            className="contact-textarea"
                            placeholder="Hola, estoy interesado en este inmueble..."
                        />
                        <button className="contact-button">
                            Enviar mensaje
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );

};

export default ListingDetails;

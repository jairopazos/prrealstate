import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './ListingDetails.css';
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';
import users from '../../users';

const ListingDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [sendStatus, setSendStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userEmail = useSelector(users.selectors.getEmail);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();

    useEffect(() => {
        fetch(`/listings/${id}`) // 👈 corregido: backticks no necesarios aquí
            .then(res => {
                if (!res.ok) throw new Error("No se encontró el anuncio");
                return res.json();
            })
            .then(data => setProperty(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Cargando datos del anuncio...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!property) return <p>No se encontró el anuncio.</p>;

    // 👇 solo ejecutamos esto una vez property ya existe
    const creationDateFormatted = new Date(property.creationDate).toLocaleDateString('es-ES');
    const modificationDateFormatted = new Date(property.modificationDate).toLocaleDateString('es-ES');

    const htmlMessage = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>Alguien está interesado en tu anuncio:</h2>
        <a href="${window.location.origin}/listing/details/${id}" target="_blank" style="text-decoration: none;">
            <img src="${property.urls[0]}" alt="Foto del anuncio" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px;" />
            <h3 style="color: #2980b9;">${property.name}</h3>
        </a>
        <p><strong>Mensaje del usuario:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 15px; margin: 10px 0;">
            ${message.replace(/\n/g, "<br>")}
        </blockquote>
    </div>
`;

    const handleSendMessage = () => {
        setSendStatus(null);
        const emailDto = {
            to: property.email,
            from: userEmail,
            subject: `Consulta sobre ${property.name}`,
            message: htmlMessage
        };

        setIsSending(true);

        dispatch(actions.sendEmail(
            emailDto,
            () => {
                setIsSending(false);
                setSendStatus("success");
            },
            (error) => {
                setIsSending(false);
                setSendStatus("error");
                console.error("Error al enviar el mensaje:", error);
            }
        ));
    };

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

    const calcularPrecioPorMetro = (precioNum, metrosStr) => {
        const metrosNum = parseFloat(metrosStr.replace(',', '.').replace(/[^\d.]+/g, ''));
        if (isNaN(precioNum) || precioNum <= 0 || isNaN(metrosNum) || metrosNum <= 0) return 'N/A';
        return (precioNum / metrosNum).toFixed(2);
    };

    return (
        <div className="property-details">
            <button className="back-button" onClick={() => navigate(-1)}>
                ⮌ <FormattedMessage id="project.app.button.back" defaultMessage={intl.formatMessage({ id: "project.app.back" })} />
            </button>

            <div className="details-wrapper">

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

                    <h3 className="property-precio">Características</h3>
                    <p className="caracteristicas-p">Metros construidos: {property.metrosConstruidos}</p>
                    <p className="property-precio-p">Metros útiles: {property.metrosUtiles}</p>
                    <p className="property-precio-p">Número de habitaciones: {property.numHabitaciones}</p>
                    <p className="property-precio-p">Número de baños: {property.numBanos}</p>
                    <p className="property-precio-p">Estado: {property.estado}</p>
                    <p className="property-precio-p">Orientación: {property.orientacion}</p>

                    <div className="features-list">
                        {[
                            { label: 'Ascensor', key: 'ascensor' },
                            { label: 'Garaje', key: 'garaje' },
                            { label: 'Trastero', key: 'trastero' },
                            { label: 'Calefacción', key: 'calefaccion' },
                            { label: 'Jardín', key: 'jardin' },
                            { label: 'Piscina', key: 'piscina' },
                            { label: 'Exterior', key: 'exterior' },
                            { label: 'Terraza', key: 'terraza' },
                            { label: 'Amueblado', key: 'amueblado' }
                        ].map(feature => (
                            <label key={feature.key}>
                                <input type="checkbox" checked={property[feature.key]} disabled />
                                {feature.label}
                            </label>
                        ))}
                    </div>

                    <h3 className="property-precio">Precio</h3>
                    <p className="property-precio-p">Precio de la propiedad: {property.precio.toLocaleString('es-ES')} €</p>
                    <p className="property-precio-p">Precio por metro cuadrado: {calcularPrecioPorMetro(property.precio, property.metrosConstruidos)} €/m²</p>
                </div>

                <div className="right-panel">
                    <div className="agent-card">
                        <h3>Datos del anunciante</h3>
                        <p><strong>Nombre:</strong> {property.ownerName || 'No disponible'}</p>
                        <p><strong>Teléfono:</strong> {property.telephone || 'No disponible'}</p>
                        <p><strong>Publicado en:</strong> {creationDateFormatted}</p>
                        <p><strong>Modificado en:</strong> {modificationDateFormatted}</p>

                        <label htmlFor="contact-message" style={{ marginTop: '12px', fontWeight: '600' }}>
                            Escribe un mensaje:
                        </label>
                        <textarea
                            id="contact-message"
                            className="contact-textarea"
                            placeholder="Hola, estoy interesado en este inmueble..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                         <button className="contact-button" onClick={handleSendMessage} disabled={isSending}>
                            {isSending ? "Enviando..." : "Enviar mensaje"}
                        </button>

                        {sendStatus === "success" && <p className="success-msg">Mensaje enviado con éxito.</p>}
                        {sendStatus === "error" && <p className="error-msg">Error al enviar el mensaje.</p>}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ListingDetails;

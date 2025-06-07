import React, { useState, useEffect } from 'react';
import AppGlobalComponents from './AppGlobalComponents';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import users from '../../users';
import Login from '../../users/components/Login';
import backgroundVideo from '../../../resources/video.mp4';
import './Body.css';
import { FormattedMessage, useIntl } from "react-intl";
import { fetchCities } from '../../common/Common'; // ajusta la ruta según tu estructura


const Body = () => {
    const intl = useIntl();
    const loggedIn = useSelector(users.selectors.isLoggedIn);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const [shouldFetchCity, setShouldFetchCity] = useState(true);

    // Implementación de debouncing
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // Ajusta el tiempo en milisegundos que deseas esperar

        return () => {
            clearTimeout(timer); // Limpiamos el temporizador si el usuario sigue escribiendo
        };
    }, [searchTerm]);

    useEffect(() => {
        // Solo realiza la búsqueda de sugerencias si el término tiene más de 2 caracteres
        if (!shouldFetchCity) {
            setShouldFetchCity(true);
            return;
        }

        if (debouncedSearchTerm.length >= 2) {
            fetchCities(debouncedSearchTerm).then(setSuggestions);
        } else {
            setSuggestions([]); // Si el término es muy corto, limpia las sugerencias
        }
    }, [debouncedSearchTerm]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value); // Actualiza el searchTerm mientras el usuario escribe
    };

    const handleSelect = (city) => {
        setSearchTerm(city); // Cuando el usuario selecciona una ciudad, actualiza el searchTerm
        setSuggestions([]); // Limpiar las sugerencias después de la selección
        setShouldFetchCity(false);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/listings?city=${searchTerm}`); // Realiza la búsqueda
        }
    };

    return (
        <div className="container">
            <br />
            <video autoPlay loop muted playsInline className="background-video">
                <source src={backgroundVideo} type="video/mp4" />
                <FormattedMessage id="project.app.text.videonotsupported" />
            </video>
            <form className="search-bar-overlay" onSubmit={handleSearch}>
                <input
                    type="text"
                    className="input-search-city"
                    placeholder={intl.formatMessage({ id: "project.app.text.city" })}
                    value={searchTerm}
                    onChange={handleChange}
                />
                {suggestions.length > 0 && (
                    <ul className="suggestions-dropdown">
                        {suggestions.slice(0, 3).map((city, index) => (
                            <li key={index} onClick={() => handleSelect(city)}>
                                {city}
                            </li>
                        ))}
                    </ul>
                )}
                <button type="submit">🔍</button>
            </form>
            <AppGlobalComponents />
            <Routes>
                {!loggedIn ? (
                    <Route path="/users/login" element={<Login />} />
                ) : null}
            </Routes>
        </div>
    );
}

export default Body;

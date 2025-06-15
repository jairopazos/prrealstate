import React, {useState, useEffect, useRef} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import users from '../../users';
import Login from '../../users/components/Login';
import backgroundVideo from '../../../resources/video.mp4';
import { FormattedMessage, useIntl } from "react-intl";
import {Errors} from "../../common";
import * as actions from "../actions";
import './PublishPost.css';
import { fetchCities } from '../../common/Common'; // ajusta la ruta según tu estructura
import { fetchProvinces } from '../../common/Common'; // ajusta la ruta según tu estructura
import { fetchStreets } from '../../common/Common'; // ajusta la ruta según tu estructura
import { useContext } from 'react';
import {PostContext} from "./PostContext";

const PublishPost = () => {
    const [backendErrors, setBackendErrors] = useState(null);
    const navigate = useNavigate();
    const intl = useIntl();
    const [tipoAnuncio, setTipoAnuncio] = useState('');
    const [tipoVivienda, setTipoVivienda] = useState('');
    const [searchTermCity, setsearchTermCity] = useState("");
    const [searchTermProvince, setsearchTermProvince] = useState("");
    const [searchTermStreet, setsearchTermStreet] = useState("");
    const [postalCodeTerm, setPostalCodeTerm] = useState("");
    const [debouncedsearchTermCity, setDebouncedsearchTermCity] = useState(searchTermCity);
    const [debouncedsearchTermProvince, setDebouncedsearchTermProvince] = useState(searchTermProvince);
    const [debouncedsearchTermStreet, setDebouncedsearchTermStreet] = useState(searchTermStreet);
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsProvince, setSuggestionsProvince] = useState([]);
    const [suggestionsStreet, setSuggestionsStreet] = useState([]);
    const [shouldFetchCity, setShouldFetchCity] = useState(true);
    const [shouldFetchProvince, setShouldFetchProvince] = useState(true);
    const [shouldFetchStreet, setShouldFetchStreet] = useState(true);
    const { updatePostData } = useContext(PostContext);
    const [number, setNumber] = useState(null);
    const [height, setHeight] = useState(null);
    const [letter, setLetter] = useState(null);
    const formRef = useRef(null); // Referencia al formulario


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedsearchTermCity(searchTermCity);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [searchTermCity]);

    useEffect(() => {
        if (!shouldFetchCity) {
            setShouldFetchCity(true);
            return;
        }

        if (debouncedsearchTermCity.length >= 2) {
            fetchCities(debouncedsearchTermCity, searchTermProvince).then(setSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [debouncedsearchTermCity]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedsearchTermProvince(searchTermProvince);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTermProvince]);

    useEffect(() => {
        if (!shouldFetchProvince) {
            setShouldFetchProvince(true);
            return;
        }

        if (debouncedsearchTermProvince.length >= 2) {
            fetchProvinces(debouncedsearchTermProvince).then(setSuggestionsProvince);
        } else {
            setSuggestionsProvince([]);
        }
    }, [debouncedsearchTermProvince]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedsearchTermStreet(searchTermStreet);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTermStreet]);

    useEffect(() => {
        if (!shouldFetchStreet) {
            setShouldFetchStreet(true);
            return;
        }

        if (debouncedsearchTermStreet.length >= 2) {
            fetchStreets(debouncedsearchTermStreet, searchTermCity, searchTermProvince, postalCodeTerm).then(setSuggestionsStreet);
        } else {
            setSuggestionsStreet([]);
        }
    }, [debouncedsearchTermStreet]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formRef.current && formRef.current.checkValidity()) {
            updatePostData({
                tipoAnuncio,
                tipoVivienda,
                address: {
                    province: searchTermProvince,
                    city: searchTermCity,
                    postalCode: postalCodeTerm,
                    street: searchTermStreet,
                    number,
                    height: height,
                    letter: letter
                }
            });
            goToUploadData();
        }
    }
    const goToUploadData = () => {
        updatePostData({
            tipoAnuncio,
            tipoVivienda,
            address:{
                province: searchTermProvince,
                city: searchTermCity,
                postalCode: postalCodeTerm,
                street: searchTermStreet,
                number,
                height,
                letter
            }
        });
        navigate('/listings/new/uploadData');
    };

    const handleTipoAnuncioChange = (e) => {
        setTipoAnuncio(e.target.value);
    };

    const handleChangeCity = (event) => {
        setsearchTermCity(event.target.value);
    };

    const handleSelectCity = (city) => {
        setsearchTermCity(city);
        setSuggestions([]);
        setShouldFetchCity(false);
    };

    const handleChangeProvince = (event) => {
        setsearchTermProvince(event.target.value);
    };

    const handleSelectProvince = (province) => {
        setsearchTermProvince(province);
        setSuggestionsProvince([]);
        setShouldFetchProvince(false);
    };

    const handleChangeStreet = (event) => {
        setsearchTermStreet(event.target.value);
    };

    const handleSelectStreet = (street) => {
        setsearchTermStreet(street);
        setSuggestionsStreet([]);
        setShouldFetchStreet(false);
    };

    const handleChangePostalCode = (event) => {
        setPostalCodeTerm(event.target.value);
    };

    return (
        <div>
            <button className="back-button" onClick={() => navigate(-1)}>
                ⮌ <FormattedMessage id="project.app.button.back" defaultMessage={intl.formatMessage({ id: "project.app.back" })} />
            </button>
            <div className="publish-page">
                <div className="publish-card">
                    <h2 className="publish-title">
                        <FormattedMessage id="project.publish.post.H1.title"/>
                    </h2>
                    <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                    <form
                        ref={formRef}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <label>
                            <input type="radio" name="tipoAnuncio" value="venta" checked={tipoAnuncio === 'venta'} onChange={handleTipoAnuncioChange} required/>
                            {intl.formatMessage({id: "project.publish.post.list"})}
                        </label>
                        <label>
                            <input type="radio" name="tipoAnuncio" value="alquiler" checked={tipoAnuncio === 'alquiler'} onChange={handleTipoAnuncioChange} required/>
                            {intl.formatMessage({id: "project.publish.post.rent"})}
                        </label>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="firstName">
                            <FormattedMessage id="project.global.fields.property.type"/>
                        </label>
                        <select name="tipoVivienda" id="tipoVivienda" className="input-field" value={tipoVivienda}
                                onChange={(e) => setTipoVivienda(e.target.value)} required>
                            <option value="">Seleccionar tipo</option>
                            <option value="Casa">{intl.formatMessage({id: "project.post.casa"})}</option>
                            <option value="Piso">{intl.formatMessage({id: "project.post.piso"})}</option>
                            <option value="Chalet">{intl.formatMessage({id: "project.post.chalet"})}</option>
                        </select>
                    </div>
                    <h2 className="publish-title-ubication">
                        <FormattedMessage id="project.publish.post.H2.ubication"/>
                    </h2>
                    <div className="piso-details">
                        <div className="form-group">
                            <label htmlFor="province">
                        <FormattedMessage id="project.publish.post.province" />
                            </label>
                            <div className="input-wrapper">
                                <input type="text" name="province" id="province" className="input-wrapper" value={searchTermProvince}
                                       onChange={handleChangeProvince} required/>
                                {suggestionsProvince.length > 0 && (
                                    <ul className="suggestions-dropdown">
                                        {suggestionsProvince.slice(0, 3).map((province, index) => (
                                            <li key={index} onClick={() => handleSelectProvince(province)}>
                                                {province}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">
                                <FormattedMessage id="project.publish.post.city" />
                            </label>
                            <div className="input-wrapper">
                                <input type="text" name="city" id="city" className="input-field" value={searchTermCity}
                                       onChange={handleChangeCity} required/>
                                {suggestions.length > 0 && (
                                    <ul className="suggestions-dropdown">
                                        {suggestions.slice(0, 3).map((city, index) => (
                                            <li key={index} onClick={() => handleSelectCity(city)}>
                                                {city}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="street">
                                <FormattedMessage id="project.publish.post.postalcode" />
                            </label>
                                <input type="text" name="postalcode" id="postalcode" className="input-field" value={postalCodeTerm}
                                    onChange={handleChangePostalCode} required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="street">
                                <FormattedMessage id="project.publish.post.street" />
                            </label>
                            <div className="input-wrapper">
                                <input type="text" name="street" id="street" className="input-field" value={searchTermStreet}
                                       onChange={handleChangeStreet} required/>
                                {suggestionsStreet.length > 0 && (
                                    <ul className="suggestions-dropdown">
                                        {suggestionsStreet.slice(0, 3).map((street, index) => (
                                            <li key={index} onClick={() => handleSelectStreet(street)}>
                                                {street}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="number">
                                <FormattedMessage id="project.publish.post.number" />
                            </label>
                            <input type="text" name="letra" id="number" className="input-field" value={number} onChange={(e) => setNumber(e.target.value)} required/>
                        </div>
                    </div>

                    {tipoVivienda === 'Piso' && (
                        <div className="piso-options">
                            <div className="form-row"> {/* Nuevo contenedor flex */}
                                <div className="form-group form-group-half">
                                    <label htmlFor="altura">
                                        <FormattedMessage id="project.publish.post.floor" />
                                    </label>
                                    <input type="number" name="altura" id="altura" className="input-field" value={height} onChange={(e) => setHeight(e.target.value)} required/>
                                </div>

                                <div className="form-group form-group-half">
                                    <label htmlFor="letra">
                                        <FormattedMessage id="project.publish.post.letter" />
                                    </label>
                                    <input type="text" name="letra" id="letra" className="input-field" value={letter} onChange={(e) => setLetter(e.target.value)} required/>
                                </div>
                            </div>
                        </div>
                    )}
                    <button className="continue-button" >
                        <FormattedMessage id="project.app.login.form.continue"/>
                    </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PublishPost;

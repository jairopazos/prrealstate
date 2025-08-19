/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import React, {useRef, useState} from 'react';
import './UploadData.css';
import {FormattedMessage, useIntl} from "react-intl";
import { PostContext } from './PostContext';
import { useContext } from 'react';
import {useNavigate} from "react-router-dom";
import * as actions from "../actions";
import {useSelector, useDispatch} from 'react-redux';
import users from '../../users';

const UploadData = ({ onUploadComplete }) => {
    const dispatch = useDispatch();
    const [backendErrors, setBackendErrors] = useState(null);
    const [errors, setErrors] = useState(null);
    const formRef = useRef(null);
    const intl = useIntl();
    const { postData, updatePostData } = useContext(PostContext);
    const navigate = useNavigate();
    const [telephone, setTelephone] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const userId = useSelector(users.selectors.getUserId);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formRef.current && formRef.current.checkValidity()) {
            dispatch(
                actions.publishPost({
                    tipoAnuncio: postData.tipoAnuncio,
                    tipoVivienda: postData.tipoVivienda,
                    description: postData.description,
                    urls: postData.urls,
                    ownerName: name,
                    telephone: telephone,
                    formattedPrice: postData.formattedPrice,
                    address: postData.address,
                    ascensor: postData.ascensor,
                    garaje: postData.garaje,
                    metrosConstruidos: postData.metrosConstruidos,
                    metrosUtiles: postData.metrosUtiles,
                    numHabitaciones: postData.numHabitaciones,
                    numBanos: postData.numBanos,
                    exterior: postData.exterior,
                    orientacion: postData.orientacion,
                    amueblado: postData.amueblado,
                    trastero: postData.trastero,
                    jardin: postData.jardin,
                    terraza: postData.terraza,
                    calefaccion: postData.calefaccion,
                    piscina: postData.piscina,
                    estado: postData.estado,
                    precio: postData.formattedPrice,
                    email: email,
                    urlsPanoramic: postData.urlsPanoramic,
                    hotspots: postData.hotspots,
                    userId: userId
                },
                    () => setSuccessMessage(intl.formatMessage({
                        id: "project.publish.success",
                        defaultMessage: "¡Anuncio creado correctamente!"
                        })),
                    (errors) => {
                        setBackendErrors(errors);

                    },
                    () => {
                        //navigate('/');
                    }
                )
            );
        } else {
            setBackendErrors(null);
            if (formRef.current) {
                formRef.current.classList.add('was-validated');
            }
        }
        if (errors === null) {
            setShowSuccess(true);
            setSuccessMessage(intl.formatMessage({
                id: "project.publish.success",
                defaultMessage: "¡Anuncio creado correctamente!"
            }));
        }
    };

    return (

        <div>
            <button className="back-button" onClick={() => navigate(-1)}>
                ⮌ <FormattedMessage id="project.app.button.back" defaultMessage={intl.formatMessage({ id: "project.app.back" })} />
            </button>
            <div className={`publish-page ${showSuccess ? 'form-disabled' : ''}`}>
                <div className="publish-card">
                    <div>
                        {successMessage && (
                            <div className="custom-success">
                                <p>{successMessage}</p>
                                <button
                                    className="close-btn"
                                    onClick={() => navigate('/')}
                                >
                                    &times;
                                </button>
                            </div>
                        )}
                        <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>

                            <h2 className="publish-title">
                                <FormattedMessage id="project.publish.post.upload.contact"/>
                            </h2>

                            <h3 className="publish-title">
                                <FormattedMessage id="project.global.fields.firstName"/>
                            </h3>
                            <input type="name" name="name" id="name" className="input-field" value={name} onChange={(e) => setName(e.target.value)} required/>
                            <br></br><br></br><br></br>

                            <h3 className="publish-title">
                                <FormattedMessage id="project.global.fields.telephone"/>
                            </h3>
                            <input type="telephone" name="telephone" id="telephone" className="input-field" value={telephone} onChange={(e) => setTelephone(e.target.value)} required/>

                            <br></br><br></br><br></br>

                            <h3 className="publish-title">
                                <FormattedMessage id="project.global.fields.email"/>
                            </h3>
                            <input type="email" name="email" id="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            <br></br><br></br><br></br>

                            <button className="continue-button">
                                <FormattedMessage id="project.app.login.form.upload"/>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadData;

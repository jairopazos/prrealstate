/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Login.css';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';
import {Errors} from '../../common';
import {FormattedMessage} from "react-intl";
import { useIntl } from 'react-intl';

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [backendErrors, setBackendErrors] = useState(null);
    const navigate = useNavigate(); // Inicializa el hook navigate
    const formRef = useRef(null); // Referencia al formulario
    const intl = useIntl();

    const goToRegister = () => {
        navigate('/users/signUp');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formRef.current && formRef.current.checkValidity()) {
            dispatch(
                actions.login(
                    email.trim(),
                    password,
                    () => navigate('/'),
                    (errors) => {
                        setBackendErrors(errors);
                        setBackendErrors(errors);

                    },
                    () => {
                        navigate('/users/login');
                        dispatch(actions.logout());
                    }
                )
            );
        } else {
            setBackendErrors(null);
            if (formRef.current) {
                formRef.current.classList.add('was-validated');
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">
                    <FormattedMessage id="project.app.login.form.login"/>
                </h2>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <form
                    ref={formRef}
                    className="login-form"
                    onSubmit={(e) => handleSubmit(e)}
                    noValidate
                >
                    <div className="form-group">
                        <label htmlFor="email">
                            <FormattedMessage id="project.app.login.form.email"/>
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder={intl.formatMessage({ id: "project.app.login.form.email" })}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            <FormattedMessage id="project.app.login.form.password"/>
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder={intl.formatMessage({ id: "project.app.login.form.input.password" })}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="login-button">
                        <FormattedMessage id="project.app.login.form.login"/>
                    </button>
                </form>
                <div className="separator">o</div>
                <button className="register-button" onClick={goToRegister}>
                    <FormattedMessage id="project.app.login.create.account"/>
                </button>
            </div>
        </div>
    );
};

export default Login;

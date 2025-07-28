/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import React, { useState, useRef } from 'react';
import './Register.css';
import './DateOfBirthForm.css';
import * as actions from "../actions";
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import { useIntl } from 'react-intl';
import {Errors} from '../../common';

const Register = () => {

    const dispatch = useDispatch();
    const [dob, setDob] = useState("");
    const [backendErrors, setBackendErrors] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [surname, setSurname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
    const navigate = useNavigate();
    const formRef = useRef(null);
    const intl = useIntl();
    let confirmPasswordInput;

    const handleChange = (e) => {
        setDob(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formRef.current && formRef.current.checkValidity() && checkConfirmPassword()) {
            dispatch(
                actions.signUp(
                    {firstName: firstName.trim(),
                    lastName: surname.trim(),
                    email: email.trim(),
                    birthDate: dob,
                    password: password
                    },
                    () => navigate('/'),
                    (errors) => {
                        setBackendErrors(errors);

                    },
                    () => {
                        navigate('/');
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

    const checkConfirmPassword = () => {

        if (password !== confirmPassword) {

            confirmPasswordInput.setCustomValidity('error');
            setPasswordsDoNotMatch(true);

            return false;

        } else {
            return true;
        }

    }

    const handleConfirmPasswordChange = value => {

        confirmPasswordInput.setCustomValidity('');
        setConfirmPassword(value);
        setPasswordsDoNotMatch(false);

    }

    return (
        <div className="register-page">
            <div className="register-card">
                <h2 className="login-title">
                    <FormattedMessage id="project.app.register.title"/>
                </h2>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <form ref={formRef} className="signup-form"
                      onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="firstName">
                            <FormattedMessage id="project.global.fields.firstName"/>
                        </label>
                        <input type="firstName" id="firstName" placeholder={intl.formatMessage({ id: "project.global.fields.firstName" })} onChange={e => setFirstName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">
                            <FormattedMessage id="project.global.fields.lastName"/>
                        </label>
                        <input type="surname" id="surname" placeholder={intl.formatMessage({ id: "project.global.fields.lastName" })} onChange={e => setSurname(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthdate">
                            <FormattedMessage id="project.app.register.birth.name"/>
                        </label>
                        <input
                            type="date"
                            id="birthdate"
                            name="dob"
                            value={dob}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">
                            <FormattedMessage id="project.global.fields.email"/>
                        </label>
                        <input type="email" id="email" placeholder={intl.formatMessage({ id: "project.global.fields.email" })} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            <FormattedMessage id="project.global.fields.password"/>
                        </label>
                        <input type="password" id="password" placeholder={intl.formatMessage({ id: "project.app.login.form.input.password" })} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            <FormattedMessage id="project.global.fields.password.repeat"/>
                        </label>
                        <input ref={node => confirmPasswordInput = node} type="password" id="confirmPassword"
                           placeholder={intl.formatMessage({ id: "project.app.login.form.input.password.repeat" })} onChange={e => handleConfirmPasswordChange(e.target.value)}/>
                    </div>
                    <button className="register-user-button">
                        <FormattedMessage id="project.app.register.title"/>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;

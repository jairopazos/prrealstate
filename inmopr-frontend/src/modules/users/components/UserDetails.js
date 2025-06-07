import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import * as actions from '../actions';
import {Errors} from '../../common';
import {FormattedMessage} from "react-intl";
import { useIntl } from 'react-intl';
import {useSelector, useDispatch} from 'react-redux';
import * as selectors from '../selectors';
import './UserDetails.css';

const UserDetails = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectors.getUser);
    const navigate = useNavigate();
    const formRef = useRef(null);
    let confirmPasswordInput;
    const intl = useIntl();

    // Estado inicial basado en el usuario
    const initialData = {
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
        email: user.email,
        password: '',
        confirmPassword: ''
    };

    // Estado del formulario
    const [formData, setFormData] = useState(initialData);
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);
    const [backendErrors, setBackendErrors] = useState(null);

    // Actualizar el estado inicial cuando el usuario cambie
    useEffect(() => {
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            email: user.email,
            password: '',
            confirmPassword: ''
        });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const checkConfirmPassword = () => {
        if (formData.password !== formData.confirmPassword) {
            confirmPasswordInput.setCustomValidity('error');
            setPasswordsDoNotMatch(true);
            return false;
        } else {
            return true;
        }
    }

    const hasChanges = () => {
        return (
            formData.firstName !== initialData.firstName ||
            formData.lastName !== initialData.lastName ||
            formData.birthDate !== initialData.birthDate ||
            formData.email !== initialData.email ||
            formData.password !== '' ||
            formData.confirmPassword !== ''
        );
    };

    const handleConfirmPasswordChange = value => {
        confirmPasswordInput.setCustomValidity('');
        setFormData(prev => ({ ...prev, confirmPassword: value }));
        setPasswordsDoNotMatch(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formRef.current && formRef.current.checkValidity()) {
            dispatch(
                actions.updateProfile(
                    {id: user.id,
                        firstName: formData.firstName.trim(),
                        lastName: formData.lastName.trim(),
                        email: formData.email.trim(),
                        birthDate: formData.birthDate,
                        password: formData.password === "" ? null : formData.password
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

    return (
        <div className="user-details-page">
            <div className="user-details-card">
                <h2 className="login-title">
                    {user.firstName}
                </h2>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <form ref={formRef} className="signup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">
                            <FormattedMessage id="project.global.fields.firstName"/>
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">
                            <FormattedMessage id="project.global.fields.lastName"/>
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthDate">
                            <FormattedMessage id="project.app.register.birth.name"/>
                        </label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            className={formData.birthDate === initialData.birthDate ? "unmodified-date" : "modified-date"}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">
                            <FormattedMessage id="project.global.fields.email"/>
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder={user.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            <FormattedMessage id="project.global.fields.password"/>
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='********'
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            <FormattedMessage id="project.global.fields.password.repeat"/>
                        </label>
                        <input
                            ref={node => confirmPasswordInput = node}
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={e => handleConfirmPasswordChange(e.target.value)}
                            placeholder='********'
                        />
                    </div>
                    <button
                        type="submit"
                        className="user-details-user-button"
                        disabled={!hasChanges() || passwordsDoNotMatch}
                    >
                        <FormattedMessage id="project.app.user.modify"/>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserDetails;
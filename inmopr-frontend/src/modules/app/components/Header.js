/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import React, { useState } from 'react';
import './Header.css';
import {FormattedMessage} from "react-intl";
import users from '../../users';
import {useSelector} from 'react-redux';
import { useLocation } from 'react-router-dom';
import {getUserId} from "../../users/selectors";


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const userName = useSelector(users.selectors.getFirstName);
    const userId = useSelector(users.selectors.getUserId);
    const location = useLocation();
    const isOnPostPage = location.pathname.startsWith('/listings/new');


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div className="container">
                <a href="/" className="luxury-title-link">
                    <div className="container">
                        <h1 className="luxury-title"><FormattedMessage id="project.app.H1.title"/></h1>
                    </div>
                </a>

                <div className="nav-right">
                    {!isOnPostPage && (
                        <a href="/listings/new" className="publish-link">
                            {userName &&
                                <FormattedMessage id="project.app.href.publishpost"/>}
                        </a>)}

                    <div className="dropdown">
                        <a href={userName ? "/users/details" : "/users/login"} className="login-link">
                            {userName ? userName :
                                <FormattedMessage id="project.app.href.micuenta"/>}
                        </a>
                        {/* Este es el menú que se mostrará */}
                        {userName && (
                            <div className="dropdown-content-header">
                                <a href={`/listings/user/${userId}`}>Ver mis anuncios publicados</a>
                                <a href="/users/logout">Cerrar sesión</a>
                            </div>
                        )}
                    </div>

                    <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>
            </div>

            <nav className={`menu ${menuOpen ? 'open' : ''}`}>
                <ul>
                    {/* Renderiza las opciones del menú de hamburguesa basadas en el estado del usuario */}
                    {userName ? (
                        <>
                            <li>
                                <a href="/listings/new">
                                    <FormattedMessage id="project.app.href.publishpost"/>
                                </a>
                            </li>
                            <li>
                                <a href={`/listings/user/${userId}`}>
                                    Ver mis anuncios publicados
                                </a>
                            </li>
                            <li>
                                <a href="/users/details">
                                    {userName}
                                </a>
                            </li>
                            <li>
                                <a href="/users/logout">
                                    Cerrar sesión
                                </a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <a href="/users/login">
                                    <FormattedMessage id="project.app.href.micuenta"/>
                                </a>
                            </li>
                            <li>
                                <a href="/listings/new">
                                    <FormattedMessage id="project.app.href.publishpost"/>
                                </a>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
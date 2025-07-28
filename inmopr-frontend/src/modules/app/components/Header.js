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


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const userName = useSelector(users.selectors.getFirstName);
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

                    <a href={userName ? "/users/details" : "/users/login"} className="login-link">
                        {userName ? userName :
                            <FormattedMessage id="project.app.href.micuenta"/>}
                    </a>

                    <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>
            </div>

            <nav className={`menu ${menuOpen ? 'open' : ''}`}>
                <ul>
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
                </ul>
            </nav>
        </header>
    );
};

export default Header;

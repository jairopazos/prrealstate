/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import React, {useRef, useState} from 'react';
import './UploadData.css';
import { FormattedMessage, useIntl } from "react-intl";
import { PostContext } from './PostContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {Errors} from "../../common";

const API_KEY = 'f37fb19bb9876fc87a4f01f097086c6f'; // Reemplaza esto con tu key

const UploadData = ({ onUploadComplete }) => {
    const [backendErrors, setBackendErrors] = useState(null);
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState(null);
    const intl = useIntl();
    const [formattedPrice, setFormattedPrice] = useState('');
    const { postData, updatePostData } = useContext(PostContext);
    const navigate = useNavigate();
    const formRef = useRef(null); // Referencia al formulario

    const uploadToImgBB = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.error.message);

        return data.data.url;
    };

    const handleFiles = async (files) => {
        setLoading(true);
        setErrors(null);

        try {
            const uploads = Array.from(files).map(file => uploadToImgBB(file));
            const results = await Promise.all(uploads);
            setUrls(results);
            onUploadComplete && onUploadComplete(results);
        } catch (error) {
            setErrors(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        handleFiles(files);
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        handleFiles(files);
    };

    const handlePriceChange = (e) => {
        const raw = e.target.value.replace(/[^\d]/g, ''); // solo números
        const formatted = new Intl.NumberFormat('es-ES').format(raw); // formato español
        setFormattedPrice(raw ? `${formatted} €` : '');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formRef.current && formRef.current.checkValidity()) {
            const inf = postData.height;
            updatePostData({
                formattedPrice,
                description,
                urls
            });
            goToUploadContactInformation();
        }
    }
    const goToUploadContactInformation = () => {
        navigate('/listings/new/uploadDataDetails');
    };

    return (
    <div>
        <button className="back-button" onClick={() => navigate(-1)}>
            ⮌ <FormattedMessage id="project.app.button.back" defaultMessage={intl.formatMessage({ id: "project.app.back" })} />
        </button>
            <div className="publish-page">
                <div className="publish-card">
                    <div>

                        <h2 className="publish-title">
                            <FormattedMessage id="project.publish.post.upload.price"/>
                        </h2>

                        <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>

                        <form
                            ref={formRef}
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <input type="price" name="price" id="price" className="input-field-price" value={formattedPrice} onChange={handlePriceChange} required/>
                            <br></br><br></br><br></br>

                            <h2 className="publish-title">
                                <FormattedMessage id="project.publish.post.upload.description"/>
                            </h2>

                            <textarea
                                id="description"
                                name="description"
                                className="input-field"
                                rows="10"
                                placeholder={intl.formatMessage({ id: "project.publish.post.upload.description.text" })}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <br></br><br></br><br></br>
                            <h2 className="publish-title">
                                <FormattedMessage id="project.publish.post.upload.images"/>
                            </h2>

                            <div
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                                style={{
                                    border: '2px dashed #ccc',
                                    padding: '20px',
                                    marginBottom: '10px',
                                    textAlign: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <FormattedMessage id="project.publish.post.upload.images.text"/>
                                <br></br>
                                <br></br>
                                <input type="file" accept="image/*" multiple onChange={handleFileChange} required/>
                            </div>

                            {loading && <p><FormattedMessage id="project.publish.post.upload.images.uploading"/></p>}
                            {errors && <p style={{ color: 'red' }}>Error: {errors}</p>}

                            <br></br><br></br>

                            <button className="continue-button" disabled={loading}>
                                <FormattedMessage id="project.app.login.form.continue"/>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
    </div>
    );
};

export default UploadData;

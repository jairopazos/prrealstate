/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

import React, { useRef, useState } from 'react';
import './UploadData.css';
import { FormattedMessage, useIntl } from "react-intl";
import { PostContext } from './PostContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Errors } from "../../common";
import MarzipanoTour from './MarzipanoTour';
import './Upload3DTour.css';

const API_KEY = 'f37fb19bb9876fc87a4f01f097086c6f'; // Reemplaza esto con tu key

const Upload3DTour = ({ onUploadComplete }) => {
    const [backendErrors, setBackendErrors] = useState(null);
    const [urlsPanoramic, setUrlsPanoramic] = useState([]);
    const [hotspots, setHotspots] = useState([]); // Estado para los hotspots
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const intl = useIntl();
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
            setUrlsPanoramic(results);

            // Definir los hotspots aquí
            const newHotspots = [
                { position: { yaw: 0, pitch: 0.1 }, targetSceneIndex: 1 },
                { position: { yaw: Math.PI / 2, pitch: 0 }, targetSceneIndex: 2 },
                { position: { yaw: Math.PI, pitch: 0.1 }, targetSceneIndex: 3 }, // Ejemplo de un hotspot adicional
            ];
            setHotspots(newHotspots);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formRef.current && formRef.current.checkValidity()) {
            updatePostData({
                urlsPanoramic,
                hotspots,
            });
            goToUploadContactInformation();
        }
    };

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

                        <Errors errors={backendErrors} onClose={() => setBackendErrors(null)} />

                        <form ref={formRef} onSubmit={handleSubmit}>
                            <h2 className="publish-title">
                                <FormattedMessage id="project.publish.post.upload.images.panoramic"/>
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
                                <input type="file" accept="image/*" multiple onChange={handleFileChange} required />
                            </div>

                            {loading && <p><FormattedMessage id="project.publish.post.upload.images.uploading" /></p>}
                            {errors && <p style={{ color: 'red' }}>Error: {errors}</p>}

                            <button className="continue-button" disabled={loading}>
                                <FormattedMessage id="project.app.login.form.continue"/>
                            </button>

                        </form>
                    </div>
                </div>
            </div>

            {urlsPanoramic.length > 0 && (
                <div style={{ marginTop: '40px', marginLeft: '20px', textAlign: 'center' }}>
                    <h3 style={{ textAlign: 'center' }}>
                        <FormattedMessage
                            id="project.preview.title"
                            defaultMessage="Previsualización del tour virtual"
                        />
                    </h3>
                    <MarzipanoTour panoramas={urlsPanoramic} hotspots={hotspots} />
                </div>
            )}

            <br /><br />

        </div>
    );
};

export default Upload3DTour;

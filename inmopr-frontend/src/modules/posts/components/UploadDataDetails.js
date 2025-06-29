import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { PostContext } from './PostContext';
import './UploadDataDetails.css';

const UploadDataDetails = () => {
    const { postData, updatePostData } = useContext(PostContext);
    const navigate = useNavigate();
    const intl = useIntl();

    const [formValues, setFormValues] = useState({
        ascensor: false,
        garaje: false,
        metrosConstruidos: '',
        metrosUtiles: '',
        numHabitaciones: '',
        numBanos: '',
        exterior: false,
        orientacion: '',
        amueblado: false,
        trastero: false,
        jardin: false,
        terraza: false,
        calefaccion: false,
        piscina: false,
        estado: ''
    });

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleChangeInput = (e) => {
        const { name, type, checked, value } = e.target;

        if (name === 'metrosConstruidos' || name === 'metrosUtiles') {
            // Elimina cualquier " m²" anterior, solo si ya existe.
            let rawValue = value.replace(/\s*m²/g, '').trim();

            // Solo añadir " m²" si no está ya al final.
            if (rawValue && !rawValue.includes('m²')) {
                rawValue += ' m²';
            }

            setFormValues({
                ...formValues,
                [name]: rawValue,
            });
        } else {
            setFormValues({
                ...formValues,
                [name]: type === 'checkbox' ? checked : value,
            });
        }
    };


        const handleContinue = () => {
        updatePostData({ ...postData, ...formValues });
        navigate('/listings/new/uploadContactInformation');
    };

    return (
        <div>
            <button className="back-button" onClick={() => navigate(-1)}>
                ⮌ <FormattedMessage id="project.app.button.back" defaultMessage={intl.formatMessage({ id: "project.app.back" })} />
            </button>
            <div className="publish-page">
                <div className="publish-card">
                    <h2 className="publish-title">
                        <FormattedMessage id="project.publish.post.features" defaultMessage="Características de la propiedad" />
                    </h2>
                    <br></br>
                    <form  className="features-form">
                        {/* Checkboxes */}
                        <div className="features-grid">
                            {[
                                'ascensor', 'garaje', 'exterior',
                                'amueblado', 'trastero', 'jardin',
                                'terraza', 'calefaccion', 'piscina'
                            ].map((feature) => (
                                <label key={feature} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        name={feature}
                                        checked={formValues[feature]}
                                        onChange={handleChange}
                                    />
                                    <FormattedMessage id={`project.features.${feature}`} defaultMessage={feature} />
                                </label>
                            ))}
                        </div>

                        <br /><br/>
                        {/* Inputs numéricos */}
                        <label>
                            <FormattedMessage id="project.features.metrosConstruidos" defaultMessage="Metros construidos" />
                            <input
                                type="text"
                                className="input-without-border"
                                name="metrosConstruidos"
                                value={formValues.metrosConstruidos}
                                onChange={handleChangeInput}
                                required
                            />
                            <span className="fake-unit"></span>
                        </label>
                        <br></br><br></br><br/>
                        <label>
                            <FormattedMessage id="project.features.metrosUtiles" defaultMessage="Metros útiles" />
                            <input
                                type="text"
                                className="input-without-border"
                                name="metrosUtiles"
                                value={formValues.metrosUtiles}
                                onChange={handleChangeInput}
                                required
                            />
                        </label>
                        <br></br><br></br><br/>
                        <label>
                            <FormattedMessage id="project.features.numHabitaciones" defaultMessage="Nº de habitaciones" />
                            <input
                                type="number"
                                className="input-without-border"
                                name="numHabitaciones"
                                value={formValues.numHabitaciones}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <br></br><br></br><br/>
                        <label>
                            <FormattedMessage id="project.features.numBanos" defaultMessage="Nº de baños" />
                            <input
                                type="number"
                                className="input-without-border"
                                name="numBanos"
                                value={formValues.numBanos}
                                onChange={handleChange}
                                required
                            />

                        </label>
                        <br></br><br /><br/>
                        {/* Selector de orientación */}
                        <label>
                            <FormattedMessage id="project.features.orientacion" defaultMessage="Orientación" />
                            <select className="select-orientacion" name="orientacion" value={formValues.orientacion} onChange={handleChange} required>
                                <option value="">TODAS</option>
                                <option value="norte">Norte</option>
                                <option value="sur">Sur</option>
                                <option value="este">Este</option>
                                <option value="oeste">Oeste</option>
                            </select>
                        </label>

                        <br /><br /><br /><br/>

                        <h2 className="publish-title">
                            <FormattedMessage id="project.publish.post.features" defaultMessage="Estado" />
                        </h2>
                        <select name="estado" id="estado" className="input-field-estado"
                                onChange={handleChange} required>
                            <option value="">Seleccionar estado</option>
                            <option value="Obra nueva">{intl.formatMessage({id: "project.post.status.new"})}</option>
                            <option value="Buen estado">{intl.formatMessage({id: "project.post.status.good"})}</option>
                            <option value="A reformar">{intl.formatMessage({id: "project.post.status.reform"})}</option>
                        </select>

                        <br /><br/>
                        <button type="button" className="continue-button" onClick={handleContinue}>
                            <FormattedMessage id="project.global.continue" defaultMessage="Continuar" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadDataDetails;

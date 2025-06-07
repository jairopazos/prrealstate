import React from 'react';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import './Errors.css';

const Errors = ({errors, onClose}) => {

    const intl = useIntl();

    if (!errors) {
        return null;
    }

    let globalError;
    let fieldErrors;

    if (errors.globalError) {
        globalError = intl.formatMessage({id: `${errors.globalError}`});
    } else if (errors.fieldErrors) {
        fieldErrors = [];
        errors.fieldErrors.forEach(e => {
            let fieldName = intl.formatMessage({id: `project.global.fields.${e.fieldName}`});
            fieldErrors.push(`${fieldName}: ${e.message}`)
        });

    }

    return (

        <div className="custom-alert">
            {globalError && <p>{globalError}</p>}

            {fieldErrors && (
                <ul>
                    {fieldErrors.map((fieldError, index) => (
                        <li key={index}>{fieldError}</li>
                    ))}
                </ul>
            )}

            <button className="close-btn" onClick={() => onClose()}>
                &times;
            </button>
        </div>



    );

}

Errors.propTypes = {
    errors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onClose: PropTypes.func.isRequired
};

export default Errors;

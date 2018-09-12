import React from 'react';
import {
    ControlLabel, Row, Col,
} from 'react-bootstrap';
// import { render } from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import './Corporation.scss';
import { connect } from 'react-redux';
import { Businesscategorys } from '../../../../../common/Constants';
import floatingLabelField from '../../../FloatingLabel/FloatingLabel';
import { validateEmail, required } from '../../../../../common/Utils';

export const validate = values => {
    const error = {};
    const emailError = validateEmail(values);
    if (emailError) {
        error.email = emailError;
    }

return error;
};

/* eslint-disable react/prop-types */
export const FieldFileInput = ({
    input: { onChange }, label, meta: { touched, error },
}) => (
    <div>
        <ControlLabel>{label}</ControlLabel>
        <div className="file">
            <input
                type="file"
                id="file-input"
                accept=".jpg, .png, .jpeg, .pdf, .txt"
                onChange={e => onChange(e.target.files[0])} />
            <ControlLabel htmlFor="file-input">Upload</ControlLabel>
            {touched && ((error
                 && (<span className="error_text">{error}</span>)))}
        </div>
    </div>
);

export const renderDropDown = ({ label, input, meta: { touched, error } }) => (
    <div className={input.value === ''
        ? 'form-group' : 'form-group labelActive'}>
        <div className={touched
            && error ? 'floatLabelWrap errorBorder' : 'floatLabelWrap'}>
            <select {...input} className="inputTxtStyle">
                <option value="" disabled />
                {Businesscategorys.map(obj => (
                    <option value={obj.value} key={obj.id}>
                        {obj.value}
                    </option>
                ))}
            </select>
            <ControlLabel className="labelTxt">{label}</ControlLabel>
            {touched && error && <span className="error_text">{error}</span>}
        </div>
    </div>
);

export const handleOnChange = event => {
    if (event.target.value === 'Real Estate') {
        document.getElementById('fileupload').style.display = 'block';
    } else {
        document.getElementById('fileupload').style.display = 'none';
    }
};

const Corporation = props => {
    const {
        handleSubmit, submitting,
    } = props;

    return (
        <div>
            <div className="HeaderTxtWrap">
                <Col lg={12} sm={12}>
                    <p className="HeaderTxt_ComBusiness">
                        <b>
Select the option that best describes your business
                        </b>
                    </p>
                </Col>
            </div>
            <div className="formOutterWrap">
                <form onSubmit={handleSubmit} className="Com-form-style">
                    <ul className="formListWrap">
                        <li>
                            <Field
                                name="comName"
                                type="text"
                                label="Your Full Name*"
                                component={floatingLabelField}
                                validate={required} />
                        </li>
                        <li>
                            <Field
                                name="email"
                                type="text"
                                label="Email*"
                                component={floatingLabelField}
                                validate={required} />
                        </li>
                        <li>
                            <Field
                                name="comBusinessName"
                                type="text"
                                label="Name of Business*"
                                component={floatingLabelField}
                                validate={required} />
                        </li>
                        <li>
                            <Field
                                name="categorys"
                                className="categorys"
                                component={renderDropDown}
                                validate={[required]}
                                onChange={handleOnChange}
                                label="Business Category*" />
                        </li>
                        <li>
                            <Field
                                name="comCity"
                                type="text"
                                label="EIN*"
                                component={floatingLabelField}
                                validate={required} />
                        </li>
                        <li>
                            <div className="form-group">
                                <ControlLabel>
                                    <input type="checkbox"/>
I am a non-profit 501(c) organization
                                </ControlLabel>
                            </div>
                            <div className="form-group">
                                <ControlLabel>
                                    <input type="checkbox"/>
I am a reseller
                                </ControlLabel>
                            </div>
                        </li>
                    </ul>
                    <div className="fileuploadwrap" id="fileupload">
                        <Row>
                            <Col lg={12} sm={12}>
                                <div className="fileupload">
                                    <p >
Please upload any supporting documents.
 Please note verification of these documents can take up to 24 hours.
                                        <br/>
                                        <br/>
                                        <b>Supported documents include:</b>
Resale certificate, Business License,
Professional license or permit, State tax exemption, Membership document
                                    </p>
                                </div>
                            </Col>
                            <Col lg={12} sm={12}>
                                <div className="fileuploadbuton">
                                    <Field
                                        name="uploadFile"
                                        component={FieldFileInput}
                                        validate={required}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="formBtnWrap">
                        <button
                            className="formBtn"
                            type="submit"
                            disabled={submitting}>
Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

Corporation.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
};


const corporationForm = reduxForm({
    form: 'Com', // a unique identifier for this form
    destroyOnUnmount: false,
    validate,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    enableReinitialize: true,
})(Corporation);

const mapStateToProps = state => ({
    initialValues:
     { email: state.login.userValues ? state.login.userValues.email : '' },
});

export default connect(mapStateToProps)(corporationForm);

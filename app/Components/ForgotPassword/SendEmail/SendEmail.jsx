import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import '../password.scss';
// import history from '../../../history';
import '../../Login/Login.scss';
import PropTypes from 'prop-types';
import floatingLabelField from '../../FloatingLabel/FloatingLabel';


export const validate = values => {
    const error = {};
    /* eslint max-len: ["error", { "ignoreRegExpLiterals": true }] */
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validEmail = emailPattern.test(values.email);
    if (!values.email) {
        error.email = 'Required';
    } else if (!validEmail) {
        error.email = 'Please Enter a Valid Email';
    }

    return error;
};


export const SendEmail = props => {
    const { handleSubmit } = props;

return (


    <div className="forgotPswdBox">
        <h1 className="title_h1 SendEmail">
                Forgot your password?
        </h1>
        <form onSubmit={handleSubmit}>
            <Field
                name="email"
                type="text"
                component={floatingLabelField}
                label="Email" />

            <div className="form-group formRowWrap">
                <button
                    type="submit"
                    className="btnBlueStyle createAccBtn">
                    Send Reset Link
                </button>
            </div>

        </form>
    </div>


    );
};

SendEmail.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

const SendEmailForm = reduxForm({
    form: 'SendEmail',
    validate,
})(SendEmail);

export const mapStateToProps = state => ({
    enableReinitialize: true,
    initialValues: {
        email: state.login.emailId,
    },
});

export default connect(mapStateToProps)(SendEmailForm);

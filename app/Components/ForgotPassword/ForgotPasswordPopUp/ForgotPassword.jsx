import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import history from '../../../history';
import floatingLabelField from '../../FloatingLabel/FloatingLabel';
import './ForgotPassword.scss';

export const validate = values => {
    const error = {};
    /* eslint max-len: ["error", { "ignoreRegExpLiterals": true }] */
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailPasswordPattern = /^[a-zA-Z0-9]{8,16}$/g;
    const validEmail = emailPattern.test(values.email);
    // eslint-disable-next-line
    const validPwd = emailPasswordPattern.test(values.password);
    if (!values.email) {
        error.email = 'Required';
    } else if (!validEmail) {
        error.email = 'Please Enter a Valid Email';
    }

    const capital = document.getElementById('capital');
    const special = document.getElementById('special');
    const length = document.getElementById('length');
    const upperCaseLetters = /[A-Z]/g;
    const SpecialSmallLetters = /[!@#$%^&*)(+=._-]/g;

    if (!values.password) {
        error.password = 'Required';
    } else {
        console.log('');
        if (values.password.length < 8) {
            error.password = 'Password should be greater than 8';
            length.classList.add('errorClass');
            capital.classList.add('errorClass');
            special.classList.add('errorClass');
        } else if (values.password.length > 15) {
            error.password = 'Password should be lesser than 16';
        } else {
            length.classList.remove('errorClass');
            length.classList.add('valid');
        }

        if (!values.password.match(upperCaseLetters)) {
            error.password = 'Need upper case';
            capital.classList.add('errorClass');
        } else {
            capital.classList.add('valid');
            capital.classList.remove('errorClass');
        }

        if (!values.password.match(SpecialSmallLetters)) {
            error.password = 'Need Atleast one special Character';
            special.classList.add('errorClass');
        } else {
            special.classList.add('valid');
            special.classList.remove('errorClass');
        }
    }

return error;
};


class ForgotPassword extends React.Component {
    render() {
        const { handleSubmit } = this.props;
        const handleSubmitForm = () => {
            history.push('./signin');
        };

        const domMessagePwd = document.getElementById('messagePwd');

        return (
            <div className="resetPasswordWrap">
                <h1 className="title_h1 forgotTitle">
                Create a new password
                </h1>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <Field
                        name="password"
                        type="password"
                        component={floatingLabelField}
                        label="Create New Password"
                        onFocus={() => {
                            domMessagePwd.style.display = 'block';
                        }}/>
                    <div id="messagePwd">
                        <p id="length" className="invalid">
                            ✔ 8 Character minimum
                        </p>
                        <p id="capital" className="invalid">
                            ✔ At least one capital letter
                        </p>
                        <p id="special" className="invalid">
                            ✔ At least one special characters (!,*,$,@)
                        </p>
                    </div>
                    <Field
                        name="confirmPassword"
                        type="password"
                        component={floatingLabelField}
                        label="Confirm Password"
                    />
                    <div className="form-group formRowWrap">
                        <Button
                            type="submit"
                            className="btnBlueStyle createAccBtn">
                        Set New Password
                        </Button>
                    </div>
                </form>
            </div>
            );
        }
    }


ForgotPassword.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'forgotPassword',
    validate,
})(ForgotPassword);

import React, { Component } from 'react';
import {
    ControlLabel, FormGroup, Button, Checkbox,
} from 'react-bootstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { bindActionCreators } from 'redux';
import './Signup.scss';
import Recaptcha from 'react-recaptcha';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../../history';
import * as LoginAction from '../../actions/LoginAction';
import floatingLabelField from '../FloatingLabel/FloatingLabel';


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

export class SignupForm extends Component {
    constructor() {
        super();
        this.state = {
            recaptchaVerified: false,
            hasGovEmail: false,
            isGovEmail: false,
        };
        this.qualifiedGovId = ['.gov', '.mil', '.state', '.edu'];
    }

    verifyCallback = () => {
        this.setState({
            recaptchaVerified: true,
        });
    }

    checkDomain = values => {
        const { email } = values;
        let getDomain = null;
        if (email) {
            getDomain = email.substring(email.lastIndexOf('.'));

            return getDomain.toLowerCase();
        }

        return getDomain;
    }

    handleChecked = value => {
        const { change, emailId } = this.props;
        let isGovEmail = false;
        if (value.target.checked) {
            const getDomain = this.checkDomain({ email: emailId });
            if (!this.qualifiedGovId.includes(getDomain)) {
                change('email', '');
                isGovEmail = true;
            }
        } else if (!value.target.checked) {
            isGovEmail = false;
        }

        this.setState({
            hasGovEmail: isGovEmail,
            isGovEmail: value.target.checked
        });
    };

    callback = () => console.log('Recaptcha loaded');

    render() {
        const { handleSubmit } = this.props;
        const { recaptchaVerified, hasGovEmail, isGovEmail } = this.state;
        const domMessagePwd = document.getElementById('messagePwd');

        const handlePagesOnSubmit = values => {
            const { actions } = this.props;
            const getDomain = this.checkDomain(values);
            actions.loginValues(values);
            if (this.qualifiedGovId.includes(getDomain)) {
                history.push('/gov');
            } else {
                history.push('/com');
            }
        };

        return (

            <div className="formWrap">

                <form onSubmit={handleSubmit(handlePagesOnSubmit)}>

                    <Field
                        name="email"
                        type="text"
                        component={floatingLabelField}
                        label={hasGovEmail
                            ? 'Enter government email ID' : 'Email'}
                        id="email"
                        onBlur={this.handleChecked}/>
                    <Field
                        name="password"
                        type="password"
                        component={floatingLabelField}
                        label="Create Password"
                        id="pswd"
                        onFocus={() => {
                            domMessagePwd.style.display = 'block';
                        }}
                        onBlur={() => {
                            domMessagePwd.style.display = 'none';
                            domMessagePwd.style.display = 'block';
                        }}/>
                    <div id="messagePwd">
                        <p id="length">
                            ✔ 8 Character minimum
                        </p>
                        <p id="capital">
                            ✔ At least one capital letter
                        </p>
                        <p id="special">
                            ✔ At least one special characters (!,*,$,@)
                        </p>
                    </div>
                    <FormGroup className="formRowWrap">
                        <ControlLabel className="label-styles">
                            Select only if applicable to your business
                        </ControlLabel>
                        <Checkbox
                            checked={isGovEmail}
                            className="checkbox-overrides"
                            onChange={this.handleChecked}>
                            I work for a government entity and I
                            have a government email
                        </Checkbox>
                    </FormGroup>
                    <FormGroup className="formRowWrap">
                        <Recaptcha
                            className="rca-styles"
                            sitekey="6LfKaWoUAAAAAJDt-nKlTsZ92TkprXJ2xqgZ-YND"
                            render="explicit"
                            verifyCallback={this.verifyCallback}
                            onloadCallback={this.callback}
                        />
                    </FormGroup>

                    <div className="form-group formRowWrap">
                        <Button
                            type="submit"
                            className="btnBlueStyle createAccBtn"
                            disabled={!recaptchaVerified}>
                        Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

SignupForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    emailId: PropTypes.string,
    actions: PropTypes.objectOf(PropTypes.func)
};


const SignUp = reduxForm({
    form: 'SignupForm',
    validate,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(SignupForm);

const selector = formValueSelector('SignupForm');
const mapStateToProps = state => ({
    emailId: selector(state, 'email'),
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign(LoginAction), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

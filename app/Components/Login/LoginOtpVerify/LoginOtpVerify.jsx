
import React from 'react';
import './LoginOtpVerify.scss';
import {
    Row, Col, ControlLabel,
} from 'react-bootstrap';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import {
    Field, reduxForm, formValueSelector,
} from 'redux-form';
import axios from 'axios';
import history from '../../../history';

export const validate = values => {
    const error = {};

    if (!values.comPhoneText1) {
        error.comPhoneText1 = 'Required';
    }
    if (!values.comPhoneText2) {
        error.comPhoneText1 = 'Required';
    }
    if (!values.comPhoneText3) {
        error.comPhoneText1 = 'Required';
    }
    if (!values.comPhoneText4) {
        error.comPhoneText1 = 'Required';
    }
    if (!values.comPhoneText5) {
        error.comPhoneText1 = 'Required';
    }
    if (!values.comPhoneText6) {
        error.comPhoneText1 = 'Required';
    }

    return error;
};

export const normalizeZip = value => {
    if (!value) {
        return value;
    }
    const onlyNums = value.replace(/[^\d]/g, '');

return onlyNums;
};

export const phoneChange = (length, event) => {
    const elemtName = event.target.name;
    const value = event.target.value.toString();
    const valueLength = value.length;
    if (valueLength >= length) {
        if (elemtName === 'comPhoneText1') {
            document.getElementsByName('comPhoneText2')[0].focus();
        } else if (elemtName === 'comPhoneText2') {
            document.getElementsByName('comPhoneText3')[0].focus();
        } else if (elemtName === 'comPhoneText3') {
            document.getElementsByName('comPhoneText4')[0].focus();
        } else if (elemtName === 'comPhoneText4') {
            document.getElementsByName('comPhoneText5')[0].focus();
        } else if (elemtName === 'comPhoneText5') {
            document.getElementsByName('comPhoneText6')[0].focus();
        }
    }
    if (valueLength === 0) {
        if (elemtName === 'comPhoneText6') {
            document.getElementsByName('comPhoneText5')[0].focus();
        } else if (elemtName === 'comPhoneText5') {
            document.getElementsByName('comPhoneText4')[0].focus();
        } else if (elemtName === 'comPhoneText4') {
            document.getElementsByName('comPhoneText3')[0].focus();
        } else if (elemtName === 'comPhoneText3') {
            document.getElementsByName('comPhoneText2')[0].focus();
        } else if (elemtName === 'comPhoneText2') {
            document.getElementsByName('comPhoneText1')[0].focus();
        }
    }
};

export const customPhoneField = ({
    maxLength, placeholder, input, type, meta: { touched, error },
}) => (
    <div className="form-group">
        <input
            {...input}
            maxLength={maxLength}
            placeholder={placeholder}
            type={type}
            className="form-control SqaureText new"
            onKeyUp={phoneChange.bind(this, maxLength)} />
        {touched && ((error && (<span className="errorPhnTxt">{error}</span>)))}
    </div>
);
/* eslint-disable react/prop-types */
export class LoginOtpVerify extends React.Component {
    constructor() {
        super();
        this.state = {
            otpNumber: '',
            otpError: false,
        };
    }

    componentDidMount() {
        axios.get('../../../../data.json')
        .then(res => {
            const otpNumber = res.data && res.data.otpNumber;
            this.setState({ otpNumber });
        });
    }

    handleChange = event => {
        const { emailId, password } = this.props;
        if (event.target.checked) {
            Cookies.set('LoginUser', { email: emailId, password });
        } else {
            Cookies.remove('LoginUser');
        }
        console.log('getCookie', Cookies.get('LoginUser'));
    };

    render() {
        const { handleSubmit, phone } = this.props;
        const { otpError } = this.state;

        const handleSubmitForm = values => {
            const { otpNumber } = this.state;
            const otp = parseInt(`${values.comPhoneText1}${values.comPhoneText2}${values.comPhoneText3}${values.comPhoneText4}${values.comPhoneText5}${values.comPhoneText6}`, 10);
            const myotpNumber = otpNumber;
            if (otp === myotpNumber) {
                this.setState({ otpError: false });
                history.push('./professionalHome');
            } else {
                this.setState({ otpError: true });
            }
        };

        return (
            <div className="formWrap secureVerifyTxt">
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <Row>
                        <Col sm={12} lg={12}>
                               Enter the confirmation code
                               that was sent to your phone at
                            <div>{phone}</div>
                        </Col >
                        <Col className="rememberDevice" sm={12} lg={12}>
                            <ControlLabel>
                                <input
                                    type="checkbox"
                                    onChange={this.handleChange}/>
                                        Remember this device (not recommended for public or shared devices).
                            </ControlLabel>
                        </Col >
                    </Row>

                    <Row>
                        <Col md={12} >
                            <ul className="phonenumberBox">
                                <li>
                                    <Field
                                        name="comPhoneText1"
                                        type="text"
                                        normalize={normalizeZip}
                                        style={{ width: '80px' }}
                                        maxLength="1"
                                        component={customPhoneField}/>
                                </li>
                                <li>
                                    <Field
                                        name="comPhoneText2"
                                        type="text"
                                        normalize={normalizeZip}
                                        maxLength="1"
                                        component={customPhoneField}/>
                                </li>
                                <li>
                                    <Field
                                        name="comPhoneText3"
                                        type="text"
                                        normalize={normalizeZip}
                                        maxLength="1"
                                        component={customPhoneField} />
                                </li>
                                <li>
                                    <Field
                                        name="comPhoneText4"
                                        type="text"
                                        normalize={normalizeZip}
                                        maxLength="1"
                                        component={customPhoneField} />
                                </li>
                                <li>
                                    <Field
                                        name="comPhoneText5"
                                        type="text"
                                        normalize={normalizeZip}
                                        maxLength="1"
                                        component={customPhoneField} />
                                </li>
                                <li>
                                    <Field
                                        name="comPhoneText6"
                                        type="text"
                                        normalize={normalizeZip}
                                        maxLength="1"
                                        component={customPhoneField} />
                                </li>
                            </ul>
                        </Col>
                    </Row>

                    <Row className="invalidOtp">
                        <div m={12} lg={12}>
                            {
                            otpError
                            ? 'Incorrect confirmation code,please try again.'
                            : ''
                            }
                        </div>
                    </Row>
                    <Row>
                        <Col className="otpFirst" sm={12} lg={12}>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btnSignIn"
                                >
                                    Confirm
                                </button>
                            </div>
                        </Col >
                        <Col sm={12} lg={12}>
                            If you did not receive a code, wait a few minutes and request a new one.
                        </Col >
                        <Col className="requestCode" sm={12} lg={12}>
                                  Request new code

                        </Col >
                    </Row>
                </form>
            </div>

        );
    }
}

const LoginOtpVerifyForm = reduxForm({
    form: 'login',
    validate,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(LoginOtpVerify);

const selector = formValueSelector('login');
const mapStateToProps = state => ({
    emailId: selector(state, 'email'),
    phone: selector(state, 'phone'),
});

export default connect(mapStateToProps)(LoginOtpVerifyForm);

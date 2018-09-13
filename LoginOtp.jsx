import React from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import './LoginOtp.scss';
import {
    Row, Col, ControlLabel,
} from 'react-bootstrap';


export const normalizePhone = value => {
    if (!value) {
        return value;
    }

    const onlyNums = value.replace(/[^\d]/g, '');
    if (onlyNums.length <= 3) {
        return onlyNums;
    }
    if (onlyNums.length <= 7) {
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    }

    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
        6,
        10,
    )}`;
};

/* eslint-disable react/prop-types */
export class LoginOtp extends React.Component {
    constructor() {
        super();
        this.state = {
            // recaptchaVerified: false,
            sendCode: 'phone',
            sendPhoneCode: 'textMessage',
        };
    }

    componentWillMount() {
        console.log(this.props.formValue);
    }

    onhandleClick = (type,phoneCode) => {
        this.setState({
            sendCode: type,
            sendPhoneCode: phoneCode,
        });
    }

    render() {
        const { handleSubmit } = this.props;
        const { sendCode,sendPhoneCode } = this.state;

        return (

            <div className="formWrap">
                <form onSubmit={handleSubmit}>
                    <div className="secureVerifyTxt">
                        <Row>
                            <Col className="otpFirst" sm={12} lg={12}>
                                To help us verify identity and protect your private information, a
                                confirmation code will be sent to your phone or email.
                            </Col >
                        </Row>
                        <Row>
                            <Col sm={12} lg={12}>
                                <div>Send the code:</div>

                            </Col>
                            <Col sm={12} lg={12}>
                                <div className="radio">
                                    <ControlLabel>
                                        <input
                                            type="radio"
                                            name="optradioParent"
                                            onChange={() => this.onhandleClick('phone')}
                                            checked={sendCode === 'phone'} />

                                        To my phone via text message or voice call
                                        <div className="sendcode">send code to :</div>
                                        <div>
                                            <Field
                                                name="phone"
                                                component="input"
                                                type="text"
                                                placeholder="Phone Number"
                                                normalize={normalizePhone}
                                            />

                                        </div>
                                        <div>send code via</div>
                                        <div className="radio">
                                            <ControlLabel>
                                                <input type="radio" name="optradio"
                                                    onChange={() => this.onhandleClick('phone','textMessage')}
                                                    checked={(sendCode === 'phone' && sendPhoneCode==='textMessage')} />
                                                Text message (message and data rates may apply)
                                            </ControlLabel>
                                        </div>
                                        <div className="radio">
                                            <ControlLabel>
                                                <input type="radio" name="optradio"
                                               checked={sendCode === 'phone'&& sendPhoneCode==='voiceCall'}
                                                    onChange={() => this.onhandleClick('phone','voiceCall')}
                                                />
                                                Voice call
                                            </ControlLabel>
                                        </div>
                                    </ControlLabel>
                                </div>
                                <div className="radio">
                                    <ControlLabel>
                                        <input type="radio" name="optradioParent" onChange={() => this.onhandleClick('email')} 
                                        checked={sendCode === 'email'} />
                                        To my email address at
{' '}
                                        {this.props.emailId}
                                    </ControlLabel>
                                </div>np
                            </Col>

                        </Row>
                    </div>

                    <Row>
                        <Col className="otpFirst" sm={12} lg={12}>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btnSignIn">
                                    Send confirmation Code
                                </button>
                            </div>
                        </Col >
                    </Row>
                </form>
            </div>

        );
    }
}
// export default reduxForm({
//     form: 'login',
//     destroyOnUnmount: false,
//     forceUnregisterOnUnmount: true,
// })(LoginOtp);

const LoginOtpPageForm = reduxForm({
    form: 'login',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(LoginOtp);

const selector = formValueSelector('login');
const mapStateToProps = state => ({
    emailId: selector(state, 'email'),
    password: selector(state, 'password'),
});

export default connect(mapStateToProps)(LoginOtpPageForm);
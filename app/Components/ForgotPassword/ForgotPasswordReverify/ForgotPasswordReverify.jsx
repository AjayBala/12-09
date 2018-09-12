import React from 'react';
import {
    ControlLabel, Button,
} from 'react-bootstrap';
import history from '../../../history';
import '../password.scss';

const ForgotPasswordReverify = () => (
    <div className="containInnerWrap">
        <div>
            <ControlLabel
                className="forgotPswdReverify_labelTxt">
                    Go check your email. If we find an account associated with this email we send a password reset link.
            </ControlLabel>
        </div>
        <div className="loginBoxWrap">
            <div className="loginBox">
                <div className="form-group formRowWrap">
                    <Button
                        type="button"
                        className="btnBlueStyle createAccBtn"
                        onClick={() => history.push('./email-template')}>
                         Send Another Reset Link
                    </Button>
                </div>

            </div>
        </div>
    </div>
);

export default ForgotPasswordReverify;

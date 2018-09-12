import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Button } from 'react-bootstrap';
// import history from '../../../history';
import './LoginPage.scss';
import floatingLabelField from '../../FloatingLabel/FloatingLabel';

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

    if (!values.password) {
        error.password = 'Required';
    } else if (values.password.length < 8) {
        error.password = 'Password should be greater than 8';
    } else if (values.password.length > 15) {
        error.password = 'Password should be lesser than 16';
    }

return error;
};

/* eslint-disable react/prop-types */
export const checkBoxField = ({
    placeholder, label, type, input,
}) => (
    <p>
        <input
            {...input}
            placeholder={placeholder}
            type={type}
            className="checkBoxStyle" />
        {label}
    </p>);

export class LoginPage extends React.Component {
    componentDidMount() {
        document.addEventListener('keydown', this.escFunction, false);
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

    escFunction(event) {
        if (event.keyCode === 32) {
            event.preventDefault();
        }
    }

    render() {
        const { handleSubmit } = this.props;
        const { pathname } = location;

    return (
        <div className="formWrap">
            <h1
                className={pathname && pathname === '/signup'
                ? 'title_h1 signinTitle deactive' : 'title_h1 signinTitle'}>
                Sign in to your Oprofessional Account
            </h1>
            <form onSubmit={handleSubmit}>
                <Field
                    name="email"
                    component={floatingLabelField}
                    label="Email"
                    placeholder="Email" />
                <Field
                    name="password"
                    type="password"
                    component={floatingLabelField}
                    label="Password"
                    placeholder="Password" />

                <div className="form-group secureVerifyTxt">
                    <p>
                        Secure your Oprofessional
                        account with two-step authentication
                    </p>
                    <Field
                        name="isAuthenticationRequired"
                        type="checkbox"
                        component={checkBoxField}
                        label=" Verify my account
                                    with two-step authentication"/>

                </div>

                <div className="form-group formRowWrap">
                    <Button
                        type="submit"
                        className="btnBlueStyle createAccBtn">
                            Sign In
                    </Button>
                </div>


            </form>
        </div>
    );
    }
}

export const LoginPageForm = reduxForm({
    form: 'login',
    validate,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(LoginPage);

const CookieUser = Cookies.get('LoginUser')
    ? JSON.parse(Cookies.get('LoginUser')) : {};
const mapStateToProps = state => ({
    stateValue: state,
    enableReinitialize: true,
    initialValues: {
        email: CookieUser.email || '',
        password: CookieUser.password || '',
    },
});
export default connect(mapStateToProps)(LoginPageForm);

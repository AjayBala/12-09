import React from 'react';
import './Login.scss';
import PropTypes from 'prop-types';
import LoginPage from './LoginPage/LoginPage';
import LoginOtp from './LoginOtp/LoginOtp';
import LoginOtpVerify from './LoginOtpVerify/LoginOtpVerify';
import history from '../../history';

const steps = [{ id: 0 }, { id: 1 }, { id: 2 }];
class Login extends React.Component {
    constructor() {
        super();
        this.state = ({ currentStep: steps[0] });
    }

  nextPage = () => {
    const { currentStep } = this.state;
    this.setState({ currentStep: steps[currentStep.id + 1] });
  }

  previousPage = () => {
    const { currentStep } = this.state;
    this.setState({ currentStep: steps[currentStep.id - 1] });
  }

  AuthenticationRequired= values => {
    // eslint-disable-next-line
    const isAuthenticationRequired = values.isAuthenticationRequired;
    if (isAuthenticationRequired) {
        return this.nextPage();
    }

    return history.push('./loginAuth');
  }

  render() {
      const { currentStep } = this.state;
      const { location } = this.props;
      let routingTo = '';
      if (location && location.query && location.query.routingTo) {
        routingTo = location.query.routingTo;
            location.query.routingTo = undefined;
      }

return (
    <div>
        {routingTo === 'redirectingToTwoStepAuth'
                ? (
                    <div>
                        <LoginOtp
                            previousPage={this.previousPage}
                            onSubmit={this.nextPage} />
                    </div>
                )
            : (
                <div>
                    {currentStep.id === 0
                && (
                    <LoginPage
                        onSubmit={this.AuthenticationRequired}
                    />
                )}
                    {currentStep.id === 1
                && (
                    <LoginOtp
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage} />
                )}
                    {currentStep.id === 2
                && (
                    <LoginOtpVerify
                        previousPage={this.previousPage}
                        onSubmit={this.nextPage} />
                )}
                </div>
        )}
    </div>
    );
  }
}

Login.propTypes = {
    location: PropTypes.object
};

export default Login;

import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../../../../assets/Images/homeheader.png';
import Backhomepage from '../../../../assets/Images/homefooter.png';
import './LoginAuth.scss';

const bgStyle = {
    width: '100%',
    float: 'left',
};


class LoginAuth extends React.Component {
    render() {
        return (
            <div>
                <img src={Background} alt="home background" style={bgStyle}/>
                <div className="redirectToTwoStepLink">
                    <Link to={{ pathname: '/Login', query: { routingTo: 'redirectingToTwoStepAuth' } }}> Verify your account using our two-step authentication process </Link>
                </div>
                <img src={Backhomepage} alt="home background" style={bgStyle}/>
            </div>
        );
    }
}

export default LoginAuth;

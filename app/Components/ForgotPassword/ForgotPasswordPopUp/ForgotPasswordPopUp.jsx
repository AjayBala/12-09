import React, { Fragment } from 'react';
import Background from '../../../../assets/Images/home.png';
import ForgotPopUp from '../../Model/SuccessPopup';
import ForgotPassword from './ForgotPassword';
import Login from '../../Login/Login';

const bgStyle = {
    width: '100%',
    float: 'left',
};

class ForgotPasswordPopUp extends React.Component {
    constructor() {
        super();
        this.state = ({ isModalAppear: true });
    }

    render() {
        const { isModalAppear } = this.state;
        const { pathName } = location;

        return (
            <Fragment>
                <img src={Background} alt="home background" style={bgStyle} id="bgImg"/>
                <div>
                    {isModalAppear && (
                        <ForgotPopUp
                            show={isModalAppear}
                            resetpassword={1}
                            bodycontent={pathName && pathName === '/signin' ? <Login /> : <ForgotPassword/>} />
                    )}
                </div>
            </Fragment>
        );
    }
}

export default ForgotPasswordPopUp;

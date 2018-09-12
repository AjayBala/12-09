
import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import LoginOtpPageForm, {
    LoginOtp, normalizePhone
} from './LoginOtp';

describe('Test suits for <LoginOtp />', () => {
    let component;
    let wrapperRedComp;
    const handleSubmit = sinon.spy();
    // const onhandleClick = sinon.spy();
    // const onSubmitCall = sinon.spy();
    const mockStore = configureStore([]);
    const store = mockStore({
        context: { deviceType: { isDesktop: false } },
    });
    beforeEach(() => {
        wrapperRedComp = shallow(<LoginOtp
            handleSubmit={handleSubmit}
        />);
        component = mount(
            <Provider store={store}>
                <LoginOtpPageForm
                    submitCase={handleSubmit} />
            </Provider>,
        );
    });
    afterEach(() => {
        component.unmount();
    });
    it('Check if the wrapper component exist', () => {
        expect(component).to.exist;
    });
    it('Should be check 10 digits number', () => {
        const val = '6756768687';
        const zipError1 = normalizePhone(val, '6756768687');
        expect(zipError1).to.equal('675-676-8687');
    });
    it('To invoke onhandleClick function', () => {
        // const instance = wrapperRedComp.instance();
        // console.log(instance, 'checkistance');
        wrapperRedComp.instance().onhandleClick();
    });
    it('Should be check 6 digits number', () => {
        const val = '';
        const zipError1 = normalizePhone(val, '');
        expect(zipError1).to.equal('');
});
it('Should be check 6 digits number', () => {
    const val = '672299';
    const zipError1 = normalizePhone(val, '672299');
    expect(zipError1).to.equal('672-299');
});
it('Should be check 2 digits number', () => {
    const val = '67';
    const zipError1 = normalizePhone(val, '67');
    expect(zipError1).to.equal('67');
});
});

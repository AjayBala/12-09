import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import LoginOtpVerifyForm, { LoginOtpVerify, normalizeZip, phoneChange, customPhoneField,
} from './LoginOtpVerify';

describe('Test suits for <LoginOtpVerify />', () => {
    let component;
    let wrapperRedComp;
    const handleSubmit = sinon.spy();
    // const handleSubmitForm = sinon.spy();
    // const onSubmitCall = sinon.spy();
    const mockStore = configureStore([]);
    const store = mockStore({
        context: { deviceType: { isDesktop: false } },
    });
    beforeEach(() => {
        wrapperRedComp = shallow(<LoginOtpVerify
            handleSubmit={() => {}}
            // handleSubmit={handleSubmit}
        />);
        component = mount(
            <Provider store={store}>
                <LoginOtpVerifyForm
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
    it('Should be check 5 digits number', () => {
        const val = '67567';
        const zipError1 = normalizeZip(val, '67567');
        expect(zipError1).to.equal('67567');
    });
    it('Empty case for zip', () => {
        const val = '';
        const zipError1 = normalizeZip(val, '');
        expect(zipError1).to.equal('');
    });

    it('On Custom phoneChange with out values', () => {
        let event = { target: { name: 'comPhoneText1', value: '' } };
        let aptError = phoneChange(3, event);
        event = { target: { name: 'comPhoneText2', value: '' } };
        aptError = phoneChange(3, event);
        event = { target: { name: 'comPhoneText3', value: '' } };
        aptError = phoneChange(4, event);
        expect(aptError).to.equal('');
    });
    it('On Custom phoneChange with out values', () => {
        const event = { target: { name: 'comPhoneText3', value: '' } };
        const aptError = phoneChange(4, event);
        expect(aptError).to.equal('');
    });
    it('On Custom phoneChange with values', () => {
        let event = { target: { name: 'comPhoneText1', value: '123' } };
        let aptError = phoneChange(3, event);
        event = { target: { name: 'comPhoneText2', value: '123' } };
        aptError = phoneChange(3, event);
        event = { target: { name: 'comPhoneText3', value: '1234' } };
        aptError = phoneChange(4, event);
        expect(aptError).to.equal('');
    });
    it('customPhoneField ', () => {
        const input = { name: 'comPhoneText1' };
        const label = 'phonenumber*';
        const meta = { touched: true, error: 'Required' };
        const type = 'text';
        const placeholder = 'phonenumber';
        const element = customPhoneField({
            placeholder, label, type, input, meta,
        });
        shallow(element);
    });
    it('To invoke handleChange function', () => {
        // const shallowWrapper = shallow(
        //     <LoginOtpVerifyForm />
        // );
        wrapperRedComp.instance().handleChange();
    });
    it('To invoke handleSubmitForm function', () => {
        // const shallowWrapper = shallow(
        //     <LoginOtpVerifyForm />
        // );
        wrapperRedComp.instance().handleSubmitForm();
    });
    it('To invoke handleSubmitForm function', () => {
        // const shallowWrapper = shallow(
        //     <LoginOtpVerifyForm />
        // );
        wrapperRedComp.instance().handleSubmitForm();
    });

        // it.only('Submit the form', () => {
    //     wrapperRedComp.find('form').at(1).props().onSubmit();
    // });
    it('Govt page API called and UI should render', () => {
        const instance = wrapperRedComp.instance();
                instance.onSubmit();
    });
});

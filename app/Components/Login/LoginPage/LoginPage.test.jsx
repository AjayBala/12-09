import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import LoginPageForm, {
    validate, LoginPage
} from './LoginPage';

describe('Test suits for <LoginPage />', () => {
    let component;
    let wrapperRedComp;
    const handleSubmit = sinon.spy();
    const onSubmitCall = sinon.spy();
    beforeEach(() => {
        const mockStore = configureStore([]);
        const store = mockStore({
            context: { deviceType: { isDesktop: false } },
        });
        wrapperRedComp = shallow(<LoginPage
            handleSubmit={handleSubmit}
            onSubmitCall={onSubmitCall}
        />);
        component = mount(
            <Provider store={store}>
                <LoginPageForm
                    onSubmitCall={onSubmitCall}/>
            </Provider>,
        );
    });
    afterEach(() => {
        component.unmount();
    });
    it('Check if the werapper component exist', () => {
        expect(wrapperRedComp).to.exist;
    });
    it('inValid Email', () => {
        const aptError = validate({ email: '' });
        expect(aptError.email).to.equal('Required');
    });

    it('inValid Password', () => {
        const aptError = validate({ password: '' });
        expect(aptError.password).to.equal('Required');
    });

    it('inValid Email', () => {
        const aptError = validate({ email: 'Overstock@' });
        expect(aptError.email).to.equal('Please Enter a Valid Email');
    });

    it('Valid Email', () => {
        const aptError = validate({ email: 'Overstock@gmail.com' });
        expect(aptError.email).to.equal(undefined);
    });

    it('inValid password', () => {
        const aptError = validate({ password: 'Over' });
        expect(aptError.password).to.equal('Password should be greater than 8');
    });
    it('inValid password', () => {
        const aptError = validate({ password: 'OverkafugjkfgakjfbkfW' });
        expect(aptError.password).to.equal('Password should be lesser than 16');
    });

    it('Valid password', () => {
        const aptError = validate({ password: 'Overstock18' });
        expect(aptError.password).to.equal(undefined);
    });
    it('handleChange should be invoked', () => {
        wrapperRedComp.instance().handleChange({});
    });
    it('should render the component items properly', () => {
        const wrapper = shallow(<LoginPage />);
        expect(wrapper.find('.formWrap')).to.have.lengthOf(1);
    });
    it('should render the component elements properly', () => {
        component = shallow(<LoginPage handleSubmit={() => {}} />);
        expect(component.contains('formWrap')).to.exist;
    });
       });

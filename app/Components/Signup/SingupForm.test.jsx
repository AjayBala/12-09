import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import SignupFormConnected, {
    validate, SignupForm,
} from './SignupForm';
import floatingLabelField from '../FloatingLabel/FloatingLabel';
// import history from '../../history';

describe('Test suits for <signupform />', () => {
    let component;
    let wrapperRedComp;
    const handleSubmit = sinon.spy();
    const handleSubmitMock = () => ({ email: 'test@test.com', password: 'password@123' });
    const onSubmitCall = sinon.spy();

    const verifyCallback = sinon.spy();
    const checkDomain = sinon.spy();
    const handleChecked = sinon.spy();
    const handlePasswrdChange = sinon.spy();
    // const historySpy = sinon.spy(history, 'push');
    const defaultProps = {
        // preferences: preference,
        // newCaseInfo: { updateStatus: { type: 'Success' } },
        // openAddCaseNote: () => { },
        // getSourceText,
        // getDestinationText,
        // caseDetailsData: _clone(data),
        actions:
        {
            verifyCallback, checkDomain, handleChecked, handlePasswrdChange,
        },
    };

    const shallowWrapper = shallow(
        <SignupForm handleSubmit={() => {}} {...defaultProps} />,
    );
    const mockStore = configureStore([]);
    const store = mockStore({
        context: { deviceType: { isDesktop: false } },
    });
    // const verifyCallback = sinon.spy();
    beforeEach(() => {
        wrapperRedComp = shallow(<SignupForm
            handleSubmit={handleSubmit}
            submitCase={onSubmitCall}
            // verifyCallback={verifyCallback}
            // handleChecked={handleChecked}
            // handlePasswrdChange={handlePasswrdChange}
        />);
        component = mount(
            <Provider store={store}>
                <SignupFormConnected
                    handleSubmit={handleSubmitMock}
                    submitCase={onSubmitCall} />
            </Provider>,
        );
        // todo temporary hack ajay - referencing dom directly is not a good approach use setstate to dynamically add classes instead of this approach
        ['length', 'special', 'capital']
            .forEach(id => {
                const p = global.document.createElement('p');
                p.id = id;
                global.document.body.appendChild(p);
            });
    });
    afterEach(() => {
        component.unmount();
    });
    it('Check if the wrapper component exist', () => {
        expect(component).to.exist;
    });
    it('Check if the werapper component exist', () => {
        expect(wrapperRedComp).to.exist;
    });

    it('renders an error message for the input', () => {
        const input = { name: 'email' };
        const label = 'Email';
        const meta = { touched: true, error: 'Required' };
        const type = 'email';
        const element = floatingLabelField({
            label, type, input, meta,
        });
        mount(element);
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
    it('inValid password-test', () => {
        const aptError = validate({ password: 'overstock!' });
        expect(aptError.password).to.equal('Need upper case');
    });
    it('inValid password-test', () => {
        const aptError = validate({ password: 'Overstock' });
        expect(aptError.password).to.equal('Need Atleast one special Character');
    });
    it('inValid password-test', () => {
        const aptError = validate({ password: 'Over!' });
        expect(aptError.password).to.equal('Password should be greater than 8');
    });
    it('handleChecked should be invoked', () => {
        const change = sinon.spy();
        shallowWrapper.setProps({ change, emailId: 'test@test.com' });
        shallowWrapper.instance().handleChecked({ target: { checked: true } });
        expect(change.calledOnce).to.be.true;
    });
    it('should navigate to commercial domain', () => {
        const formWrapper = component.find('form').first();
        formWrapper.simulate('submit');
    });
    it('should navigate to government domain', () => {
        const formWrapper = component.find('form').first();
        formWrapper.simulate('submit');
    });
    it('funtion 1 should be invoked', () => {
        shallowWrapper.instance().verifyCallback();
    });
    it('messagePwd has display block', () => {
        expect(shallowWrapper.find('#messagePwd').length).to.equal(1);
        console.log(shallowWrapper.find('#messagePwd').length);
    });
});

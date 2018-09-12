import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Login from './Login';

describe('Test suits for <Login />', () => {
    const shallowWrapper = shallow(<Login />);

    it('Check if the wrapper component exist', () => {
        expect(shallowWrapper).to.exist;
    });

    it('Com page API called and UI should render', () => {
        const instance = shallowWrapper.instance();
        instance.nextPage();
        instance.previousPage();
        instance.onSubmit();
        // instance.closeModel();
        // instance.businessTypeChange();
    });

    it('Com page after render', () => {
        const instance = shallowWrapper.instance();
        instance.nextPage();
        instance.nextPage();
        shallowWrapper.setState({ currentStep: 2 });
    });
});

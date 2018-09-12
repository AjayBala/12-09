import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import LoginAuth from './LoginAuth';

describe('Test suits for <LoginAuth />', () => {
    const shallowWrapper = shallow(<LoginAuth />);

    it('Check if the werapper component exist', () => {
        expect(shallowWrapper).to.exist;
});
});

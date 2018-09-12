import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Password from './password';

describe('Test suits for <Password />', () => {
    const shallowWrapper = shallow(<Password />);

    it('Check if the werapper component exist', () => {
        expect(shallowWrapper).to.exist;
    });

    it('Password page API called and UI should render', () => {
        const instance = shallowWrapper.instance();
        instance.nextPage();
        instance.previousPage();
        instance.onSubmit();
        instance.closeModel();
    });
});

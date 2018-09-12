import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import professionalHome from './professionalHome';

describe('Test suits for <professionalHome />', () => {
    const shallowWrapper = shallow(<professionalHome />);

    it('Check if the werapper component exist', () => {
        expect(shallowWrapper).to.exist;
    });

    it('clicking on close Model', () => {
        shallowWrapper.instance().closeModel();
    });

    it('clicking on close Model', () => {
        shallowWrapper.instance().closeModel();
    });
});

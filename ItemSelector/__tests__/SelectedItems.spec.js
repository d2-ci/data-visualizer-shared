import React from 'react';
import { shallow } from 'enzyme';
import { SelectedItems } from '../SelectedItems';

describe('The SelectedItems component ', function () {
    var props = void 0;
    var shallowSelectedItems = void 0;

    var selectedContainer = function selectedContainer() {
        if (!shallowSelectedItems) {
            shallowSelectedItems = shallow(React.createElement(SelectedItems, props));
        }
        return shallowSelectedItems;
    };

    beforeEach(function () {
        props = {
            items: [],
            onDeselect: jest.fn(),
            onReorder: jest.fn()
        };
        shallowSelectedItems = undefined;
    });

    it('renders a div ', function () {
        expect(selectedContainer().find('div').first().length).toEqual(1);
    });

    it('renders a div containing everything else', function () {
        var wrappingDiv = selectedContainer().find('div').first();
        expect(wrappingDiv.children()).toEqual(selectedContainer().children());
    });
});
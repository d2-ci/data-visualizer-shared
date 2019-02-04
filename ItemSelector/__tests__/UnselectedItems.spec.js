import React from 'react';
import { shallow } from 'enzyme';
import { UnselectedItems } from '../UnselectedItems';

describe('The SelectedContainer component ', function () {
    var props = void 0;
    var shallowItems = void 0;
    var unselectedItems = function unselectedItems() {
        if (!shallowItems) {
            shallowItems = shallow(React.createElement(UnselectedItems, props));
        }
        return shallowItems;
    };

    beforeEach(function () {
        props = {
            items: [],
            filterText: '',
            onSelect: jest.fn(),
            requestMoreItems: jest.fn()
        };
        shallowItems = undefined;
    });

    it('renders a div ', function () {
        expect(unselectedItems().find('div').first().length).toEqual(1);
    });

    it('renders a div containing everything else', function () {
        var wrappingDiv = unselectedItems().find('div').first();
        expect(wrappingDiv.children()).toEqual(unselectedItems().children());
    });
});
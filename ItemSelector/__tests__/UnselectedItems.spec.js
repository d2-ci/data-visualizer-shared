import React from 'react';
import { shallow } from 'enzyme';
import { UnselectedItems } from '../UnselectedItems';

describe('UnselectedItems component ', function () {
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

    it('matches the snapshot when list is empty', function () {
        expect(unselectedItems()).toMatchSnapshot();
    });

    it('matches the snapshot when list has items', function () {
        props.items = [{
            id: 'rb',
            name: 'rainbow'
        }, { id: 'rr', name: 'rarity' }];
        expect(unselectedItems()).toMatchSnapshot();
    });
});
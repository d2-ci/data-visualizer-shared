import React from 'react';
import { shallow } from 'enzyme';
import { UnselectedItems } from '../UnselectedItems';

describe('UnselectedItems component', function () {
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

    describe('list with items', function () {
        beforeEach(function () {
            props.items = [{
                id: 'rb',
                name: 'rainbow'
            }, { id: 'rr', name: 'rarity' }];
        });

        it('matches the snapshot when list has items', function () {
            expect(unselectedItems()).toMatchSnapshot();
        });

        it('triggers onSelect all when "select all" button clicked', function () {
            unselectedItems().find('SelectButton').simulate('click');

            expect(props.onSelect).toHaveBeenCalled();
            expect(props.onSelect).toHaveBeenCalledWith(['rb', 'rr']);
        });

        it('triggers onSelect when item double-clicked', function () {
            unselectedItems().find('li').first().simulate('doubleClick');

            expect(props.onSelect).toHaveBeenCalled();
            expect(props.onSelect).toHaveBeenCalledWith(['rb']);
        });

        it('triggers onSelect when "assign" button clicked', function () {
            var list = unselectedItems();
            list.find('Item').first().simulate('click', false, false, 0, 'rb');

            list.find('ArrowButton').first().simulate('click');

            expect(props.onSelect).toHaveBeenCalled();
            expect(props.onSelect).toHaveBeenCalledWith(['rb']);
        });

        it('renders only items matching the filter', function () {
            props.filterText = 'b';
            var items = unselectedItems().find('Item');

            expect(items.length).toEqual(1);
            expect(items.dive().text()).toEqual(expect.stringContaining('rainbow'));
        });
    });
});
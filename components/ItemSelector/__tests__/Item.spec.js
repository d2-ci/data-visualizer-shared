import React from 'react';
import { shallow } from 'enzyme';
import Item from '../Item';
import RemoveDimensionButton from '../buttons/RemoveDimensionButton';
import ItemIcon from '../ItemIcon';
import { colors } from '../../../modules/colors';

describe('The Item component ', function () {
    var props = void 0;
    var shallowItem = void 0;

    var item = function item() {
        if (!shallowItem) {
            shallowItem = shallow(React.createElement(Item, props));
        }
        return shallowItem;
    };

    beforeEach(function () {
        props = {
            id: 'testID',
            index: 0,
            name: 'displayTestName',
            highlighted: false,
            onClick: jest.fn()
        };
        shallowItem = undefined;
    });

    it('renders a div containing everything else', function () {
        var wrappingDiv = item().find('div').first();

        expect(item().find('div').first()).toHaveLength(1);
        expect(wrappingDiv.children()).toEqual(item().children());
    });

    it('renders <UnselectedIcon /> when prop "selected" is true ', function () {
        var icon = item().find('Icon').dive().find(ItemIcon);

        expect(icon.prop('backgroundColor')).toEqual(colors.grey);
    });

    it('renders a <HighlightedIcon /> when props highlighted and selected are true', function () {
        props.highlighted = true;
        props.selected = true;

        var icon = item().find('Icon').dive().find(ItemIcon);

        expect(icon.prop('backgroundColor')).toEqual(colors.white);
    });

    it('renders <SelectedIcon /> when className is equal to "selected" ', function () {
        props.selected = true;

        var icon = item().find('Icon').dive().find(ItemIcon);

        expect(icon.prop('backgroundColor')).toEqual(colors.accentSecondary);
    });

    it('should not render a <RemoveDimensionButton /> for unselected item ', function () {
        var removeButton = item().find(RemoveDimensionButton);

        expect(removeButton.length).toEqual(0);
    });

    it('renders <RemoveDimensionButton /> for selected item ', function () {
        props.selected = true;

        var removeButton = item().find(RemoveDimensionButton);

        expect(removeButton.length).toEqual(1);
    });

    describe('onClick', function () {
        it('fires onClick property', function () {
            item().props().onClick({ preventDefault: function preventDefault() {
                    return undefined;
                } });

            expect(props.onClick).toBeCalledTimes(1);
        });

        it('fires onClick with correct arguments when metaKey pressed', function () {
            item().props().onClick({
                preventDefault: function preventDefault() {
                    return undefined;
                },
                metaKey: true,
                ctrlKey: false,
                shiftKey: false
            });

            expect(props.onClick).toBeCalledTimes(1);
            expect(props.onClick).toBeCalledWith(true, false, 0, 'testID');
        });

        it('fires onClick with correct arguments when ctrlKey pressed', function () {
            item().props().onClick({
                preventDefault: function preventDefault() {
                    return undefined;
                },
                metaKey: false,
                ctrlKey: true,
                shiftKey: false
            });

            expect(props.onClick).toBeCalledTimes(1);
            expect(props.onClick).toBeCalledWith(true, false, 0, 'testID');
        });

        it('fires onClick with correct arguments when shiftKey pressed', function () {
            item().props().onClick({
                preventDefault: function preventDefault() {
                    return undefined;
                },
                metaKey: false,
                ctrlKey: false,
                shiftKey: true
            });

            expect(props.onClick).toBeCalledTimes(1);
            expect(props.onClick).toBeCalledWith(false, true, 0, 'testID');
        });
    });
});
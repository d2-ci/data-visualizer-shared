import React from 'react';
import PropTypes from 'prop-types';
import RemoveDimensionButton from './buttons/RemoveDimensionButton';
import ItemIcon from './ItemIcon';
import { colors } from '../colors';
import { styles } from './styles/Item.style';

var Icon = function Icon(_ref) {
    var selected = _ref.selected,
        highlighted = _ref.highlighted;
    var grey = colors.grey,
        white = colors.white,
        accentSecondary = colors.accentSecondary;

    var bgColor = !selected ? grey : highlighted ? white : accentSecondary;

    return React.createElement(ItemIcon, { backgroundColor: bgColor });
};

var onClickWrapper = function onClickWrapper(id, index, onItemClick) {
    return function (event) {
        return onItemClick(event.metaKey || event.ctrlKey, event.shiftKey, index, id);
    };
};

export var Item = function Item(_ref2) {
    var selected = _ref2.selected,
        highlighted = _ref2.highlighted,
        id = _ref2.id,
        index = _ref2.index,
        onRemoveItem = _ref2.onRemoveItem,
        onItemClick = _ref2.onItemClick,
        name = _ref2.name,
        classNames = _ref2.classNames;

    var selectedState = selected ? 'selected' : 'unselected';
    var divClassName = [selectedState + '-list-item'].concat(classNames).join(' ');

    return React.createElement(
        'div',
        {
            'data-test': 'dimension-item-' + id,
            style: highlighted ? styles.highlightedItem : {},
            className: divClassName,
            onClick: onClickWrapper(id, index, onItemClick)
        },
        React.createElement(Icon, { selected: selected, highlighted: highlighted }),
        React.createElement(
            'span',
            {
                style: highlighted ? styles.highlightedText : {},
                className: selectedState + '-item-label'
            },
            name
        ),
        selected && React.createElement(RemoveDimensionButton, {
            highlighted: highlighted,
            onClick: function onClick() {
                return onRemoveItem(id);
            }
        })
    );
};

Item.defualtProps = {
    onRemoveItem: function onRemoveItem() {
        return null;
    },
    onItemClick: function onItemClick() {
        return null;
    }
};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    highlighted: PropTypes.bool.isRequired,
    onItemClick: PropTypes.func,
    onRemoveItem: PropTypes.func,
    selected: PropTypes.bool
};

export default Item;
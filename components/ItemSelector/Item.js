import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../modules/colors';
import RemoveDimensionButton from './buttons/RemoveDimensionButton';
import ItemIcon from './ItemIcon';
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

var onClickWrapper = function onClickWrapper(id, index, onClick) {
    return function (event) {
        return onClick(event.metaKey || event.ctrlKey, event.shiftKey, index, id);
    };
};

export var Item = function Item(_ref2) {
    var selected = _ref2.selected,
        highlighted = _ref2.highlighted,
        id = _ref2.id,
        index = _ref2.index,
        onRemoveItem = _ref2.onRemoveItem,
        onClick = _ref2.onClick,
        name = _ref2.name,
        isGhost = _ref2.isGhost;

    var selectedState = selected ? 'selected' : 'unselected';
    var divClassName = [selectedState + '-list-item'].concat(isGhost ? 'ghost' : '').join(' ');

    return React.createElement(
        'div',
        {
            'data-test': 'dimension-item-' + id,
            style: highlighted ? styles.highlightedItem : {},
            className: divClassName,
            onClick: onClickWrapper(id, index, onClick)
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
    onClick: function onClick() {
        return null;
    }
};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    highlighted: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    onRemoveItem: PropTypes.func,
    selected: PropTypes.bool,
    isGhost: PropTypes.bool
};

export default Item;
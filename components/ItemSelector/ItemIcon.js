import React from 'react';

var ItemIcon = function ItemIcon(_ref) {
    var backgroundColor = _ref.backgroundColor;
    return React.createElement('div', {
        style: {
            backgroundColor: backgroundColor,
            minHeight: 6,
            minWidth: 6,
            margin: '0px 5px'
        }
    });
};

export default ItemIcon;
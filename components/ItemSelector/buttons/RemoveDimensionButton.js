import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { styles } from '../styles/buttons.style';

export var RemoveDimensionButton = function RemoveDimensionButton(_ref) {
    var highlighted = _ref.highlighted,
        _onClick = _ref.onClick;
    return React.createElement(
        IconButton,
        {
            style: styles.deleteButton,
            disableRipple: true,
            onClick: function onClick(e) {
                e.stopPropagation();
                _onClick();
            }
        },
        React.createElement(Close, { style: highlighted ? styles.highlightedClose : styles.close })
    );
};

RemoveDimensionButton.propTypes = {
    highlighted: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default RemoveDimensionButton;
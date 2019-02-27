import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { styles } from '../styles/buttons.style';

export var ArrowButton = function ArrowButton(_ref) {
    var className = _ref.className,
        onClick = _ref.onClick,
        iconType = _ref.iconType;
    return React.createElement(
        'div',
        { className: className },
        React.createElement(
            IconButton,
            {
                variant: 'contained',
                style: styles.arrowButton,
                onClick: onClick
            },
            iconType === 'arrowForward' ? React.createElement(ArrowForward, { style: styles.arrowIcon }) : React.createElement(ArrowBack, { style: styles.arrowIcon })
        )
    );
};

export default ArrowButton;
import React from 'react';
import Button from '@material-ui/core/Button';
import { styles } from '../styles/buttons.style';

export var SelectButton = function SelectButton(_ref) {
    var style = _ref.style,
        onClick = _ref.onClick,
        label = _ref.label;
    return React.createElement(
        Button,
        { style: style, onClick: onClick },
        React.createElement(
            'span',
            { style: styles.buttonText },
            label
        )
    );
};
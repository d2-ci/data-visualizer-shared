var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import UnselectedItems from './UnselectedItems';
import SelectedItems from './SelectedItems';

import './ItemSelector.css';

var style = {
    container: {
        marginRight: 55,
        display: 'flex',
        flexDirection: 'column',
        width: 420,
        height: 534,
        border: '1px solid #e0e0e0'
    }
};

var ItemSelector = function (_Component) {
    _inherits(ItemSelector, _Component);

    function ItemSelector() {
        _classCallCheck(this, ItemSelector);

        return _possibleConstructorReturn(this, (ItemSelector.__proto__ || Object.getPrototypeOf(ItemSelector)).apply(this, arguments));
    }

    _createClass(ItemSelector, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                unselected = _props.unselected,
                selected = _props.selected,
                itemClassName = _props.itemClassName,
                filterZone = _props.children;


            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    'div',
                    { style: style.container },
                    filterZone,
                    React.createElement(UnselectedItems, _extends({
                        style: style.unselectedItems,
                        className: itemClassName
                    }, unselected))
                ),
                React.createElement(SelectedItems, _extends({ className: itemClassName }, selected))
            );
        }
    }]);

    return ItemSelector;
}(Component);

ItemSelector.defaultProps = {
    unselected: {
        filterText: ''
    }
};

ItemSelector.propTypes = {
    unselected: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })).isRequired,
        onSelect: PropTypes.func.isRequired,
        filterText: PropTypes.string,
        requestMoreItems: PropTypes.func
    }),
    selected: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })).isRequired,
        dialogId: PropTypes.string,
        onDeselect: PropTypes.func.isRequired,
        onReorder: PropTypes.func.isRequired
    }),
    itemClassName: PropTypes.string
};

export default ItemSelector;
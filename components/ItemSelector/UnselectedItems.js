function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import throttle from 'lodash-es/throttle';
import Item from './Item';
import { ArrowButton as AssignButton } from './buttons/ArrowButton';
import { SelectButton as SelectAllButton } from './buttons/SelectButton';
import { toggler } from './modules/toggler';
import { styles } from './styles/UnselectedItems.style';

export var UnselectedItems = function (_Component) {
    _inherits(UnselectedItems, _Component);

    function UnselectedItems(props) {
        _classCallCheck(this, UnselectedItems);

        var _this = _possibleConstructorReturn(this, (UnselectedItems.__proto__ || Object.getPrototypeOf(UnselectedItems)).call(this, props));

        _this.state = { highlighted: [], lastClickedIndex: 0 };

        _this.onSelectClick = function () {
            _this.props.onSelect(_this.state.highlighted);
            _this.setState({ highlighted: [] });
        };

        _this.onSelectAllClick = function () {
            _this.props.onSelect(_this.props.items.map(function (i) {
                return i.id;
            }));
            _this.setState({ highlighted: [] });
        };

        _this.onDoubleClickItem = function (id) {
            var highlighted = _this.state.highlighted.filter(function (dataDimId) {
                return dataDimId !== id;
            });

            _this.setState({ highlighted: highlighted });
            _this.props.onSelect([id]);
        };

        _this.filterTextContains = function (displayName) {
            return displayName.toLowerCase().includes(_this.props.filterText.toLowerCase());
        };

        _this.filterItems = function (item, index) {
            return _this.filterTextContains(item.name) ? _this.renderListItem(item, index) : null;
        };

        _this.toggleHighlight = function (isCtrlPressed, isShiftPressed, index, id) {
            var newState = toggler(id, isCtrlPressed, isShiftPressed, index, _this.state.lastClickedIndex, _this.state.highlighted, _this.props.items.map(function (item) {
                return item.id;
            }));

            _this.setState({
                highlighted: newState.ids,
                lastClickedIndex: newState.lastClickedIndex
            });
        };

        _this.renderListItem = function (dataDim, index) {
            return React.createElement(
                'li',
                {
                    className: 'item-selector-item',
                    key: dataDim.id,
                    onDoubleClick: function onDoubleClick() {
                        return _this.onDoubleClickItem(dataDim.id);
                    }
                },
                React.createElement(Item, {
                    id: dataDim.id,
                    index: index,
                    name: dataDim.name,
                    highlighted: !!_this.state.highlighted.includes(dataDim.id),
                    onClick: _this.toggleHighlight
                })
            );
        };

        _this.requestMoreItems = throttle(function () {
            var node = _this.scrolElRef.current;

            if (node) {
                var bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
                if (bottom) {
                    _this.props.requestMoreItems();
                }
            }
        }, 1000);

        _this.render = function () {
            var listItems = _this.props.items.map(function (item, index) {
                return _this.props.filterText.length ? _this.filterItems(item, index) : _this.renderListItem(item, index);
            });

            return React.createElement(
                Fragment,
                null,
                React.createElement(
                    'div',
                    {
                        ref: _this.scrolElRef,
                        onScroll: _this.requestMoreItems,
                        style: styles.unselectedItems
                    },
                    React.createElement(
                        'ul',
                        { className: 'item-selector-list' },
                        listItems
                    )
                ),
                React.createElement(SelectAllButton, {
                    style: styles.selectButton,
                    onClick: _this.onSelectAllClick,
                    label: i18n.t('Select All')
                }),
                React.createElement(AssignButton, {
                    className: 'item-selector-arrow-forward-button',
                    onClick: _this.onSelectClick,
                    iconType: 'arrowForward'
                })
            );
        };

        _this.scrolElRef = React.createRef();
        return _this;
    }

    return UnselectedItems;
}(Component);

UnselectedItems.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired,
    onSelect: PropTypes.func.isRequired,
    filterText: PropTypes.string,
    requestMoreItems: PropTypes.func
};

UnselectedItems.defaultProps = {
    requestMoreItems: function requestMoreItems() {
        return null;
    }
};

export default UnselectedItems;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import sortBy from 'lodash-es/sortBy';

import Item from './Item';
import { ArrowButton as UnAssignButton } from './buttons/ArrowButton';
import { SelectButton as DeselectAllButton } from './buttons/SelectButton';

import { toggler } from './modules/toggler';

import { styles } from './styles/SelectedItems.style';

var Subtitle = function Subtitle() {
    return React.createElement(
        'div',
        { style: styles.subTitleContainer },
        React.createElement(
            'span',
            { style: styles.subTitleText },
            i18n.t('Selected Data')
        )
    );
};

var ItemsList = function ItemsList(_ref) {
    var styles = _ref.styles,
        innerRef = _ref.innerRef,
        children = _ref.children;
    return React.createElement(
        'ul',
        { style: styles.list, ref: innerRef },
        children
    );
};

export var SelectedItems = function (_Component) {
    _inherits(SelectedItems, _Component);

    function SelectedItems() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, SelectedItems);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = SelectedItems.__proto__ || Object.getPrototypeOf(SelectedItems)).call.apply(_ref2, [this].concat(args))), _this), _this.state = { highlighted: [], lastClickedIndex: 0, draggingId: null }, _this.onDeselectClick = function () {
            _this.props.onDeselect(_this.state.highlighted);
            _this.setState({ highlighted: [] });
        }, _this.onRemoveSelected = function (id) {
            var highlighted = _this.state.highlighted.filter(function (dataDimId) {
                return dataDimId !== id;
            });

            _this.props.onDeselect([id]);
            _this.setState({ highlighted: highlighted });
        }, _this.onDeselectAllClick = function () {
            _this.props.onDeselect(_this.props.items.map(function (item) {
                return item.id;
            }));
            _this.setState({ highlighted: [] });
        }, _this.toggleHighlight = function (isCtrlPressed, isShiftPressed, index, id) {
            var newState = toggler(id, isCtrlPressed, isShiftPressed, index, _this.state.lastClickedIndex, _this.state.highlighted, _this.props.items.map(function (item) {
                return item.id;
            }));

            _this.setState({
                highlighted: newState.ids,
                lastClickedIndex: newState.lastClickedIndex
            });
        }, _this.isMultiDrag = function (draggableId) {
            return _this.state.highlighted.includes(draggableId) && _this.state.highlighted.length > 1;
        }, _this.onDragStart = function (start) {
            var id = start.draggableId;
            var selected = _this.state.highlighted.find(function (itemId) {
                return itemId === id;
            });

            // if dragging an item that is not highlighted, unhighlight all items
            if (!selected) {
                _this.setState({ highlighted: [] });
            }

            _this.setState({ draggingId: start.draggableId });
        }, _this.onDragEnd = function (result) {
            var destination = result.destination,
                source = result.source,
                draggableId = result.draggableId;


            _this.setState({ draggingId: null });

            if (destination === null) {
                return;
            }

            if (destination.draggableId === source.draggableId && destination.index === source.index) {
                return;
            }

            var newList = Array.from(_this.props.items.map(function (item) {
                return item.id;
            }));

            if (_this.isMultiDrag(draggableId)) {
                var indexedItemsToMove = sortBy(_this.state.highlighted.map(function (item) {
                    return {
                        item: item,
                        idx: _this.props.items.map(function (item) {
                            return item.id;
                        }).indexOf(item)
                    };
                }), 'idx');

                var destinationIndex = destination.index;

                if (destinationIndex < _this.props.items.length - 1 && destinationIndex > 1) {
                    indexedItemsToMove.forEach(function (indexed) {
                        if (indexed.idx < destinationIndex) {
                            --destinationIndex;
                        }
                    });
                }

                indexedItemsToMove.forEach(function (indexed) {
                    var idx = newList.indexOf(indexed.item);
                    newList.splice(idx, 1);
                });

                indexedItemsToMove.forEach(function (indexed, i) {
                    newList.splice(destinationIndex + i, 0, indexed.item);
                });
            } else {
                newList.splice(source.index, 1);
                newList.splice(destination.index, 0, draggableId);
            }

            _this.props.onReorder(newList);
        }, _this.renderListItem = function (_ref3, index) {
            var id = _ref3.id,
                name = _ref3.name,
                clone = _ref3.clone;

            if (!clone) {
                return React.createElement(
                    Draggable,
                    { draggableId: id, index: index, key: id },
                    function (provided, snapshot) {
                        var isItemBeingDragged = snapshot.isDragging && _this.state.highlighted.length > 1 && _this.state.highlighted.includes(_this.state.draggingId);

                        var isGhosting = _this.state.highlighted.includes(id) && Boolean(_this.state.draggingId) && _this.state.draggingId !== id;

                        var itemText = isItemBeingDragged ? _this.state.highlighted.length + ' items' : name;

                        var ghostClassname = isGhosting ? 'ghost' : '';
                        var draggingItemClassname = isItemBeingDragged ? 'dragging-item' : '';

                        var classNames = [ghostClassname, draggingItemClassname].join(' ');

                        return React.createElement(
                            'li',
                            _extends({
                                className: 'item-selector-item',
                                id: id,
                                onDoubleClick: function onDoubleClick() {
                                    return _this.onRemoveSelected(id);
                                }
                            }, provided.draggableProps, provided.dragHandleProps, {
                                ref: provided.innerRef
                            }),
                            React.createElement(Item, {
                                id: id,
                                index: index,
                                name: itemText,
                                highlighted: !!_this.state.highlighted.includes(id),
                                onItemClick: _this.toggleHighlight,
                                onRemoveItem: _this.onRemoveSelected,
                                selected: true,
                                classNames: classNames
                            })
                        );
                    }
                );
            } else {
                var cloneId = id + '-clone';
                return React.createElement(
                    Draggable,
                    { draggableId: cloneId, index: index, key: cloneId },
                    function (provided) {
                        return React.createElement(
                            'li',
                            _extends({
                                className: 'item-selector-item',
                                id: cloneId
                            }, provided.draggableProps, provided.dragHandleProps, {
                                ref: provided.innerRef
                            }),
                            React.createElement(Item, {
                                id: cloneId,
                                index: 9999,
                                name: name,
                                highlighted: !!_this.state.highlighted.includes(id),
                                selected: true,
                                classNames: 'ghost'
                            })
                        );
                    }
                );
            }
        }, _this.render = function () {
            var itemList = function itemList() {
                var list = [];

                _this.props.items.forEach(function (item) {
                    list.push(item);

                    var itemIsBeingDragged = _this.isMultiDrag(_this.state.draggingId) && _this.state.draggingId === item.id;

                    if (itemIsBeingDragged) {
                        list.push({ id: item.id, name: item.name, clone: true });
                    }
                });

                return list;
            };

            var dataDimensions = itemList().map(function (itemObj, index) {
                return _this.renderListItem(itemObj, index);
            });

            return React.createElement(
                'div',
                { style: styles.container },
                React.createElement(Subtitle, null),
                React.createElement(
                    DragDropContext,
                    {
                        onDragStart: _this.onDragStart,
                        onDragEnd: _this.onDragEnd
                    },
                    React.createElement(
                        Droppable,
                        { droppableId: 'selected-items-droppable' },
                        function (provided) {
                            return React.createElement(
                                ItemsList,
                                _extends({
                                    styles: styles,
                                    innerRef: provided.innerRef
                                }, provided.droppableProps),
                                dataDimensions,
                                provided.placeholder
                            );
                        }
                    )
                ),
                React.createElement(UnAssignButton, {
                    className: 'item-selector-arrow-back-button',
                    onClick: _this.onDeselectClick,
                    iconType: 'arrowBack'
                }),
                React.createElement(DeselectAllButton, {
                    style: styles.deselectButton,
                    onClick: _this.onDeselectAllClick,
                    label: i18n.t('Deselect All')
                })
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return SelectedItems;
}(Component);

SelectedItems.propTypes = {
    items: PropTypes.array.isRequired,
    onDeselect: PropTypes.func.isRequired,
    onReorder: PropTypes.func.isRequired
};

export default SelectedItems;
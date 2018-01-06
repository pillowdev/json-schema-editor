'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-multi-comp */
/* eslint-disable react/no-string-refs */

var JSONSchemaEditor = function JSONSchemaEditor(props) {
  return _react2.default.createElement(SchemaObject, props);
};

JSONSchemaEditor.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  value: _propTypes2.default.object // eslint-disable-line react/forbid-prop-types
};
JSONSchemaEditor.defaultProps = {
  value: {}
};

var shortNumberStyle = {
  width: '50px'
};

var SchemaString = function (_React$Component) {
  _inherits(SchemaString, _React$Component);

  function SchemaString(props) {
    _classCallCheck(this, SchemaString);

    var _this = _possibleConstructorReturn(this, (SchemaString.__proto__ || Object.getPrototypeOf(SchemaString)).call(this, props));

    _this.export = function () {
      return {
        type: 'string',
        format: _this.state.format,
        pattern: _this.state.pattern ? _this.state.pattern : undefined,
        enum: _this.state.enum
      };
    };

    _this.change = function (event) {
      _this.state[event.target.name] = event.target.value;
      _this.setState(_this.state);
    };

    _this.changeBool = function (event) {
      _this.state[event.target.name] = event.target.checked;
      _this.setState(_this.state);
    };

    _this.changeEnum = function (event) {
      var arr = event.target.value.split('\n');
      if (arr.length === 1 && !arr[0]) {
        arr = undefined;
      }
      _this.state[event.target.name] = arr;
      _this.setState(_this.state);
    };

    _this.state = props.data;
    _this.state.hasEnum = !!_this.state.enum;
    return _this;
  }

  _createClass(SchemaString, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.props.onChange();
    }
  }, {
    key: 'render',
    value: function render() {
      var settings = void 0;
      if (this.state.hasEnum) {
        settings = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'label',
            { htmlFor: 'enum' },
            'Enum (one value per line)',
            _react2.default.createElement('textarea', { onChange: this.changeEnum, id: 'enum', value: (this.state.enum || []).join('\n') })
          )
        );
      } else {
        settings = _react2.default.createElement(
          'span',
          null,
          'Pattern: ',
          _react2.default.createElement('input', { name: 'pattern', type: 'text', value: this.state.pattern, onChange: this.change })
        );
      }
      return _react2.default.createElement(
        'div',
        null,
        'Format:',
        _react2.default.createElement(
          'select',
          { name: 'format', onChange: this.change, value: this.state.format },
          _react2.default.createElement('option', { value: '' }),
          _react2.default.createElement(
            'option',
            { value: 'color' },
            'color'
          ),
          _react2.default.createElement(
            'option',
            { value: 'date' },
            'date'
          ),
          _react2.default.createElement(
            'option',
            { value: 'datetime' },
            'datetime'
          ),
          _react2.default.createElement(
            'option',
            { value: 'datetime-local' },
            'datetime-local'
          ),
          _react2.default.createElement(
            'option',
            { value: 'email' },
            'email'
          ),
          _react2.default.createElement(
            'option',
            { value: 'month' },
            'month'
          ),
          _react2.default.createElement(
            'option',
            { value: 'number' },
            'number'
          ),
          _react2.default.createElement(
            'option',
            { value: 'range' },
            'range'
          ),
          _react2.default.createElement(
            'option',
            { value: 'tel' },
            'tel'
          ),
          _react2.default.createElement(
            'option',
            { value: 'text' },
            'text'
          ),
          _react2.default.createElement(
            'option',
            { value: 'textarea' },
            'textarea'
          ),
          _react2.default.createElement(
            'option',
            { value: 'time' },
            'time'
          ),
          _react2.default.createElement(
            'option',
            { value: 'url' },
            'url'
          ),
          _react2.default.createElement(
            'option',
            { value: 'week' },
            'week'
          )
        ),
        'Enum: ',
        _react2.default.createElement('input', { name: 'hasEnum', type: 'checkbox', checked: this.state.hasEnum, onChange: this.changeBool }),
        settings
      );
    }
  }]);

  return SchemaString;
}(_react2.default.Component);

SchemaString.propTypes = JSONSchemaEditor.propTypes;
SchemaString.defaultProps = JSONSchemaEditor.defaultProps;

var SchemaBoolean = function (_React$Component2) {
  _inherits(SchemaBoolean, _React$Component2);

  function SchemaBoolean() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, SchemaBoolean);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = SchemaBoolean.__proto__ || Object.getPrototypeOf(SchemaBoolean)).call.apply(_ref, [this].concat(args))), _this2), _this2.export = function () {
      return {
        type: 'boolean',
        format: 'checkbox'
      };
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(SchemaBoolean, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', null);
    }
  }]);

  return SchemaBoolean;
}(_react2.default.Component);

SchemaBoolean.propTypes = JSONSchemaEditor.propTypes;
SchemaBoolean.defaultProps = JSONSchemaEditor.defaultProps;

var SchemaNumber = function (_React$Component3) {
  _inherits(SchemaNumber, _React$Component3);

  function SchemaNumber(props) {
    _classCallCheck(this, SchemaNumber);

    var _this3 = _possibleConstructorReturn(this, (SchemaNumber.__proto__ || Object.getPrototypeOf(SchemaNumber)).call(this, props));

    _this3.change = function (event) {
      _this3.state[event.target.name] = event.target.value;
      _this3.setState(_this3.state);
    };

    _this3.export = function () {
      var o = JSON.parse(JSON.stringify(_this3.state));
      o.type = 'number';
      delete o.name;
      return o;
    };

    _this3.state = props.data;
    return _this3;
  }

  _createClass(SchemaNumber, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.props.onChange();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        'Min: ',
        _react2.default.createElement('input', { name: 'minimum', style: shortNumberStyle, type: 'number', value: this.state.minimum, onChange: this.change }),
        'Max: ',
        _react2.default.createElement('input', { name: 'maximum', style: shortNumberStyle, type: 'number', value: this.state.maximum, onChange: this.change })
      );
    }
  }]);

  return SchemaNumber;
}(_react2.default.Component);

SchemaNumber.propTypes = JSONSchemaEditor.propTypes;
SchemaNumber.defaultProps = JSONSchemaEditor.defaultProps;

var mapping = function mapping(name, data, changeHandler) {
  // eslint-disable-line arrow-body-style
  return {
    string: _react2.default.createElement(SchemaString, { onChange: changeHandler, ref: name, data: data }),
    number: _react2.default.createElement(SchemaNumber, { onChange: changeHandler, ref: name, data: data }),
    array: _react2.default.createElement(SchemaArray, { onChange: changeHandler, ref: name, data: data }),
    object: _react2.default.createElement(SchemaObject, { onChange: changeHandler, ref: name, data: data }),
    boolean: _react2.default.createElement(SchemaBoolean, { onChange: changeHandler, ref: name, data: data })
  }[data.type];
};

var SchemaArray = function (_React$Component4) {
  _inherits(SchemaArray, _React$Component4);

  function SchemaArray(props) {
    _classCallCheck(this, SchemaArray);

    var _this4 = _possibleConstructorReturn(this, (SchemaArray.__proto__ || Object.getPrototypeOf(SchemaArray)).call(this, props));

    _this4.onChange = function () {
      _this4.props.onChange();
    };

    _this4.change = function (event) {
      if (event.target.type === 'checkbox') {
        _this4.state[event.target.name] = event.target.checked;
      } else if (event.target.name === 'itemtype') {
        _this4.state.items.type = event.target.value;
      } else {
        _this4.state[event.target.name] = event.target.value;
      }
      _this4.setState(_this4.state);
    };

    _this4.export = function () {
      return {
        items: _this4.refs.items.export(),
        minItems: _this4.state.minItems,
        maxItems: _this4.state.maxItems,
        uniqueItems: _this4.state.uniqueItems ? true : undefined,
        format: _this4.state.format,
        type: 'array'
      };
    };

    _this4.state = props.data;
    return _this4;
  }

  _createClass(SchemaArray, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.onChange();
    }
  }, {
    key: 'render',
    value: function render() {
      var optionFormStyle = {
        paddingLeft: '25px',
        paddingTop: '4px'
      };
      this.state.items = this.state.items || { type: 'string' };
      var optionForm = mapping('items', this.state.items, this.onChange);
      return _react2.default.createElement(
        'div',
        null,
        'Items Type:',
        _react2.default.createElement(
          'select',
          { name: 'itemtype', onChange: this.change, value: this.state.items.type },
          _react2.default.createElement(
            'option',
            { value: 'string' },
            'string'
          ),
          _react2.default.createElement(
            'option',
            { value: 'number' },
            'number'
          ),
          _react2.default.createElement(
            'option',
            { value: 'array' },
            'array'
          ),
          _react2.default.createElement(
            'option',
            { value: 'object' },
            'object'
          ),
          _react2.default.createElement(
            'option',
            { value: 'boolean' },
            'boolean'
          )
        ),
        'minItems:  ',
        _react2.default.createElement('input', { name: 'minItems', style: shortNumberStyle, type: 'number', onChange: this.change, value: this.state.minItems }),
        'maxItems:  ',
        _react2.default.createElement('input', { name: 'maxItems', style: shortNumberStyle, type: 'number', onChange: this.change, value: this.state.maxItems }),
        'uniqueItems:  ',
        _react2.default.createElement('input', { name: 'uniqueItems', type: 'checkbox', onChange: this.change, checked: this.state.uniqueItems }),
        'Format:',
        _react2.default.createElement(
          'select',
          { name: 'format', onChange: this.change, value: this.state.format },
          _react2.default.createElement('option', { value: '' }),
          _react2.default.createElement(
            'option',
            { value: 'table' },
            'table'
          ),
          _react2.default.createElement(
            'option',
            { value: 'checkbox' },
            'checkbox'
          ),
          _react2.default.createElement(
            'option',
            { value: 'select' },
            'select'
          ),
          _react2.default.createElement(
            'option',
            { value: 'tabs' },
            'tabs'
          )
        ),
        _react2.default.createElement(
          'div',
          { style: optionFormStyle },
          optionForm
        )
      );
    }
  }]);

  return SchemaArray;
}(_react2.default.Component);

SchemaArray.propTypes = JSONSchemaEditor.propTypes;
SchemaArray.defaultProps = JSONSchemaEditor.defaultProps;

var SchemaObject = function (_React$Component5) {
  _inherits(SchemaObject, _React$Component5);

  _createClass(SchemaObject, null, [{
    key: 'propsToState',
    value: function propsToState(props) {
      var data = props.data;

      data.properties = data.properties || {};
      data.required = data.required || [];
      data.propertyNames = [];
      // convert from object to array
      data.properties = Object.keys(data.properties).map(function (name) {
        data.propertyNames.push(name);
        return data.properties[name];
      });
      return data;
    }
  }]);

  function SchemaObject(props) {
    _classCallCheck(this, SchemaObject);

    var _this5 = _possibleConstructorReturn(this, (SchemaObject.__proto__ || Object.getPrototypeOf(SchemaObject)).call(this, props));

    _this5.onChange = function () {
      _this5.props.onChange(_this5.export());
      _this5.trigger('change');
    };

    _this5.deleteItem = function (event) {
      var i = event.target.parentElement.dataset.index;
      var requiredIndex = _this5.state.required.indexOf(_this5.state.propertyNames[i]);
      if (requiredIndex !== -1) {
        _this5.state.required.splice(requiredIndex, 1);
      }
      _this5.state.properties.splice(i, 1);
      _this5.state.propertyNames.splice(i, 1);
      _this5.setState(_this5.state);
    };

    _this5.changeItem = function (event) {
      var i = event.target.parentElement.dataset.index;
      if (event.target.name === 'type') {
        _this5.state.properties[i].type = event.target.value;
      } else if (event.target.name === 'field') {
        _this5.state.propertyNames[i] = event.target.value;
      }
      _this5.setState(_this5.state);
    };

    _this5.changeRequired = function (event) {
      if (event.target.checked) {
        _this5.state.required.push(event.target.name);
      } else {
        var i = _this5.state.required.indexOf(event.target.name);
        _this5.state.required.splice(i, 1);
      }
      _this5.setState(_this5.state);
    };

    _this5.change = function (event) {
      _this5.state[event.target.name] = event.target.checked;
      _this5.setState(_this5.state);
    };

    _this5.changeText = function (event) {
      _this5.state[event.target.name] = event.target.value;
      _this5.setState(_this5.state);
    };

    _this5.add = function () {
      _this5.state.properties.push({ name: '', type: 'string' });
      _this5.setState(_this5.state);
    };

    _this5.export = function () {
      var properties = {};
      Object.keys(_this5.state.properties).forEach(function (index) {
        var name = _this5.state.properties[index].name;

        if (typeof _this5.refs['item' + index] !== 'undefined' && name.length > 0) {
          properties[name] = _this5.refs['item' + index].export();
        }
      });
      return {
        properties: properties,
        type: 'object',
        additionalProperties: _this5.state.additionalProperties,
        format: _this5.state.format,
        required: _this5.state.required.length ? _this5.state.required : undefined
      };
    };

    _this5.on = function (event, callback) {
      _this5.callbacks = _this5.callbacks || {};
      _this5.callbacks[event] = _this5.callbacks[event] || [];
      _this5.callbacks[event].push(callback);
      return _this5;
    };

    _this5.trigger = function (event) {
      if (_this5.callbacks && _this5.callbacks[event] && _this5.callbacks[event].length) {
        for (var i = 0; i < _this5.callbacks[event].length; i += 1) {
          _this5.callbacks[event][i]();
        }
      }

      return _this5;
    };

    _this5.state = _this5.propsToState(props);
    return _this5;
  }

  _createClass(SchemaObject, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this.setState(this.propsToState(newProps));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.onChange();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var optionFormStyle = {
        paddingLeft: '25px',
        paddingTop: '4px'
      };
      var requiredIcon = {
        fontSize: '1em',
        color: 'red',
        fontWeight: 'bold',
        paddingLeft: '5px'
      };
      var fieldStyle = {
        paddingBottom: '10px'
      };
      var objectStyle = {
        borderLeft: '2px dotted gray',
        paddingLeft: '8px',
        paddingTop: '10px'
      };
      var typeSelectStyle = {
        marginLeft: '5px'
      };
      var deletePropStyle = {
        border: '1px solid black',
        padding: '0px 4px 0px 4px',
        pointer: 'cursor'
      };
      return _react2.default.createElement(
        'div',
        { style: objectStyle },
        this.state.properties.map(function (value, index) {
          var name = _this6.state.properties[index].name;

          var copiedState = JSON.parse(JSON.stringify(_this6.state.properties[index]));
          var optionForm = mapping('item' + index, copiedState, _this6.onChange);
          return _react2.default.createElement(
            'div',
            { 'data-index': index, style: fieldStyle, key: index },
            _react2.default.createElement('input', { name: 'field', type: 'string', onChange: _this6.changeItem, value: name }),
            _react2.default.createElement(
              'select',
              { style: typeSelectStyle, name: 'type', onChange: _this6.changeItem, value: value.type },
              _react2.default.createElement(
                'option',
                { value: 'string' },
                'string'
              ),
              _react2.default.createElement(
                'option',
                { value: 'number' },
                'number'
              ),
              _react2.default.createElement(
                'option',
                { value: 'array' },
                'array'
              ),
              _react2.default.createElement(
                'option',
                { value: 'object' },
                'object'
              ),
              _react2.default.createElement(
                'option',
                { value: 'boolean' },
                'boolean'
              )
            ),
            _react2.default.createElement(
              'span',
              { style: requiredIcon },
              '*'
            ),
            _react2.default.createElement('input', { name: name, type: 'checkbox', onChange: _this6.changeRequired, checked: _this6.state.required.indexOf(name) !== -1 }),
            _react2.default.createElement(
              'span',
              { onClick: _this6.deleteItem, style: deletePropStyle },
              'x'
            ),
            _react2.default.createElement(
              'div',
              { style: optionFormStyle },
              optionForm
            )
          );
        }),
        _react2.default.createElement(
          'div',
          null,
          'Allow additional properties: ',
          _react2.default.createElement('input', { name: 'additionalProperties', type: 'checkbox', onChange: this.change, checked: this.state.additionalProperties }),
          'Format:',
          _react2.default.createElement(
            'select',
            { name: 'format', onChange: this.changeText, value: this.state.format },
            _react2.default.createElement('option', { value: '' }),
            _react2.default.createElement(
              'option',
              { value: 'grid' },
              'grid'
            ),
            _react2.default.createElement(
              'option',
              { value: 'schema' },
              'schema'
            )
          )
        ),
        _react2.default.createElement(
          'button',
          { onClick: this.add },
          'Add another field'
        )
      );
    }
  }]);

  return SchemaObject;
}(_react2.default.Component);

SchemaObject.propTypes = JSONSchemaEditor.propTypes;
SchemaObject.defaultProps = JSONSchemaEditor.defaultProps;

exports.default = JSONSchemaEditor;
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/no-string-refs */

import React from 'react';
import PropTypes from 'prop-types';

const JSONSchemaEditor = props => (
  <SchemaObject {...props} />
);

JSONSchemaEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
JSONSchemaEditor.defaultProps = {
  value: {},
};

const shortNumberStyle = {
  width: '50px',
};

class SchemaString extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
    this.state.hasEnum = !!this.state.enum;
  }
  componentDidUpdate() {
    this.props.onChange();
  }
  export = () => ({
    type: 'string',
    format: this.state.format,
    pattern: this.state.pattern ? this.state.pattern : undefined,
    enum: this.state.enum,
  })
  change = (event) => {
    this.state[event.target.name] = event.target.value;
    this.setState(this.state);
  }
  changeBool = (event) => {
    this.state[event.target.name] = event.target.checked;
    this.setState(this.state);
  }
  changeEnum = (event) => {
    let arr = event.target.value.split('\n');
    if (arr.length === 1 && !arr[0]) {
      arr = undefined;
    }
    this.state[event.target.name] = arr;
    this.setState(this.state);
  }
  render() {
    let settings;
    if (this.state.hasEnum) {
      settings = (
        <div>
          <label htmlFor="enum">
            Enum (one value per line)
            <textarea onChange={this.changeEnum} id="enum" value={(this.state.enum || []).join('\n')} />
          </label>
        </div>
      );
    } else {
      settings = (
        <span>
          Pattern: <input name="pattern" type="text" value={this.state.pattern} onChange={this.change} />
        </span>
      );
    }
    return (
      <div>
        Format:
        <select name="format" onChange={this.change} value={this.state.format}>
          <option value="" />
          <option value="color">color</option>
          <option value="date">date</option>
          <option value="datetime">datetime</option>
          <option value="datetime-local">datetime-local</option>
          <option value="email">email</option>
          <option value="month">month</option>
          <option value="number">number</option>
          <option value="range">range</option>
          <option value="tel">tel</option>
          <option value="text">text</option>
          <option value="textarea">textarea</option>
          <option value="time">time</option>
          <option value="url">url</option>
          <option value="week">week</option>
        </select>
        Enum: <input name="hasEnum" type="checkbox" checked={this.state.hasEnum} onChange={this.changeBool} />
        {settings}
      </div>
    );
  }
}
SchemaString.propTypes = JSONSchemaEditor.propTypes;
SchemaString.defaultProps = JSONSchemaEditor.defaultProps;

class SchemaBoolean extends React.Component {
  export = () => ({
    type: 'boolean',
    format: 'checkbox',
  })
  render() {
    return (
      <div />
    );
  }
}
SchemaBoolean.propTypes = JSONSchemaEditor.propTypes;
SchemaBoolean.defaultProps = JSONSchemaEditor.defaultProps;

class SchemaNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }
  componentDidUpdate() {
    this.props.onChange();
  }
  change = (event) => {
    this.state[event.target.name] = event.target.value;
    this.setState(this.state);
  }
  export = () => {
    const o = JSON.parse(JSON.stringify(this.state));
    o.type = 'number';
    delete o.name;
    return o;
  }
  render() {
    return (
      <div>
        Min: <input name="minimum" style={shortNumberStyle} type="number" value={this.state.minimum} onChange={this.change} />
        Max: <input name="maximum" style={shortNumberStyle} type="number" value={this.state.maximum} onChange={this.change} />
      </div>
    );
  }
}
SchemaNumber.propTypes = JSONSchemaEditor.propTypes;
SchemaNumber.defaultProps = JSONSchemaEditor.defaultProps;

const mapping = (name, data, changeHandler) => { // eslint-disable-line arrow-body-style
  return {
    string: <SchemaString onChange={changeHandler} ref={name} data={data} />,
    number: <SchemaNumber onChange={changeHandler} ref={name} data={data} />,
    array: <SchemaArray onChange={changeHandler} ref={name} data={data} />,
    object: <SchemaObject onChange={changeHandler} ref={name} data={data} />,
    boolean: <SchemaBoolean onChange={changeHandler} ref={name} data={data} />,
  }[data.type];
};

class SchemaArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }
  componentDidUpdate() {
    this.onChange();
  }
  onChange = () => {
    this.props.onChange();
  }
  change = (event) => {
    if (event.target.type === 'checkbox') {
      this.state[event.target.name] = event.target.checked;
    } else if (event.target.name === 'itemtype') {
      this.state.items.type = event.target.value;
    } else {
      this.state[event.target.name] = event.target.value;
    }
    this.setState(this.state);
  }
  export = () => ({
    items: this.refs.items.export(),
    minItems: this.state.minItems,
    maxItems: this.state.maxItems,
    uniqueItems: (this.state.uniqueItems ? true : undefined),
    format: this.state.format,
    type: 'array',
  })
  render() {
    const optionFormStyle = {
      paddingLeft: '25px',
      paddingTop: '4px',
    };
    this.state.items = this.state.items || { type: 'string' };
    const optionForm = mapping('items', this.state.items, this.onChange);
    return (
      <div>
        Items Type:
        <select name="itemtype" onChange={this.change} value={this.state.items.type}>
          <option value="string">string</option>
          <option value="number">number</option>
          <option value="array">array</option>
          <option value="object">object</option>
          <option value="boolean">boolean</option>
        </select>
        minItems:  <input name="minItems" style={shortNumberStyle} type="number" onChange={this.change} value={this.state.minItems} />
        maxItems:  <input name="maxItems" style={shortNumberStyle} type="number" onChange={this.change} value={this.state.maxItems} />
        uniqueItems:  <input name="uniqueItems" type="checkbox" onChange={this.change} checked={this.state.uniqueItems} />
        Format:
        <select name="format" onChange={this.change} value={this.state.format}>
          <option value="" />
          <option value="table">table</option>
          <option value="checkbox">checkbox</option>
          <option value="select">select</option>
          <option value="tabs">tabs</option>
        </select>
        <div style={optionFormStyle}>
          {optionForm}
        </div>
      </div>
    );
  }
}
SchemaArray.propTypes = JSONSchemaEditor.propTypes;
SchemaArray.defaultProps = JSONSchemaEditor.defaultProps;

class SchemaObject extends React.Component {
  static propsToState(props) {
    const { data } = props;
    data.properties = data.properties || {};
    data.required = data.required || [];
    data.propertyNames = [];
    // convert from object to array
    data.properties = Object.keys(data.properties).map((name) => {
      data.propertyNames.push(name);
      return data.properties[name];
    });
    return data;
  }

  constructor(props) {
    super(props);
    this.state = this.propsToState(props);
  }

  componentWillReceiveProps(newProps) {
    this.setState(this.propsToState(newProps));
  }

  componentDidUpdate() {
    this.onChange();
  }

  onChange = () => {
    this.props.onChange(this.export());
    this.trigger('change');
  }

  deleteItem = (event) => {
    const i = event.target.parentElement.dataset.index;
    const requiredIndex = this.state.required.indexOf(this.state.propertyNames[i]);
    if (requiredIndex !== -1) {
      this.state.required.splice(requiredIndex, 1);
    }
    this.state.properties.splice(i, 1);
    this.state.propertyNames.splice(i, 1);
    this.setState(this.state);
  }
  changeItem = (event) => {
    const i = event.target.parentElement.dataset.index;
    if (event.target.name === 'type') {
      this.state.properties[i].type = event.target.value;
    } else if (event.target.name === 'field') {
      this.state.propertyNames[i] = event.target.value;
    }
    this.setState(this.state);
  }
  changeRequired = (event) => {
    if (event.target.checked) {
      this.state.required.push(event.target.name);
    } else {
      const i = this.state.required.indexOf(event.target.name);
      this.state.required.splice(i, 1);
    }
    this.setState(this.state);
  }
  change = (event) => {
    this.state[event.target.name] = event.target.checked;
    this.setState(this.state);
  }
  changeText = (event) => {
    this.state[event.target.name] = event.target.value;
    this.setState(this.state);
  }
  add = () => {
    this.state.properties.push({ name: '', type: 'string' });
    this.setState(this.state);
  }
  export = () => {
    const properties = {};
    Object.keys(this.state.properties).forEach((index) => {
      const { name } = this.state.properties[index];
      if (typeof this.refs['item' + index] !== 'undefined' && name.length > 0) {
        properties[name] = this.refs['item' + index].export();
      }
    });
    return {
      properties,
      type: 'object',
      additionalProperties: this.state.additionalProperties,
      format: this.state.format,
      required: this.state.required.length ? this.state.required : undefined,
    };
  }
  on = (event, callback) => {
    this.callbacks = this.callbacks || {};
    this.callbacks[event] = this.callbacks[event] || [];
    this.callbacks[event].push(callback);
    return this;
  }
  trigger = (event) => {
    if (this.callbacks && this.callbacks[event] && this.callbacks[event].length) {
      for (let i = 0; i < this.callbacks[event].length; i += 1) {
        this.callbacks[event][i]();
      }
    }

    return this;
  }
  render() {
    const optionFormStyle = {
      paddingLeft: '25px',
      paddingTop: '4px',
    };
    const requiredIcon = {
      fontSize: '1em',
      color: 'red',
      fontWeight: 'bold',
      paddingLeft: '5px',
    };
    const fieldStyle = {
      paddingBottom: '10px',
    };
    const objectStyle = {
      borderLeft: '2px dotted gray',
      paddingLeft: '8px',
      paddingTop: '10px',
    };
    const typeSelectStyle = {
      marginLeft: '5px',
    };
    const deletePropStyle = {
      border: '1px solid black',
      padding: '0px 4px 0px 4px',
      pointer: 'cursor',
    };
    return (
      <div style={objectStyle}>
        {this.state.properties.map((value, index) => {
          const { name } = this.state.properties[index];
          const copiedState = JSON.parse(JSON.stringify(this.state.properties[index]));
          const optionForm = mapping(`item${index}`, copiedState, this.onChange);
          return (
            <div data-index={index} style={fieldStyle} key={index}>
              <input name="field" type="string" onChange={this.changeItem} value={name} />
              <select style={typeSelectStyle} name="type" onChange={this.changeItem} value={value.type}>
                <option value="string">string</option>
                <option value="number">number</option>
                <option value="array">array</option>
                <option value="object">object</option>
                <option value="boolean">boolean</option>
              </select>
              <span style={requiredIcon}>*</span><input name={name} type="checkbox" onChange={this.changeRequired} checked={this.state.required.indexOf(name) !== -1} />
              <span onClick={this.deleteItem} style={deletePropStyle}>x</span>
              <div style={optionFormStyle}>
                {optionForm}
              </div>
            </div>
          );
        })}
        <div>
          Allow additional properties: <input name="additionalProperties" type="checkbox" onChange={this.change} checked={this.state.additionalProperties} />
          Format:
          <select name="format" onChange={this.changeText} value={this.state.format}>
            <option value="" />
            <option value="grid">grid</option>
            <option value="schema">schema</option>
          </select>
        </div>
        <button onClick={this.add}>Add another field</button>
      </div>
    );
  }
}
SchemaObject.propTypes = JSONSchemaEditor.propTypes;
SchemaObject.defaultProps = JSONSchemaEditor.defaultProps;

export default JSONSchemaEditor;

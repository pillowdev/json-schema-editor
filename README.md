# JSON Schema Editor

![npm badge](https://badge.fury.io/js/json-schema-editor.svg)

Generates HTML for creating and modifying [json schemas](http://json-schema.org). I created this because [json-editor](https://github.com/jdorn/json-editor) is not good at modifying schemas (using the [meta schema](http://json-schema.org/schema)) and couldn't find any other good UI for making json schemas.

## Getting started
--------------------
1. Make sure React is loaded on your page. Read more at [facebook/react](https://github.com/facebook/react#installation).

2. Include JSON Schema Editor

  - Using npm:

  ```sh
  npm install json-schema-editor
  ```

  ```javascript
  import JSONSchemaEditor from 'json-schema-editor';
  ```

3. Initialize the component

```javascript
render() {
  return (
    <JSONSchemaEditor
      data={{}}
      onChange={console.log}
    />
  );
}
```

## Example
-------------
Here is what the [product schema](http://json-schema.org/example1.html) example looks like rendered.

![JSON Schema Editor Example](https://cloud.githubusercontent.com/assets/406149/14623022/a1a3c96e-058b-11e6-9cef-0b61ff242e8d.png)

## Todo
* Add support for the description field.
* exclusiveMinimum and exclusiveMaximum, are these even necessary?
* refs
* definitions
* patternProperties
* allOf, anyOf, oneOf

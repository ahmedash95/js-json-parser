# JSON parser

JSON praser built in JS that can 
- Build an **AST** for **JSON** 
- Prase json text to JS object

# Usage

### to prase JSON and get an AST
```js
const { Parser } = require('./parser');

const p = new Parser(`{"name": "Json Parser"}`)

console.log(p.parse())

/** output **/
{
  "type": "Object",
  "body": [
    {
      "type": "PropertyExpression",
      "key": {
        "type": "StringLiteral",
        "value": "name"
      },
      "value": {
        "type": "StringLiteral",
        "value": "Json Parser"
      }
    }
  ]
}
```

### to prase json string and get JS object
```js
const { JsonBuilder } = require('./builder');

const b = new JsonBuilder()

console.log(b.build(`{"name": "Json Parser"}`));

/** output **/
{ 
  name: 'Json Parser' 
}
```

# Install

It has no dependencies. so no need to install anything.

# Testing

If you don't have [JEST](https://jestjs.io/). you can run 
```bash
yarn install
```

and to run tests
```bash
jest --verbose
```
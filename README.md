# JSON parser

JSON parser built in JS that can 
- Build an **AST** for **JSON** 
- Parse json text to JS object

**NOTE:** Its not for production

# Install

```bash
npm i js-nasty-json-parser
```

# Usage

### AST - to parse JSON and get an AST
```js
const { Parser } = require('js-nasty-json-parser/parser');

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

### Object - to parse json string and get JS object
```js
const { JsonBuilder } = require('js-nasty-json-parser/builder');

const b = new JsonBuilder()

console.log(b.build(`{"name": "Json Parser"}`));

/** output **/
{ 
  name: 'Json Parser' 
}
```

# Testing

If you don't have [JEST](https://jestjs.io/). you can run 
```bash
yarn install
```

and to run tests
```bash
jest --verbose
```

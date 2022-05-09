const { Parser } = require('../../parser'); 

test('empty object', () => {
  const p = new Parser(`{}`);
  expect(p.parse()).toEqual({
    type: 'Object',
    body: []
  });
})

test('one key object', () => {
  const p = new Parser(`{"name": "Ahmed"}`);
  expect(p.parse()).toEqual({
    type: 'Object',
    body: [{
      type: 'PropertyExpression',
      key: {
        type: 'StringLiteral',
        value: 'name'
      },
      value: {
        type: 'StringLiteral',
        value: 'Ahmed'
      }
    }]
  });
})

test('two keys object', () => {
  const p = new Parser(`{"name": "Ahmed", "age": 25}`);
  expect(p.parse()).toEqual({
    type: 'Object',
    body: [{
      type: 'PropertyExpression',
      key: {
        type: 'StringLiteral',
        value: 'name'
      },
      value: {
        type: 'StringLiteral',
        value: 'Ahmed'
      }
    }, {
      type: 'PropertyExpression',
      key: {
        type: 'StringLiteral',
        value: 'age'
      },
      value: {
        type: 'NumberLiteral',
        value: 25
      }
    }]
  });
})

test('nested objects', () => {
  const p = new Parser(`{"name": "Ahmed", "companies": ["Speakol", "GetYourGuide"]}`);
  expect(p.parse()).toEqual({
    type: 'Object',
    body: [{
      type: 'PropertyExpression',
      key: {
        type: 'StringLiteral',
        value: 'name'
      },
      value: {
        type: 'StringLiteral',
        value: 'Ahmed'
      }
    }, {
      type: 'PropertyExpression',
      key: {
        type: 'StringLiteral',
        value: 'companies'
      },
      value: {
        type: 'Array',
        body: [{
          type: 'StringLiteral',
          value: 'Speakol'
        }, {
          type: 'StringLiteral',
          value: 'GetYourGuide'
        }]
      }
    }]
  });
})

test('nested objects 2', () => {
  const p = new Parser(`{"name": "Ahmed", "companies": [{"name": "Speakol"}, {"name": "GetYourGuide"}]}`);
  expect(p.parse()).toEqual({
    type: 'Object',
    body: [{
      type: 'PropertyExpression',
      key: {
        type: 'StringLiteral',
        value: 'name'
      },
      value: {
        type: 'StringLiteral',
        value: 'Ahmed'
      }
    }, {
      type: 'PropertyExpression',
      key: {
        type: 'StringLiteral',
        value: 'companies'
      },
      value: {
        type: 'Array',
        body: [{
          type: 'Object',
          body: [{
            type: 'PropertyExpression',
            key: {
              type: 'StringLiteral',
              value: 'name'
            },
            value: {
              type: 'StringLiteral',
              value: 'Speakol'
            }
          }]
        }, {
          type: 'Object',
          body: [{
            type: 'PropertyExpression',
            key: {
              type: 'StringLiteral',
              value: 'name'
            },
            value: {
              type: 'StringLiteral',
              value: 'GetYourGuide'
            }
          }]
        }]
      }
    }]
  });
})
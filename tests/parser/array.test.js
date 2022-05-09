const { Parser } = require('../../parser');

test('empty array', () => {
  const p = new Parser(`[]`);
  expect(p.parse()).toEqual({
    type: 'Array',
    body: []
  });
})

test('array with string literal', () => {
  const p = new Parser(`["Hello World"]`);
  expect(p.parse()).toEqual({
    type: 'Array',
    body: [{
      type: 'StringLiteral',
      value: 'Hello World'
    }]
  });
})

test('array with number literal', () => {
  const p = new Parser(`[42]`);
  expect(p.parse()).toEqual({
    type: 'Array',
    body: [{
      type: 'NumberLiteral',
      value: 42
    }]
  });
})

test('array with two literals', () => {
  const p = new Parser(`[42, "Hello World"]`);
  expect(p.parse()).toEqual({
    type: 'Array',
    body: [
      {
        type: 'NumberLiteral',
        value: 42
      },
      {
        type: 'StringLiteral',
        value: 'Hello World'
      }
    ]
  });
})

test('array with many literals', () => {
  const p = new Parser(`[42, "Hello World", true]`);
  expect(p.parse()).toEqual({
    type: 'Array',
    body: [
      {
        type: 'NumberLiteral',
        value: 42
      },
      {
        type: 'StringLiteral',
        value: 'Hello World'
      },
      {
        type: 'BooleanLiteral',
        value: true
      }
    ]
  });
})
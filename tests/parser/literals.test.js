const { Parser } = require('../../parser');

test('string literal',() => {
  const p = new Parser('"Hello World"');
  expect(p.parse()).toEqual({
    type: 'StringLiteral',
    value: 'Hello World'
  });
})

test('number literal',() => {
  const p = new Parser('42');
  expect(p.parse()).toEqual({
    type: 'NumberLiteral',
    value: 42
  });
})

test('null literal',() => {
  const p = new Parser('null');
  expect(p.parse()).toEqual({
    type: 'NullLiteral'
  });
})

test('bool literal',() => {
  const p1 = new Parser('true');
  expect(p1.parse()).toEqual({
    type: 'BooleanLiteral',
    value: true
  });

  const p2 = new Parser('false');
  expect(p2.parse()).toEqual({
    type: 'BooleanLiteral',
    value: false
  });
})
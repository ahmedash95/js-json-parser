const { JsonBuilder } = require('../../builder');

test('sample 1', () => {
  const b = new JsonBuilder();
  expect(b.build(`[]`)).toEqual([]);
})

test('sample 2', () => {
  const b = new JsonBuilder();
  expect(b.build(`{}`)).toEqual({});
})

test('sample 3', () => {
  const b = new JsonBuilder();
  expect(b.build(`"Ahmed"`)).toEqual("Ahmed");
})

test('sample 4', () => {
  const b = new JsonBuilder();
  expect(b.build(`42`)).toEqual(42);
})

test('sample 5', () => {
  const b = new JsonBuilder();
  expect(b.build(`[1,2, "Ahmed"]`)).toEqual([1,2, "Ahmed"]);
})

test('sample 6', () => {
  const b = new JsonBuilder();
  expect(b.build(`[{"name": "Ahmed"}]`)).toEqual([{name: "Ahmed"}]);
})

test('sample 7', () => {
  const b = new JsonBuilder();
  expect(b.build(`[{"name": "Ahmed", "age": 30}]`)).toEqual([{name: "Ahmed", age: 30}]);
})

test('sample 8', () => {
  const b = new JsonBuilder();
  expect(b.build(`{"name": "Ahmed", "address": {"street":"SchillerStr", "building_nr": 120}}`)).toEqual({
    name: "Ahmed",
    address: {
      street: "SchillerStr",
      building_nr: 120
    }
  });
})

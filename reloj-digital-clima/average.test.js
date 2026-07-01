const test = require("node:test");
const assert = require("node:assert/strict");

const { calcularPromedio } = require("./average");

test("calcularPromedio retorna el promedio de varios números", () => {
  assert.equal(calcularPromedio([10, 20, 30, 40]), 25);
});

test("calcularPromedio retorna el mismo valor con un único elemento", () => {
  assert.equal(calcularPromedio([7]), 7);
});

test("calcularPromedio lanza error cuando la lista está vacía", () => {
  assert.throws(() => calcularPromedio([]), /no puede estar vacía/i);
});

test("calcularPromedio maneja números negativos y decimales", () => {
  assert.equal(calcularPromedio([-3.5, 2.5, 1]), 0);
});

test("calcularPromedio rechaza elementos no numéricos", () => {
  assert.throws(() => calcularPromedio([1, "2", 3]), /deben ser números finitos/i);
});

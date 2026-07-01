/**
 * Calcula la media aritmética de una lista de números.
 * @param {number[]} numeros Lista de números enteros y/o decimales.
 * @returns {number} Promedio de los elementos de la lista.
 * @throws {TypeError} Si el argumento no es un arreglo o contiene valores no numéricos.
 * @throws {Error} Si la lista está vacía.
 */
function calcularPromedio(numeros) {
  if (!Array.isArray(numeros)) {
    throw new TypeError("El argumento debe ser un arreglo de números.");
  }

  if (numeros.length === 0) {
    throw new Error("La lista no puede estar vacía.");
  }

  const suma = numeros.reduce((acumulado, numero) => {
    if (typeof numero !== "number" || Number.isNaN(numero) || !Number.isFinite(numero)) {
      throw new TypeError("Todos los elementos deben ser números finitos.");
    }
    return acumulado + numero;
  }, 0);

  return suma / numeros.length;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { calcularPromedio };
}

if (typeof window !== "undefined") {
  window.calcularPromedio = calcularPromedio;
}

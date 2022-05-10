/**
 * Determines if a value is between two numbers or within the min/max of an Array's elements
 * @param {number | string} thisArg - Number we want to compare
 * @param {number | string | Array.<{number | string}>} valueOne - First number or array to test against
 * @param {number | string} [valueTwo=] - Second number to test against
 * @returns {boolean} Result of comparison
 */
export function isBetween(thisArg, valueOne, valueTwo) {
  if (thisArg === undefined) throw new TypeError('isBetween() invoked without providing "thisArg" parameter');
  if (valueOne === undefined) throw new TypeError('isBetween() invoked without providing "valueOne" parameter');
  const range = [0, 0];
  if (Array.isArray(valueOne)) {
    if (valueTwo !== undefined) throw new TypeError('isBetween() cannot be invoked with multiple parameters when comparing against an Array');
    range[0] = Math.min(valueOne);
    range[1] = Math.max(valueOne);
  }
  if (valueTwo === undefined) {
    if (valueOne === 0) return thisArg === 0;
    range[0] = (thisArg < 0) ? valueOne : 0;
    range[1] = (thisArg > 0) ? valueOne : 0;
  } else {
    range[0] = Math.min(valueOne, valueTwo);
    range[1] = Math.max(valueOne, valueTwo);
  }
  return range[0] < thisArg && range[1] > thisArg;
}

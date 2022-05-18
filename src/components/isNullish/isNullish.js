/**
 * Tests any number of parameters to determine if they are null or undefined
 * @param  {...any} tests Values to test
 * @returns {boolean} Indicates if all tests are null and/or undefined
 */
function isNullish(...tests) {
  let result = true;
  tests.forEach(function (test) {
    return result = (test === undefined || test === null) ? result : false;
  });
  return result;
}

export { isNullish as isNullish };

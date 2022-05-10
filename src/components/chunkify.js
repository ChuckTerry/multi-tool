/**
 * Divides an object into chucks of specified size
 * @param {Array<any>} array - Object to convert into chunked Array
 * @param {number | string} size - Size of each chunk
 * @param {boolean} [exact = false] - Should all chunks be exactly the same size (i.e. should the final chunk be a sparse array equal to size parameter)
 * @returns {Array<any>} - Array representation of chunkified object
 */
export function chunkify(array, size, exact = false) {
  if (isArray(array) === false) throw new TypeError('chunkify() attempted on object that is not array-like');
  if (isNaN(size) === true) throw new TypeError(`chunkify() called with size parameter of type "${typeof size}" but only accepts types "number" or "string"`);
  const returnArray = array;
  const chunkSize = (size < 1 || isNaN(size)) ? 1 : size;
  const workingArray = returnArray.splice(0, returnArray.length);
  while (workingArray.length > 0) {
    let chunk = workingArray.splice(0, chunkSize);
    if (exact === true && workingArray.length < chunkSize) {
      chunk.reverse();
      chunk.length = chunkSize;
      chunk.reverse();
    }
    returnArray.push(chunk);
  }
  return returnArray;
}

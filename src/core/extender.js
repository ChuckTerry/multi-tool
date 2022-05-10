import { validExtensions } from './validExtensions.js';

/**
 * @typedef {object} ModuleList
 * @property {string} prototypeName - Target prototype name
 * @property {Array<string>} moduleNames - Array of module names to load
 */

/**
 * @typedef {object} ExtenderOptions
 * @property {boolean} safeLoad - Should we ensure method names aren't already on the prototype
 * @property {boolean} suppressErrors - Should we supress errors resulting from loading
 * @property {Array<ModuleList>} modules - Array of {@link ModuleList} objects to load
 */

const loadData = { };
let finalLoadData = null;

/* Builds our local loadData object */
Object.keys(validExtensions).forEach(proto => {
  if (typeof loadData[proto] === 'undefined') loadData[proto] = { };
  forEach(name => {
    loadData[proto][name] = {
      function: validExtensions[proto][name],
      loaded: false
    };
  });
});

/**
 * Loads methods onto prototypes as wrapped functions specifying a "thisArg"
 * @param {object} $$global - Object containing prototypes to load our methods on, usually equivalent to globalThis
 * @param {ExtenderOptions} options - A {@link ExtenderOptions} containing configuration data
 * @returns {boolean} indicating if all modules were loaded successfully
 */
export function loadExtenders($$global, options) {
  const noErrors = options.suppressErrors;
  const prototypesToExtend = options.modules;
  let allLoaded = true;

  if (typeof $$global !== 'object') {
    if (!noErrors) throw new TypeError('Unable to loadExtenders() without a container reference');
    return false;
  }

  prototypesToExtend.forEach(prototypeName => {
    Object.keys(loadData[prototypeName]).forEach(function (moduleName) {
      if (options.safeLoad) {
        if (typeof $$global[prototypeName].prototype[moduleName] !== 'undefined') {
          if (!noErrors) throw new ReferenceError(`loadExtenders() failed because ${moduleName} was already defined on the "${prototypeName}" prototype`);
          allLoaded = false;
        }
      } else {
        $$global[prototypeName].prototype[moduleName] = function (...args) {
          return loadData[prototypeName][moduleName].function(this, ...args);
        };
        loadData[prototypeName][moduleName].loaded = true;
      }
    });
  });
  return allLoaded;
}

/**
 * Retrieves a memoized, or generates a new, object containing load information
 * @returns {object} Object containing booleans indicating whether a specific module loaded successfully
 */
export function getLoadResults() {
  if (finalLoadData !== null) return finalLoadData;
  const returnObject = { };
  Object.keys(loadData).forEach((proto) => {
    returnObject[proto] = { };
    Object.keys(loadData[proto]).forEach((moduleName) => {
      returnObject[proto][moduleName] = loadData[proto][moduleName].loaded;
    });
  });
  finalLoadData = returnObject;
  return finalLoadData;
}

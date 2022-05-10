import { isBetween as isBetween } from "../components/isBetween"

const moduleData = {
  isBetween: {
    function: isBetween,
    loaded: false
  }
};

/**
 * @typedef {object} ExtendNumberOptions
 * @property {boolean} safeLoad - Should we ensure method names aren't already on the prototype
 * @property {boolean} suppressErrors - Should we supress errors resulting from loading
 * @property {Array.<string>} modules - List of modules to load
 */

/**
 * Loads methods onto Number.prototype
 * @param {object} $$global - Object containing prototypes to load our methods on, usually equivalent to globalThis
 * @param {ExtendNumberOptions} options - A {@link ExtendNumberOptions} containing configuration data
 * @returns 
 */
export function loadNumberExtenders($$global, options) {
  const noErrors = options.suppressErrors;
  const requiredModules = options.modules;
  let allLoaded = true;

  if (typeof $$global !== 'object') {
    if (!noErrors) throw new TypeError('Unable to loadNumberExtenders() without a container reference');
    return false;
  }

  requiredModules.forEach(function(moduleName) {
    if (options.safeLoad) {
      if (typeof $$global.Number.prototype[moduleName] !== 'undefined') {
        if (!noErrors) throw new ReferenceError(`loadNumberExtenders() failed because ${moduleName} was already defined on the Number prototype`);
        allLoaded = false;
      }
    } else {
      $$global.Number.prototype[moduleName] = function(...args) {
        return moduleData[moduleName].function(this, ...args);
      };
      moduleData[moduleName].loaded = true;
    }
  });

  return allLoaded;
}

export function getLoadResults() {
  const returnObject = { };
  Object.keys(moduleData).forEach(moduleName => returnObject[moduleName] = moduleData[moduleName].loaded);
  return returnObject;
}

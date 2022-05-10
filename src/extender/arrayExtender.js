import { chunkify as chunkify } from "../components/chunkify"

const moduleData = {
  chunkify: {
    function: chunkify,
    loaded: false
  }
};

/**
 * @typedef {object} ExtendArrayOptions
 * @property {boolean} safeLoad - Should we ensure method names aren't already on the prototype
 * @property {boolean} suppressErrors - Should we supress errors resulting from loading
 * @property {Array.<string>} modules - List of modules to load
 */

/**
 * Loads methods onto Array.prototype
 * @param {object} $$global - Object containing prototypes to load our methods on, usually equivalent to globalThis
 * @param {ExtendArrayOptions} options - A {@link ExtendArrayOptions} containing configuration data
 * @returns 
 */
export function loadArrayExtenders($$global, options) {
  const noErrors = options.suppressErrors;
  const requiredModules = options.modules;
  let allLoaded = true;

  if (typeof $$global !== 'object') {
    if (!noErrors) throw new TypeError('Unable to loadArrayExtenders() without a container reference');
    return false;
  }

  requiredModules.forEach(function (moduleName) {
    if (options.safeLoad) {
      if (typeof $$global.Array.prototype[moduleName] !== 'undefined') {
        if (!noErrors) throw new ReferenceError(`loadArrayExtenders() failed because ${moduleName} was already defined on the Array prototype`);
        allLoaded = false;
      }
    } else {
      $$global.Array.prototype[moduleName] = function (...args) {
        return moduleData[moduleName].function(this, ...args);
      };
      moduleData[moduleName].loaded = true;
    }
  });

  return allLoaded;
}

export function getLoadResults() {
  const returnObject = {};
  Object.keys(moduleData).forEach(moduleName => returnObject[moduleName] = moduleData[moduleName].loaded);
  return returnObject;
}

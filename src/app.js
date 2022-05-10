var globalThis;

function emptyFunction() {
  return;
}

const emptyArrowFunction = () => { };

if (typeof globalThis === 'undefined') globalThis = this;
if (typeof globalThis.console === 'undefined') globalThis.console = {};
if (typeof globalThis.console.debug === 'undefined') globalThis.console.debug = emptyArrowFunction;

console.debug('This is a place holder, something neat may appear here in the future.');

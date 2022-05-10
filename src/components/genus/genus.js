const loadData = {
  prototypes: {}
};

export function getGenus(object) {
  let genus = object.__genus__;
  if (genus === undefined) genus = Object.prototype.toString.call(object).slice(8, -1);
  if (genus === 'Function') {
    let fName = object.name;
    if (fName === '') fname = 'anonymous';
    if (fName.match(/\(\s?\)\s?\=\>\s?\{\s?\}/) !== null) fname = 'emptyArrow';
    genus = `${fName}()`;
  }
  return genus;
}

export function setGenus(object, genus) {
  if (object.__genus__ !== undefined) throw new TypeError('genus may only be set on an object once');
  if (Object.hasOwn(object, '__genus__') === true) {
    object.__genus__ = genus;
  } else {
    Object.defineProperty(object, '__genus__', { value: genus });
  }
}

export function extendPrototype(...objectArray) {
  const array = (objectArray.length > 0) ? objectArray : [Object];
  array.forEach(function(object) {
    if (object === null || object === undefined) return;
    const targetPrototype = (Object.hasOwn(object, 'constructor')) ? object : object.prototype;
    Object.defineProperty(targetPrototype, 'genus', {
      get() {
        return getGenus(this);
      },
      set(genus) {
        setGenus(this, genus);
      }
    });
    loadData.prototypes[targetPrototype.constructor.name] = true;
  });
}

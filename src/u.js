export function getDeepProp(object, propChain) {
  return propChain.split('.')
    .reduce((obj, prop) => obj[prop] || obj, object);
}

import { words } from './list.js';

export function getDeepProp(object, propChain) {
  return propChain.split('.')
    .reduce((obj, prop) => obj[prop] || obj, object);
}

export function getZh(str) {
  return words[str] || str;
}

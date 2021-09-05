import { words } from './list.js';
import { writable } from 'svelte/store';

export function getDeepProp(object, propChain) {
  return propChain.split('.')
    .reduce((obj, prop) => obj[prop] || obj, object);
}

export function getZh(str) {
  return words[str] || str;
}

export function numSort(a, b) {
  return a - b;
}

export function fetchAssessData(assessData) {
  const loading = writable(false);
  const error = writable(false);
  const data = writable(null);
  // const url = 'https://cors-anywhere.herokuapp.com/https://orna.guide/api/v1/assess';
  const url = 'https://orna.guide/api/v1/assess';

  async function get() {
    loading.set(true);
    error.set(false);
    try {
      const response = await fetch(url, {
        'headers': {
          'accept': '*/*',
          // 'accept-language': 'zh-TW,zh;q=0.9,en;q=0.8',
          'content-type': 'application/x-www-form-urlencoded',
          // 'sec-ch-ua-mobile': '?0',
          // 'sec-fetch-dest': 'empty',
          // 'sec-fetch-mode': 'cors',
          // 'sec-fetch-site': 'cross-site'
        },
        'referrerPolicy': 'strict-origin-when-cross-origin',
        'body': JSON.stringify(assessData),
        'method': 'POST',
        'mode': 'cors',
        // 'credentials': 'omit'
      }).then(res => res.json());
      data.set(response);
    } catch(e) {
      error.set(e);
    }
    loading.set(false);
  }

  get();

  return [ data, loading, error, get];
}


export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

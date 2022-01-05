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

export function createNewFilter(option) {
  return {
    timestamp: +new Date(),
    rule: {
      prop: option.prop,
      value: fixValueType(option.value, option.type),
      type: option.type,
      comparator: '=',
    },
  }
}

function fixValueType(value, type) {
  switch (type) {
    case 'number':
      return +value;
    case 'text':
    default:
      return String(value);
  }
  return value;
}

export function createNewTextFilter(text) {
  return createNewFilter({
    prop: 'name_zh',
    value: text || '',
    type: 'text',
  });
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


export function handleData(itemData, monsterData) {
  const gglist = [
    'name',
    'zh',
    'image',
    'type',
    'element',
    'description',
  ];

  [itemData, monsterData].forEach(data => {
    data.forEach(item => {
      for (let prop in item) {
        if (!item[prop]) {
          delete item[prop];
        } else {
          if (gglist.indexOf(prop) === -1) {
            item[prop] = JSON.parse(item[prop]);
          }
        }
        if (!item.zh) {
          item.zh = item.name;
        }
      }
    })
  });

  let findMonster = (mid) => {
    let monster = monsterData.find(m => m.id === mid);
    return monster ? {
      id: monster.id,
      tier: monster.tier,
      name: monster.name,
      name_zh: monster.zh,
    } : null;
  }
  let findItem = (iid) => {
    let item = itemData.find(i => i.id === iid);
    return item ? {
      id: item.id,
      tier: item.tier,
      name: item.name,
      name_zh: item.zh,
    } : null;
  }

  itemData.forEach(item => {
    item.dropped_by = item.dropped_by?.map(findMonster).sort(sortByTier);
    item.materials = item.materials?.map(findItem).sort(sortByTier);
    item.name_zh = item.zh;
    // delete item.zh;
    item.context = JSON.stringify(item);
  });

  return {
    items: itemData,
    monsters: monsterData,
  };
}

function sortByTier(a, b) {
  return b.tier - a.tier;
}

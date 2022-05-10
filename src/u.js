import { words } from './list.js';
import { writable } from 'svelte/store';

export function getDeepProp(object, propChain) {
  return propChain.split('.')
    .reduce((obj, prop) => obj?.[prop], object);
}

export function getZh(str) {
  return words[str] || str;
}

export function numSort(a, b) {
  return a - b;
}

export function createNewFilter(option, ts) {
  return {
    timestamp: ts || +new Date(),
    rule: {
      prop: option.prop,
      value: fixValueType(option.value, option.type),
      type: option.type,
      comparator: option.comparator || '=',
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
    prop: 'name.zh',
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
      if (response.error) {
        error.set(response);
      } else {
        data.set(response);
      }
    } catch(e) {
      error.set(e);
    }
    loading.set(false);
  }

  get();

  return [ data, loading, error, get ];
}


export function escapeRegExp(string) {
  return `${string}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}


const equipped_by_map = {
  M: 'Mage',
  T: 'Thief',
  W: 'Warrior',
};
export function handleData(items, monsters, spells) {
  let findMonster = (mid) => {
    let monster = monsters.find(m => m.id === mid);
    return monster ? {
      gid: monster.id,
      tier: monster.tier,
      name: monster.name,
      name_zh: monster.zh,
    } : null;
  }
  let findItem = (iid) => {
    let item = items.find(i => i.gid === iid);
    return item ? {
      gid: item.gid,
      oid: item.oid,
      tier: item.tier,
      name: item.name.en,
      name_zh: item.name.zh,
    } : null;
  }

  let materials = {};

  items.forEach(item => {
    if (item.dropped_by) {
      item.dropped_by = item.dropped_by.map(findMonster).sort(sortByTier);
    }
    // item.materials = item.materials?.map(findItem).sort(sortByTier);
    if (item.materials) {
      item.materials.forEach(mid => {
        materials[mid] = materials[mid] || [];
        materials[mid].push(item.gid);
      });
      item.materials = item.materials.map(findItem).sort(sortByTier);
    }
    // item.name_zh = item.zh;
    // delete item.zh;
    if (item.equipped_by) {
      item.equipped_by = item.equipped_by.split('').map(i => equipped_by_map[i]);
    }

    item.context = JSON.stringify(item);
  });

  for (let sourceId in materials) {
    let item = items.find(i => i.gid === +sourceId);
    if (item) {
      item.resource = [...new Set(materials[sourceId])].map(findItem).sort(sortByTier);
    }
  }

  spells = Object.keys(spells).map(spell => {
    return {
      ...spells[spell],
      oid: spell,
    }
  })

  return {
    items: items,
    monsters: monsters,
    spells: spells,
  };
}

function sortByTier(a, b) {
  return b.tier - a.tier;
}

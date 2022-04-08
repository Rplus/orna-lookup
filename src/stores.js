import { writable } from 'svelte/store';
import { getList } from './list.js';
import {
  createNewFilter,
  createNewTextFilter,
  handleData,
} from './u.js';
import { filtersDef } from './filtersDef.js';

export const data = writable({ waiting: true });
export const filterLists = writable({});
export const dialog = writable({
  open: false,
});
export const fixForm = writable({
  open: false,
  item: null,
  props: [],
});

Promise.all(
  [
    './data/item.min.json',
    './data/monster.min.json',
  ]
    .map(url => fetch(url).then( r => r.json() ) )
).then(d => {
  const raw_items = d[0];
  const raw_monsters = d[1];
  let o_data = handleData(raw_items, raw_monsters);

  const items = o_data.items;
  const monsters = o_data.monsters;

  window.ddd = items;

  filterLists.set(getList(items));
  fixForm.set({
    open: false,
    item: null,
    props: [...new Set(items.map(i => Object.keys(i)).flat())],
  })

  let list = getList(items);
  data.set({
    items,
    monsters,
  });
})


let initQuery = new URLSearchParams(location.search);
let initFilter = [...initQuery].map((qs, index) => {
  let def = filtersDef.find(f => f.prop === qs[0]);
  let values = qs[1].split('|');
  let comparator = values?.[1] || '=';
  return !def
    ? null
    : createNewFilter({
        prop: def.prop,
        type: def.type,
        value: values?.[0],
        comparator: decodeURIComponent(comparator),
      }, +new Date() + index);
}).filter(Boolean);


function createFilters() {
  const { subscribe, set, update } = writable(initFilter);

  return {
    subscribe,
    set,
    update,
    add: (filter) => update(arr => {
      arr[arr.length] = filter;
      return arr;
    }),
    remove: (targetTs) => update(arr => {
      let index = arr.findIndex(i => i.timestamp === targetTs);
      if (index !== -1) {
        arr.splice(index, 1);
      }
      return arr;
    }),
    reset: () => set([])
  };
}

export const filters = createFilters();

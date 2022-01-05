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

Promise.all(
  [
    './data/item.json',
    './data/monster.json',
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

  let list = getList(items);
  data.set({
    items,
    monsters,
  });
})


let initQuery = new URLSearchParams(location.search);
let initFilterDef = filtersDef.find(filter => initQuery.get(filter.prop));
let initFilter = initFilterDef ? createNewFilter({
    prop: initFilterDef.prop,
    type: initFilterDef.type,
    value: initQuery.get(initFilterDef.prop),
  }) : createNewTextFilter('');

function createFilters() {
  const { subscribe, set, update } = writable([initFilter]);

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

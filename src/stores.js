import { writable } from 'svelte/store';
import { getList } from './list.js';
import { createNewFilter, createNewTextFilter } from './u.js';
import { filtersDef } from './filtersDef.js';

export const data = writable({ waiting: true });
export const filterLists = writable({});
export const dialog = writable({
  open: false,
});

fetch(`raw-data/item.added.min.json`)
.then(r => r.json())
.then(d => {
  d = d
    .filter(Boolean)
    .map(i => {
      i.context = JSON.stringify(i);
      i.equipped_by = i.equipped_by?.map(i => i?.name);
      return i;
    });

  filterLists.set(getList(d));

  window.d = d;

  data.set(d);
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

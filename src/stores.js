import { writable } from 'svelte/store';
import { getList } from './list.js';

export const data = writable({ waiting: true });
export const filterLists = writable({});
// export const filters = writable([]);
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

function createFilters() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    // add: (n) => update(arr => arr.push(n)),
    add: (n, rule = null) => update(arr => {
      arr[arr.length] = {
        timestamp: n.timestamp,
        rule,
      };
      return arr;
    }),
    update: (n, rule) => update(arr => {
      let index = arr.findIndex(i => i.timestamp === n);
      arr[index].rule = rule;
      return arr;
    }),
    remove: (n) => update(arr => {
      let index = arr.findIndex(i => i.timestamp === n);
      if (index !== -1) {
        arr.splice(index, 1);
      }
      return arr;
    }),
    reset: () => set([])
  };
}

export const filters = createFilters();

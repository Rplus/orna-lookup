import { writable } from 'svelte/store';

export const data = writable({ waiting: true });
export const filterLists = writable({});
// export const filters = writable([]);

fetch(`raw-data/item.min.json`)
.then(r => r.json())
.then(d => {
  d = d
    .filter(Boolean)
    .map(i => {
      i.context = JSON.stringify(i);
      i.equipped_by = i.equipped_by?.map(i => i?.name);
      return i;
    });

  filterLists.set({
    types: [...new Set(d.map(i => i.type))],
    tiers: [...new Set(d.map(i => i.tier))],
    equipped_by: [...new Set(d.map(i => i.equipped_by).flat().filter(Boolean))],
  });

  data.set(d);
})

function createFilters() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    // add: (n) => update(arr => arr.push(n)),
    add: (n) => update(arr => {
      arr[arr.length] = {
        timestamp: n.timestamp,
        rules: null,
      };
      return arr;
    }),
    update: (n, rules) => update(arr => {
      let index = arr.findIndex(i => i.timestamp === n);
      arr[index].rules = rules;
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

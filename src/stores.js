import { writable } from 'svelte/store';

export const data = writable({ waiting: true });
export const filters = writable([]);

fetch(`raw-data/item.min.json`)
.then(r => r.json())
.then(d => {
  data.set(d);
})


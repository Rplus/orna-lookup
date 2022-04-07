import fs from 'fs';
import fetch from 'node-fetch';
import { saveCSV, outputJSON, getArgs } from './u.mjs';

let data = fs.readFileSync('./test.json', 'utf8');
data = JSON.parse(data);

let all_props = [...new Set(data.map(i => Object.keys(i)).flat())];

console.log(all_props);
data.forEach(i => {
  all_props.forEach(p => {
    if (!i[p]) {
      console.log(i, p);
    }
  });

  ['title', 'intro'].forEach(p => {
    if (!i[p].en || !i[p].zh) {
      console.log(i.uid, p);
    }
  });

  if (!Object.keys(i.metas).length) {
    // console.log('leek metas:', i.uid);
  }
})

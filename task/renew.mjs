// 把 data 資料再處理後轉成 CSV 以供上傳批次更新
// 每次目的或許不一

import fs from 'fs';
import csv from 'csvtojson';
import csvOptions from './csvOptions.mjs';
import { saveCSV, outputJSON, getArgs } from './u.mjs';

var args = getArgs();

let type = (args?.type || 'item');
let data = fs.readFileSync(`./public/data/${type}.min.json`, 'utf8');
data = JSON.parse(data);

let new_data = fs.readFileSync(`./task/items/upload/data-with-slots.json`, 'utf8');
new_data = JSON.parse(new_data);
new_data = new_data.filter(Boolean);

data = handleData(data);

saveCSV(data, `./task/items/upload/${type}-to-upload.csv`,
  csvOptions[type] || csvOptions.defalt
);

console.log('saveCSV');

function handleData(ddd) {
  ddd.forEach(_d => {
    let new_d = new_data.find(i => i.id === _d.id);
    if (!new_d) { return; }

    if (new_d.slots) {
      _d.slots = new_d.slots;
    }
    if (new_d.other) {
      _d.other_effect = new_d.other;
    }
  });

  return ddd;
}

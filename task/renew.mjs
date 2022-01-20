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

let new_data = fs.readFileSync(`./task/items/two_handed_skill.json`, 'utf8');
new_data = JSON.parse(new_data);

data = handleData(data);

let date = new Date().toISOString().slice(0, 10);
saveCSV(data, `./task/items/upload/${type}-to-upload-${date}.csv`,
  csvOptions[type] || csvOptions.defalt
);

console.log('saveCSV');

function handleData(_data) {
  new_data.two_handed.forEach(id => {
    let target = _data.find(item => item.id === id);
    target.two_handed = 1;
  });

  new_data.skill.forEach(d => {
    let target = _data.find(item => item.id === d.id);
    target.other_effect = target.other_effect || [];
    target.other_effect.push(`技能: ${d.s}`);
  });

  return _data;
}

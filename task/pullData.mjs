import fs from 'fs';
import fetch from 'node-fetch';
import csv from 'csvtojson';
import csvOptions from './csvOptions.mjs';
import { saveCSV, outputJSON, getArgs } from './u.mjs';


getData('monster.json').then(d => {
  outputJSON(d, './public/data/raw/monster.raw.json');
  d = clearData(d);
  outputJSON(d, './public/data/raw/monster.src.json');
  outputJSON(d, './public/data/monster.min.json', null);
});

getData('skill.json').then(d => {
  outputJSON(d, './public/data/raw/skill.raw.json');
  d = clearData(d);
  outputJSON(d, './public/data/raw/skill.src.json');
  outputJSON(d, './public/data/skill.min.json', null);
});

getData('item.json').then(d => {
  outputJSON(d, './public/data/raw/item.raw.json');
  d = clearData(d);
  outputJSON(d, './public/data/raw/item.src.json');
  outputJSON(d, './public/data/item.min.json', null);

  var lite = d.map(i => {
    var {id, name, zh, tier, image} = i;
    return {id, name, zh, tier, image};
  });
  outputJSON(lite, './public/data/raw/item-lite.src.json');
  outputJSON(lite, './public/data/item-lite.min.json', null);
});

function clearData(data) {
  const gglist = [
    'name',
    'zh',
    'image',
    'type',
    'element',
    'description',
    // 'other_effect',
  ];

  data.forEach(item => {
    for (let prop in item) {
      if (!item[prop]) {
        delete item[prop];
      } else {
        if (gglist.indexOf(prop) === -1) {
          item[prop] = JSON.parse(item[prop]);
        }
      }
      if (!item.zh) {
        item.zh = item.name;
      }
    }
  });
  return data;
}

function getData(tab = 'item.josn') {
  return fetch(`https://opensheet.elk.sh/1JZM_9U7hYtq39T0BeZHaUrJVKSWWNfxLxcZnrJPiHBQ/${tab}`).then(r => r.json());
}

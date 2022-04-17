import fs from 'fs';
import fetch from 'node-fetch';
import csv from 'csvtojson';
import csvOptions from './csvOptions.mjs';
import { saveCSV, outputJSON, getArgs } from './u.mjs';

let type = getArgs()?.type;
let newer = getArgs()?.newer;

const dataTypes = [
  'item',
  'skill',
  'monster',
  'pet',
];

dataTypes
  .filter(i => !type || i === type)
  .forEach(i => doType(i))

function doType(type, min = true, stoploop) {
  getData(`${type}.json`).then(d => {
    outputJSON(d, `./public/data/raw/${type}.raw.json`);
    d = clearData(d);
    outputJSON(d, `./public/data/raw/${type}.src.json`);
    if (min) {
      outputJSON(d, `./public/data/${type}.min.json`, null);
    }
  });

  if (newer && !stoploop) {
    doType(`${type}-newer`, false, true);
  }
}

function clearData(data) {
  const gglist = [
    'name',
    'zh',
    'image',
    'type',
    'element',
    'description',
    'rarity',
    'category',
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

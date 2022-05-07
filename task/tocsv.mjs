import fs from 'fs';
import csv from "csvtojson";
import csvOptions from './csvOptions.mjs';
import { saveCSV, outputJSON, getArgs } from './u.mjs';

var args = getArgs();

let type = (args?.type || 'item');
let data = fs.readFileSync(`./public/raw-data/${type}.json`, 'utf8');

let lang = [];

let zh = await Promise.all([
  'orna-archetypes-zh_Hant_3.csv',
  'orna-base-zh_Hant_3.csv',
  'orna-app-zh_Hant.csv',
  'orna-content-zh_Hant.csv',
  'app.po.csv',
  'archetypes.po.csv',
  'base.po.csv',
  'zh_Hant.po.csv',
  'content.po.csv',
].map( fn => csv().fromFile(`./task/items/zh-tw/${fn}`) ));
zh = zh.flat();

data = clearData(data);

saveCSV(data, `./public/raw-data/${type}.json.csv`,
  csvOptions[type] || csvOptions.defalt
);

// saveCSV(lang, `./public/raw-data/${type}.lang.csv`, csvOptions.defalt);

function findZh(en) {
  let str = zh.find(i => i.source.toLowerCase() === en.toLowerCase())?.target;
  if (!str) {
    // 同名裝備
    if (en.match(/(.+)( \[\w+\])$/)) {
      let m = en.match(/(.+)( \[\w+\])$/);
      let _str = findZh(m[1]);
      if (!_str) { return; }
      str = _str + m[2];
    }

    // 重生的
    if (en.match(/Arisen (.+)$/)) {
      let m = en.match(/Arisen (.+)$/);
      let _str = findZh(m[1]);
      if (!_str) { return; }
      str = '重生的' + _str;
    }
  }
  return str || '';
}

function clearData(dd) {
  dd = JSON.parse(dd.replace(';', ',')).filter(Boolean);
  dd.forEach(_d => {
    // delete _d.description;
    let zh = findZh(_d.name);
    _d.zh = zh;

    let langObj = {
      id: _d.id,
      en: _d.name,
      zh,
    };

    if (_d.category) {
      _d.category = _d.category.toLowerCase();
    }

    if (_d.description) {
      langObj.info = _d.description;
      langObj.info_zh = findZh(_d.description);
    }

    lang.push(langObj);

    // array retrun items' name
    [
      // item
      'equipped_by',
    ].forEach(prop => {
      if (_d[prop]) {
        _d[prop] = _d[prop].map(i => i.name);
      }
    });

    // array retrun items' id
    [
      'dropped_by',
      'materials',
      'drops',
      'skills',
      'buffs',

      // skill
      'buffed_by',
      'pets_use',
      'monsters_use',
    ].forEach(prop => {
      if (_d[prop]) {
        _d[prop] = _d[prop].map(i => i.id);
        // console.log(123, _d[prop]);
      }
    });

    // transform boolean
    [
      // item
      'boss',
      'arena',
      // 'view_distance',

      // skill
      'is_magic',
      'bought',

    ].forEach(prop => {
      if (_d[prop] !== undefined) {
        _d[prop] = _d[prop] ? 1 : null;
      }
    });
  });
  return dd;
}

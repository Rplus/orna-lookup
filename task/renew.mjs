// 把 data 資料再處理後轉成 CSV 以供上傳批次更新
// 每次目的或許不一

import fs from 'fs';
import csv from 'csvtojson';
import csvOptions from './csvOptions.mjs';
import { saveCSV, outputJSON, getArgs } from './u.mjs';

var args = getArgs();

let type = (args?.type || 'item');
let data = fs.readFileSync(`./public/data/${type}.json`, 'utf8');
data = JSON.parse(data);

let skillH = await csv().fromFile(`./task/items/zh-tw/skill_hiddeninfo.csv`);

outputJSON(skillH, './task/items/upload/skillH.json', 2);

// console.log(skillH);

data = handleData(data);

saveCSV(data, `./task/items/upload/${type}-to-upload.csv`,
  csvOptions[type] || csvOptions.defalt
);

console.log('saveCSV');

function handleData(ddd) {
  ddd.forEach(_d => {
    if (type === 'skill') {
      // 加入 hidden info 中的技能傷害因子
      let _s = skillH.find(i => i.Skill === _d.name);
      if (_s) {
        _d.m1 = _s.M1;
        _d.m2 = {
          max: _s.M2.max,
          min: _s.M2.min,
        };
        _d.turns = _s.Turns;
        _d.ward = _s.Ward;
        _d.hp = _s.HP;
        _d.strikes = _s.Strikes;
        _d.crit = +_s.crit || null;
      }
    }
  });

  return ddd;
}

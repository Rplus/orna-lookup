import fs from 'fs';
import converter from 'json-2-csv';
import csv from "csvtojson";

var args = process.argv.slice(2).reduce((all, i) => {
  let pair = i.split('=');
  all[pair[0]] = pair[1];
  return all;
}, {})

let fileName = args?.filename || 'item.json';
let data = fs.readFileSync(`./public/raw-data/${fileName}`, 'utf8');

let lang = [];

let zh = await Promise.all([
  'orna-app-zh_Hant.csv',
  'orna-archetypes-zh_Hant.csv',
  'orna-base-zh_Hant.csv',
  'orna-content-zh_Hant.csv',
].map( fn => csv().fromFile(`./task/items/zh-tw/${fn}`) ));
zh = zh.flat();

data = clearData(data);

saveCSV(data, `./public/raw-data/${fileName}.csv`, {
  emptyFieldValue: '',
  excludeKeys: ['description'],
  keys: [
    'id',
    'name',
    'tier',
    'type',

    'boss',
    'arena',
    'view_distance',

    'equipped_by',

    'element',

    { field: 'stats.attack.base', title: 'stats.attack', },
    { field: 'stats.magic.base', title: 'stats.magic', },
    { field: 'stats.defense.base', title: 'stats.defense', },
    { field: 'stats.resistance.base', title: 'stats.resistance', },
    { field: 'stats.dexterity.base', title: 'stats.dexterity', },
    { field: 'stats.crit.base', title: 'stats.crit', },
    { field: 'stats.ward.base', title: 'stats.ward', },
    { field: 'stats.hp.base', title: 'stats.hp', },
    { field: 'stats.mana.base', title: 'stats.mana', },

    'prevents',
    'causes',
    'cures',
    'gives',

    'dropped_by',
    'materials',

    'quests',
    'image',
  ],
});

saveCSV(lang, `./public/raw-data/item.lang.csv`, {
  emptyFieldValue: '',
})

function findZh(en) {
  let str = zh.find(i => i.source === en)?.target;
  if (!str) {
    let m = en.match(/(.+)( \[\w+\])$/);
    if (!m) { return; }

    let _str = findZh(m[1]);
    if (!_str) { return; }

    str = _str + m[2];
  }
  return str || '';
}

function clearData(dd) {
  dd = JSON.parse(dd.replace(';', ',')).filter(Boolean);
  dd.forEach(_d => {
    // delete _d.description;

    lang.push({
      id: _d.id,
      en: _d.name,
      zh: findZh(_d.name),
      info: _d.description || null,
      info_zh: _d.description && findZh(_d.description),
    });

    if (_d.equipped_by) {
      _d.equipped_by = _d.equipped_by.map(i => i.name)
    }
    if (_d.dropped_by) {
      _d.dropped_by = _d.dropped_by.map(i => i.id)
    }
    if (_d.materials) {
      _d.materials = _d.materials.map(i => i.id)
    }
    _d.boss = _d.boss ? 1 : null;
    _d.arena = _d.arena ? 1 : null;
    _d.view_distance = _d.view_distance ? 1 : null;
  });
  return dd;
}

function saveCSV(data, fn, option) {
  converter.json2csvAsync(data, option)
    .then((d) => {
      fs.writeFile(fn, d, function(err) {
        if (err) throw err;
        console.log('file saved', fn);
      });
    })
    .catch((err) => console.log('ERROR: ' + err.message));
}

function outputJSON(json = {}, fileName, jsonSpace = 2) {
  let fileContent = JSON.stringify(json, null, jsonSpace);
  fs.writeFileSync(fileName, fileContent);
  console.log(`JSON saved as ${fileName}! ( ${fileContent.length / 1000} kb )`);
};

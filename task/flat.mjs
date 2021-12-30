import fs from 'fs';
import converter from 'json-2-csv';
import csv from "csvtojson";

var args = process.argv.slice(2).reduce((all, i) => {
  let pair = i.split('=');
  all[pair[0]] = pair[1];
  return all;
}, {})

let type = (args?.type || 'item');
let data = fs.readFileSync(`./public/raw-data/${type}.json`, 'utf8');

let lang = [];

let zh = await Promise.all([
  'orna-app-zh_Hant.csv',
  'orna-archetypes-zh_Hant.csv',
  'orna-base-zh_Hant.csv',
  'orna-content-zh_Hant.csv',
].map( fn => csv().fromFile(`./task/items/zh-tw/${fn}`) ));
zh = zh.flat();

data = clearData(data);

const csvOptions = {
  defalt: {
    emptyFieldValue: '',
  },
  item: {
    emptyFieldValue: '',
    excludeKeys: ['description'],
    keys: [
      'id',
      'name',
      'zh',
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
  },
  monster: {
    emptyFieldValue: '',
    keys: [
      'id',
      'name',
      'zh',
      'tier',
      'level',
      'boss',

      'buffs',
      'spawns',

      'weak_to',
      'immune_to',
      'resistant_to',

      'immune_to_status',
      'vulnerable_to_status',

      'skills',
      'drops',

      'quests',
      'image',
    ],
  },
  skill: {
    emptyFieldValue: '',
    keys: [
      'id',
      'name',
      'zh',
      'tier',

      'type',
      'element',
      'is_magic',

      'bought',
      'cost',
      'mana_cost',

      'cures',
      'gives',
      'causes',

      'buffed_by',
      'pets_use',
      'monsters_use',
      'learned_by',

      'description',
    ],
  },
};

saveCSV(data, `./public/raw-data/${type}.json.csv`,
  csvOptions[type] || csvOptions.defalt
);

saveCSV(lang, `./public/raw-data/${type}.lang.csv`, csvOptions.defalt);

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
    let zh = findZh(_d.name);
    _d.zh = zh;

    let langObj = {
      id: _d.id,
      en: _d.name,
      zh,
    };

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
      'view_distance',

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

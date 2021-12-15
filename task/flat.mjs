import fs from 'fs';
import converter from 'json-2-csv';

var args = process.argv.slice(2).reduce((all, i) => {
  let pair = i.split('=');
  all[pair[0]] = pair[1];
  return all;
}, {})

// let fileName = 'item.added.json';
let fileName = args?.filename || 'item.added.json';
let data = fs.readFileSync(`./public/raw-data/${fileName}`, 'utf8');

data = clearData(data);

converter.json2csvAsync(data, {
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
})
  .then((d) => {
    fs.writeFile(`./public/raw-data/${fileName}.csv`, d, function(err) {
      if (err) throw err;
      console.log('file saved');
    });
  })
  .catch((err) => console.log('ERROR: ' + err.message));

function clearData(dd) {
  dd = JSON.parse(dd.replace(';', ',')).filter(Boolean);
  dd.forEach(_d => {
    // delete _d.description;

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

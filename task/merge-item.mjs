import fs from 'fs';
import { saveCSV, outputJSON, getArgs } from './u.mjs';

let o_items = readJSON(`./task/orna_log/fit.items.json`);
let o_spells = readJSON(`./task/orna_log/fit.spells.json`);
let o_monsters = readJSON(`./task/orna_log/fit.monsters.json`);
let g_items = readJSON(`./public/data/raw/item.src.json`);
let g_monsters = readJSON(`./public/data/raw/monster.src.json`);

let log = {
  error: [],
};
let offHandSpells = {};

let all_props_of_o = [...new Set(o_items.map(i => Object.keys(i)).flat())]
let all_props_of_o_meta = [...new Set(o_items.map(i => Object.keys(i.meta)).flat())]
let all_props_of_g = [...new Set(g_items.map(i => Object.keys(i)).flat())]

  // console.log({all_props_of_o});
  // [ "uid", "tier", "img", "title", "intro", "meta" ]

  // console.log({all_props_of_o_meta});
  // [ "stats", "element", "tags", "ability", "immunities", "causes", "gives", "cures", "materials", "dropped", ]

  // console.log(all_props_of_g);
  // [ "id", "name", "zh", "tier", "type", "equipped_by", "image", "rarity", "description", "arena", "category", "stats.attack", "dropped_by", "materials", "cures", "quests", "other_effect", "view_distance", "gives", "stats.magic", "causes", "stats.defense", "stats.ward", "two_handed", "boss", "element", "slots", "stats.dexterity", "stats.mana", "stats.crit", "stats.resistance", "stats.hp", "prevents"]

  // hotfix for strange same name items
  let o_uid_map ={
    // "Mage's Ring": 'mystics-ring', // old item, just remove it
    "Dawnbreaker [sword]": 'dawnbreaker-29962248',
    "Dawnbreaker [bow]": 'dawnbreaker',
    "Dawnbreaker [staff]": 'dawnbreaker-93ca602e',
    "Duskbreaker [sword]": 'duskbreaker-ec7a531c',
    "Duskbreaker [bow]": 'duskbreaker-ef96cc6a',
    "Duskbreaker [staff]": 'duskbreaker',
    "Daybreak [bow]": 'daybreak',
    "Nightbreak [staff]": 'nightbreak-71e7e93d',
    "Daybreak [staff]": 'daybreak-187acb44',
    "Daybreak [sword]": 'daybreak-63f01d22',
    "Nightbreak [bow]": 'nightbreak',
    "Nightbreak [sword]": 'nightbreak-9492da49',
    "Excalibur [mimic]": 'excalibur',
    "Excalibur": 'excalibur-32be53bc',
    "Carl's Ring [Mimic]": 'carls-ring-646f22f4',
  };

let new_items = g_items.map(g_item => {
  let item = {
    gid: g_item.id,
    oid: null,
    name: {},
  };
  let matched_o_uid = o_uid_map[g_item.name];
  let o_item = o_items.find(i => {
    if (matched_o_uid) {
      return i.uid === matched_o_uid;
    }
    return (
      i.tier === g_item.tier &&
      i.title.en.toLowerCase() === g_item.name.toLowerCase()
    );
  });

  // en
  if (!o_item) {
    log.en = log.en || [];
    log.en.push(g_item.name);
    return item;
  }
  item.oid = o_item.uid;
  item.name.en = g_item.name;

  // zh
  if (g_item.zh !== o_item.title.zh) {
    log.zh = log.zh || [];
    log.zh.push(g_item.name);
  }
  item.name.zh = o_item.title.zh;
  item.tier = o_item.tier;
  item.img = o_item.img;

  if (o_item.meta) {
    item.stats = o_item.meta.stats;
  } else {
    let errorMsg = `no meta: ${o_item.uid}`;
    console.error(errorMsg);
    log.error.push(errorMsg);
  }
  item.intro = o_item.intro;

  [
    'stats',
    'element',
    'tags',
    'ability',
    'immunities',
    'causes',
    'gives',
    'cures',
  ].forEach(prop => {
    if (o_item.meta[prop]) {
      item[prop] = o_item.meta[prop];
    }
  });

  // link spell to orna spell page
  if (item.ability) {
    let spell = o_spells.data
      .find(spell =>
        (spell.title.en === item.ability.spell) &&
        (spell.tags?.includes('off-hand'))
      );
    if (!spell) {
      console.error(item.oid, item.ability.spell);
      log.error.push(`can't find off-hand spell: ${item.oid} - ${item.ability.spell}`)
    } else if (!offHandSpells[spell.uid]) {
      offHandSpells[spell.uid] = {
        name: {
          en: spell.title.en,
          zh: spell.title.zh,
        },
        intro: item.ability.intro,
      }
    }
    item.ability = spell.uid;
  }

  if (o_item.meta?.materials) {
    item.materials = o_item.meta.materials.map(m_uid => {
      let om_name = get_o_item_name(m_uid);
      let gm = get_g_item_by_name(om_name);
      return gm?.id;
    });
  }

  // get guide data
  [
    'type',
    'category',
    'arena',
    'boss',
    'two_handed',
    'view_distance',
    'rarity',
    'other_effect',
    'slots',
    'dropped_by',
  ].forEach(prop => {
    if (g_item[prop]) {
      item[prop] = g_item[prop];
    }
  });

  if (item.stats?.['adornment slots']) {
    item.basic_slots = item.stats['adornment slots'];
    delete item.stats['adornment slots']
  }

  if (g_item.equipped_by) {
    item.equipped_by = g_item.equipped_by.map(i => i[0]).join('')
  }

  if (item.ability) {
    item.other_effect = item.other_effect?.filter(i => !i.startsWith('技能:')) || [];
    let spell = offHandSpells[item.ability];
    item.other_effect.unshift(`技能: ${spell.name.zh}`);
  }

  if (item.gives) {
    item.gives = item.gives.map(eff => eff[0]);
  }



    // 'quests',


  // we use guide data here,
  // orna data don't contain past monsters
  if (o_item.meta?.dropped) {
  }


  return item;
});

new_items = new_items.filter(i => i.oid);

function get_g_item_by_name(name) {
  let item = g_items.find(i => i.name.toLowerCase() === name.toLowerCase());
  if (!item) {
    let errorMsg = `cant match g_item name: ${item}`;
    console.error(errorMsg);
    log.error.push(errorMsg);
  }
  return item;
}

function get_o_item_name(uid) {
  let item = o_items.find(i => i.uid === uid)?.title.en.toLowerCase();
  if (!item) {
    let errorMsg = `cant match o_item uid: : ${item}`;
    console.error(errorMsg);
    log.error.push(errorMsg);
  }
  return item;
}

function readJSON(path) {
  let ctx = fs.readFileSync(path, 'utf8');
  return JSON.parse(ctx);
}

let outputData = {
  item: new_items,
  spells: offHandSpells,
};
outputJSON(outputData, `./public/data/raw/merged_items.intro.src.json`);
outputJSON(outputData, `./public/data/merged_items.intro.min.json`, '', 0);
outputJSON(log, `./task/items/merged_items.log.json`);

let outputData2 = {
  item: new_items.map(i => {
    delete i.intro;
    return i;
  }),
  spells: offHandSpells,
};
outputJSON(outputData2, `./public/data/raw/merged_items.src.json`);
outputJSON(outputData2, `./public/data/merged_items.min.json`, '', 0);

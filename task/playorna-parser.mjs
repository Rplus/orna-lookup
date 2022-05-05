import fs from 'fs';
import { parse, NodeType } from 'node-html-parser';
import { outputJSON, getArgs } from './u.mjs';
import { parseCategory, cleanData, allCategory } from './playorna-parser-ults.mjs';

var args = getArgs();

let type = (args?.type || allCategory[5]);

const filename = `./task/orna_log/raw.${type}.json`;
const langs = ['en', 'zh-hant'];
let lang = langs[0];
let log = [];

let opData = {};
// let effectIcons = {};
let fileData;
let fitFns = {};


let imgMap = {};
let imgMapPath = './task/orna_log/fit.img-map.json';
try {
  // fs.unlinkSync(filename);
  imgMap = fs.readFileSync(imgMapPath, 'utf8');
  imgMap = JSON.parse(imgMap);
} catch (err) {
  outputJSON(imgMap, imgMapPath);
  console.error(err);
}
let saveTimer;
function saveImgData() {
  if (saveTimer) {
    // clearTimeout(saveTimer);
    // saveTimer = null;
    return;
  }
  saveTimer = setTimeout(() => {
    outputJSON(imgMap, imgMapPath);

    clearTimeout(saveTimer);
    saveTimer = null;
  }, 3000);
}



// dev
// console.log(NodeType);

console.log({type});


fitFns.monsters = function (data) {
  let imgs = {s: {}, i: {}};
  data.forEach(raid => {
    if (!raid.meta) { return; }

    if (raid.meta.tags?.length) {
      raid.meta.tags = raid.meta.tags.map(t => t.split(',')).flat().map(i => i.replace('✓ ', ''));
    }

    if (raid.meta.abilities?.length) {
      raid.meta.abilities = raid.meta.abilities.map(spell => {
        let uid = spell.url.match(/([^/]+)\/$/)[1];
        imgs.s[uid] = [spell.txt, spell.img];
        addImg('spell', uid, spell.img);
        return uid;
      });
    }

    if (raid.meta.drops?.length) {
      raid.meta.drops = raid.meta.drops.map(item => {
        let uid = item.url.match(/([^/]+)\/$/)[1];
        imgs.i[uid] = [item.txt, item.img];
        addImg('item', uid, item.img);
        return uid;
      });
    }
  });

  return data;
}

fitFns.raids = fitFns.monsters;
fitFns.bosses = fitFns.monsters;

fitFns.followers = function (data) {
  let imgs = {};
  data.forEach(follower => {
    if (!follower.meta?.abilities) { return;}

    follower.meta.abilities = follower.meta.abilities.map(ability => {
      if (!ability.url.includes('codex/spells')) {
        console.log(ability.url);
      }
      let uid_s = ability.url.match(/([^/]+)\/$/)[1];
      imgs[uid_s] = [ability.txt, ability.img];
      addImg('ability', uid_s, ability.img);

      return uid_s;
    })
  });

  return data;
}

fitFns.spells = function (data) {
  let tags = [...new Set(data.map(i => i.meta?.tags).flat().filter(Boolean))];
  console.log({tags});
  // [ '✓ Off-hand ability', '✓ Found in Arcanists' ]
  let tagsMap = {
    '✓ Off-hand ability': 'Off-hand',
    '✓ Found in Arcanists': 'Arcanists',
  };

  let imgs = {};
  data.forEach(spell => {
    if (spell.meta?.tags) {
      spell.meta.tags = spell.meta.tags.map(t => tagsMap[t]);
    }
    ['causes', 'gives'].forEach(p => {
      if (!spell.meta[p]) { return; }
      spell.meta[p] = spell.meta[p].map(effect => {
        let rate = +effect.txt.match(/\d+/)[0];
        let txt = effect.txt.split(' (')[0];
        imgs[txt] = effect.img;
        addImg('effect', txt, effect.img);
        return [txt, rate];
      });
    })
  });
  return data;
}




//////////
//////////
//////////



if (args.parse) {
  parseCategory(type);

} else {
  try {
    // fs.unlinkSync(filename);
    fileData = fs.readFileSync(filename, 'utf8');
    fileData = JSON.parse(fileData);
  } catch (err) {
    console.error(err);
  }
  // fileData = fileData.slice(-3);

  // merge monsters
  let monsterTypes = ['monsters', 'raids', 'bosses',];
  if (monsterTypes.includes(type)) {
    let mData = {};
    try {
      monsterTypes.forEach(_t => {
        mData[_t] = fs.readFileSync(`./task/orna_log/raw.${_t}.json`, 'utf8');
        mData[_t] = JSON.parse(mData[_t]);
        mData[_t].forEach(m => {
          m.type = _t;
        });
      })
    } catch (err) {
      console.error(err);
    }
    fileData = Object.values(mData).flat();
  }

  fileData = cleanData(fileData);
  outputJSON(fileData, `./task/orna_log/dev.${type}.json`);

  let props = [...new Set(fileData.map(i => Object.keys(i.meta)).flat())];
  console.log({props});

  if (fitFns[type]) {
    fileData = fitFns[type](fileData);
  }

  outputJSON(fileData, `./task/orna_log/fit.${type}.json`);
}


function addImg(type, uid, src) {
  if (!imgMap[type]) {
    imgMap[type] = {};
  }
  imgMap[type][uid] = src;
  saveImgData();
}

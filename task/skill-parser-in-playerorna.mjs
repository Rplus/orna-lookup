import fs from 'fs';
import fetch from 'node-fetch';
import chalk from 'chalk';
import { parse } from 'node-html-parser';
import { saveCSV, outputJSON, getArgs } from './u.mjs';

const filename = './codex-skill/src/orna-skills.json';
const langs = ['en', 'zh-hant'];
let lang = langs[0];
let log = [];

let data = [];
let effectIcons = {};
let fileData;
let skillSources = {
  '✓ Found in Arcanists': 'arcanists',
  '✓ Off-hand ability': 'off-hand',
};


try {
  fs.unlinkSync(filename);
  fileData = fs.readFileSync(filename, 'utf8');
  fileData = JSON.parse(fileData);
} catch (err) {
  console.error(err);
}

if (fileData) {
  data = fileData;
  parseSkills();
} else {
  parseList(1);
}



///
///
///



function parseList(page) {
  console.log(`Start parsing: #${page}`);
  fetch(`https://playorna.com/codex/spells/?p=${page}`, getHeader())
  .then(res => res.text())
  .then(d => {
    let html = parse(d);
    let items = html.querySelectorAll('.codex-entries > a.codex-entries-entry');

    items.forEach(elm => {
      let link = elm.getAttribute('href');
      let uid = link.split('/').filter(Boolean).pop();
      let img = elm.querySelector('img')?.getAttribute('src').replace('https://playorna.com/static/img/', '');
      let title = {
        en: elm.querySelectorAll('div')[1].textContent.trim(),
      };
      let tier = +elm.querySelectorAll('div')[2].textContent.match(/\d+/)[0];
      data.push({ uid, tier, img, title, });
    });


    //
    let paginations = html.querySelectorAll('.pagination > .button');
    if (paginations) {
      let nextPage = paginations.map(btn => {
        let _href = btn.getAttribute('href');
        let _page = _href.match(/\d+/)[0];
        let _next = +_page > +page;
        return _next && _page;
      }).filter(Boolean)[0];

      if (nextPage) {
        parseList(nextPage);
      } else {
        saveData();
        console.log(`End parsing at #${page}`);
        parseSkills();
      }
    }
  });
}

function parseSkills() {
  data.forEach((item, index) => {
    let t = (~~(index / 10)) * 1500;
    setTimeout(() => {
      parseSkill(item.uid);
    }, t);
  })
}

function parseSkill(uid, _lang = lang) {
  console.log(`Start parsing skill: ${uid}, ${_lang}`);
  fetch(`https://playorna.com/codex/spells/${uid}/`, getHeader(_lang))
  .then(res => res.text())
  .then(d => {
    let html = parse(d);
    let title = html.querySelector('.herotext').textContent.trim();
    let intro = html.querySelector('.codex-page-description').textContent.trim();
    let meta = html.querySelector('.codex-page-meta');
    let metas = getNextSiblings(meta).map(elm => ({
      tag: elm.tagName,
      content: elm.textContent.trim(),
      icon: elm.querySelector('img')?.getAttribute('src').replace('https://playorna.com/static/img/', ''),
    }));
    updateData({
      uid, title, intro, metas, _lang,
    });

    // -r
    if (_lang !== langs[1]) {
      parseSkill(uid, langs[1]);
    }
  });
}

function updateData(opt) {
  let index = data.findIndex(i => i.uid === opt.uid);
  if (index === -1) {
    console.error(`no match with ${uid}`);
    return;
  }
  let _lang = opt._lang.split('-')[0];

  data[index].title = data[index].title || {};
  data[index].title[_lang] = opt.title;

  data[index].intro = data[index].intro || {};
  data[index].intro[_lang] = opt.intro;
  if (opt._lang === langs[0]) {
    let metas = {};
    let h4;
    opt.metas.forEach(i => {
      if (i.tag === 'HR') { return; }
      if (i.content.indexOf('✓') !== -1) {
        data[index].tags = [...new Set(
          [...(data[index].tags || []), skillSources[i.content]]
        )]
        return;
      }
      if (i.tag === 'H4') {
        h4 = i.content.replace(':', '').toLocaleLowerCase();
      } else if (h4) {
        let effect = i.content.match(/(.+) \((\d+)\%\)/);
        metas[h4] = metas[h4] || {};
        metas[h4][effect[1]] = +effect[2] / 100;

        effectIcons[effect[1]] = i.icon;
      }
    });

    data[index].metas = metas;
  }
  saveData();
}

function getNextSiblings(node) {
  var ret = [];
  while (node = node.nextElementSibling) {
    ret.push(node);
  }
  return ret;
}

function getHeader(_lang = lang) {
  return {
    headers: {
      cookie: `ornalang=${_lang}`
    }
  }
}

let saveTimer;
function saveData() {
  if (saveTimer) {
    // clearTimeout(saveTimer);
    // saveTimer = null;
    return;
  }
  saveTimer = setTimeout(() => {
    let obj = {
      skills: data,
      icons: effectIcons,
    };
    outputJSON(obj, filename);
    outputJSON(obj, filename.replace('.json', '.min.json'), 0);

    clearTimeout(saveTimer);
    saveTimer = null;
  }, 3000);
}

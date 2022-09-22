// import fs from 'fs';
import fetch from 'node-fetch';
import chalk from 'chalk';
import { parse } from 'node-html-parser';
import { saveCSV, outputJSON, getArgs } from './u.mjs';

let data = [];
let logFile = './task/orna_log/';
let langs = ['en', 'zh-hant'];
let defaultLang = langs[0];

export const allCategory = [
  /* 0 */ 'spells',
  /* 1 */ 'items',
  /* 2 */ 'monsters',
  /* 3 */ 'raids',
  /* 4 */ 'bosses',
  /* 5 */ 'followers',
];
let category = allCategory[0];

export function parseCategory(_category, fn) {
  if (allCategory.includes(_category)) {
    category = _category;
  }
  logFile += `raw.${category}.json`;
  parseList(1);
}

export function getNextSiblings(node) {
  var ret = [];
  while (node = node.nextElementSibling) {
    ret.push(node);
  }
  return ret;
}


function parseList(page) {
  console.log(`Start parsing [${category}]: #${page}`);
  fetch(`https://playorna.com/codex/${category}/?p=${page}`, setFetchHeader(defaultLang))
  .then(res => res.text())
  .then(d => {
    let html = parse(d);
    let items = html.querySelectorAll('.codex-entries > a.codex-entries-entry');

    data = data.concat( getItemSummary(items) );

    let nextPage = getNextPage(html, page);
    saveData();
    if (nextPage) {
      parseList(nextPage);
      // // dev
      // parseItems(data);
    } else {
      console.log(`End parsing at #${page}`);
      parseItems(data);
    }
  });
}


function parseItems(items) {
  items.forEach((item, index) => {
    let t = (~~(index / 10)) * 1500;
    setTimeout(() => {
      parseItem(item.uid);
    }, t);
  })
}

function parseItem(uid, lang = defaultLang) {
  console.log(`Start parsing [${category}]: ${lang}, ${uid}`);

  fetch(`https://playorna.com/codex/${category}/${uid}/`, setFetchHeader(lang))
  .then(res => res.text())
  .then(d => {
    let html = parse(d);
    let title = html.querySelector('.herotext').textContent.trim();
    let intro = html.querySelector('.codex-page-description').textContent.trim();
    let raw = html.querySelector('.codex-page').outerHTML;

    updateItem({
      uid,
      title,
      intro,
      raw,
      lang,
    });

    // parse zh
    if (lang === defaultLang) {
      parseItem(uid, langs[1]);
    }
  });
}

function updateItem(item) {
  let index = data.findIndex(i => i.uid === item.uid);
  if (index === -1) {
    console.error(`no match with ${item.uid}`);
    return;
  }
  let lang = item.lang.split('-')[0];

  data[index].title[lang] = item.title;
  data[index].intro[lang] = item.intro;
  data[index].raw[lang] = item.raw;

  saveData();
}



/////////////
// parsing //
/////////////

export function setFetchHeader(_lang) {
  return {
    headers: {
      cookie: `ornalang=${_lang}`
    }
  }
}

export function getItemSummary(items) {
  return items.map(elm => {
    let divs = elm.querySelectorAll('div');
    let link = elm.getAttribute('href');
    let uid = link.split('/').filter(Boolean).pop();
    let img = elm.querySelector('img')?.getAttribute('src').replace('https://playorna.com/static/img/', '');
    let title = divs[1].textContent.trim();

    let cate = elm.querySelector('.codex-entries-entry-meta')?.textContent.trim();
    let tier = +divs[divs.length - 1].textContent.match(/\d+/)[0];
    return {
      uid,
      tier,
      img,
      title: {
        en: title,
      },
      cate,
      intro: {},
      raw: {}
    };
  });
}

export function getNextPage(html, page) {
  let paginations = html.querySelectorAll('.pagination > .button');
  let nextPage;

  if (paginations) {
    nextPage = paginations.map(btn => {
      let _href = btn.getAttribute('href');
      let _page = _href.match(/\d+/)[0];
      let _next = +_page > +page;
      return _next && _page;
    }).filter(Boolean)[0];
  }

  return nextPage;
}



function getNodeInfo(node) {
  if (node.nodeType === 3) { // text
    return node.textContent.trim();
  }

  if (node.nodeType === 1) {

    let kls = node.classNames || node.querySelector('[class]')?.classNames;

    let props = {
      tag: node.tagName,
      kls,
      txt: node.textContent.trim(),
      img: node.querySelector('img')?.getAttribute('src').replace('https://playorna.com/static/img', ''),
      url: node.querySelector('a')?.getAttribute('href'),
      // dev: {
      //   type: node.nodeType,
      //   childsCount: node.childNodes.length,
      //   o: node.innerHTML?.trim(),
      // },
    }
    if (kls?.includes('codex-page-description')) {
      if (node.querySelector('strong')) {
        props.kls = 'category';
        props.cate = node.querySelector('strong').textContent.replace(':', '').trim().toLowerCase();
      }

      if (kls?.includes('codex-page-description-highlight')) {
        props.kls = 'highlight';
      }
    }

    for (let prop in props) {
      if (!props[prop]) {
        delete props[prop];
      }
    }
    return props;
  }
  return 'GG';
}


export function cleanData(data) {
  data.forEach(item => {
    let dom = parse(item.raw.en);
    let target = dom.querySelector('.codex-page');
    delete item.raw;

    if (!target.childNodes) { return; }

    let childs = target.childNodes.map(getNodeInfo)
      .filter(node => node.txt || node.img || node.href)

    // dev
    // item.childs = childs;

    let meta = {};
    let desc;
    let dt;
    let tierShowed;

    childs.forEach(i => {
      switch (i.kls || i.tag) {
        // tier info
        case 'codex-page-meta':
          tierShowed = true;
          break;

        case 'codex-page-tag':
          if (!meta.tags) {
            meta.tags = [];
          }
          meta.tags.push(i.txt?.split(/[\n\t]+/).join());
          break;

        case 'codex-stats':
          {
            let stats = i.txt.split(/[\n\t]+/);
            meta.stats = stats.reduce((all, stat) => {
              let p = stat.split(/\:\s+/);
              all[p[0].toLowerCase()] = parseInt(p[1]);
              return all;
            }, {});
          }
          break;

        case 'H4':
          dt = i.txt.replace(':', '').toLowerCase();
          meta[dt] = [];
          break;

        // save 2nd description
        case 'highlight':
          {
            let p = i.txt.split(': ');
            meta[p[0].toLowerCase()] = p[1];
          }
          break;

        case 'codex-page-description':
          if (!tierShowed) {
            if (desc) {
              if (!meta.desc) {
                meta.desc = [];
              }
              meta.desc.push(i.txt);
            }
            desc = i.txt;
            return;
          }
          // break;

        default:
          // special case
          if (i.txt?.includes('Ability:')) {
            let p = i.txt.split(': ');
            dt = p[0].toLowerCase();
            meta[dt] = meta[dt] || [];
            i.txt = p[1];
          }

          if (dt && meta[dt]) {
            delete i.tag;
            delete i.kls;
            meta[dt].push(i);
          } else {
            if (i.txt?.match(/^\w+: /)) {
              let p = i.txt.split(': ');
              meta[p[0].toLowerCase()] = p[1];
              return;
            }
            if (tierShowed) {
              meta.gg = meta.gg || [];
              meta.gg.push(i)
            }
          }
          break;
      }
    });
    item.meta = meta;
  });

  return data;
}




/////////
// log //
/////////

let saveTimer;
function saveData() {
  if (saveTimer) {
    // clearTimeout(saveTimer);
    // saveTimer = null;
    return;
  }
  saveTimer = setTimeout(() => {
    outputJSON(data, logFile);

    clearTimeout(saveTimer);
    saveTimer = null;
  }, 3000);
}

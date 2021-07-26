const fs = require('fs');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

let allItems = fs.readFileSync('./public/raw-data/item.json', 'utf8');
let items = fs.readFileSync('./public/raw-data/item.zh.json', 'utf8');
allItems = JSON.parse(allItems);
items = JSON.parse(items);

// wget https://orna.guide/items?show={1..1369}

items.forEach((i, index) => checking(i.id))
outputJSON(items, `./public/raw-data/item.add.json`);

items.forEach((i, index) => {
  let target = allItems.find(o => o?.id === i.id);
  for (let p in i) {
    if (p !== 'name_zh' && p !== 'id') {
      console.log(p);
    }
    target[p] = i[p];
  }
});

outputJSON(allItems, `./public/raw-data/item.added.json`);
outputJSON(allItems, `./public/raw-data/item.added.min.json`, 0);

function checking(pid) {
  let page;
  try {
    page = fs.readFileSync(`./task/items/items?show=${pid}`, 'utf8');
  } catch (err) {
    console.error(pid, 'missing');
  }
  if (!page) { return; }
  let $ = cheerio.load(page);
  let rows = $('div[class="row card-text"]');
  let prop = {};
  rows.each((i, el) => {
    let pair = $(el).text().trim().split(/\s{3,}/);
    if (
      pair.length &&
      (pair[0] === 'CAUSES' || pair[0] === 'IMMUNITIES')
    ) {
      let item = items.find(i => i.id === pid);
      if (item) {
        item[pair[0].toLowerCase()] = pair[1];
      }
    }
  });
}

function outputJSON(json = {}, fileName, jsonSpace = 2) {
  let fileContent = JSON.stringify(json, null, jsonSpace);
  fs.writeFileSync(fileName, fileContent);
  console.log(`JSON saved as ${fileName}! ( ${fileContent.length / 1000} kb )`);
};

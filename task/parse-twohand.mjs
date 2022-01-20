import fs from 'fs';
import * as cheerio from 'cheerio';
import { outputJSON } from './u.mjs';

let data = JSON.parse(fs.readFileSync('./public/data/item-lite.min.json', 'utf8'));

let op = {
  two_handed: [],
  skill: [],
};
data.forEach(checking);

outputJSON(op, './task/items/two_handed_skill.json', 2);

function checking(item) {
  item.id
  let page;
  try {
    page = fs.readFileSync(`./task/items/items-page/items?show=${item.id}`, 'utf8');
  } catch (err) {
    console.error(item.id, 'missing');
  }
  if (!page) { return; }

  let $ = cheerio.load(page);

  let twoHand = $('.badge.badge-dark:contains("Two-handed")');
  if (twoHand.length) {
    twoHand.each((i, elm) => {
      console.log('twoHand', item.id, item.zh);
      op.two_handed.push(item.id);
    });
  }

  let skill = $('.text-orna-green');
  if (skill.length) {
    skill.each((i, elm) => {
      console.log('skill', item.id, item.zh, $(elm).text());
      op.skill.push({
        id: item.id,
        s: $(elm).text(),
      });
    });
  }
}

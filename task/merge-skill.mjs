import fs from 'fs';
import { saveCSV, outputJSON, getArgs } from './u.mjs';

let ornaSkills = getJson('./codex-skill/src/orna-skills.json')?.skills;
let guideSkills = getJson('./public/data/raw/skill.src.json');

function getJson(path) {
  let rawdata = fs.readFileSync(path, 'utf8');
  return JSON.parse(rawdata);
}

guideSkills.forEach(g_skill => {
  let os = ornaSkills.find(o_skill => o_skill.title.zh === g_skill.zh);
  if (!os) { return; }

  ['causes', 'gives'].forEach(prop => {
    if (os.metas?.[prop]) {
      g_skill[prop] = [...new Set((g_skill[prop] || []).concat(Object.keys(os.metas[prop])))];
    }
  })
});

outputJSON(guideSkills, './public/data/raw/skill.src.json');
outputJSON(guideSkills, './public/data/skill.min.json', null);

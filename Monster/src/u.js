import { optionEnZh } from './name.js';

const elementSkillEffect = {
  // Arcane: '',
  Dark: 'Asleep',
  Dragon: 'Blight',
  Earthen: 'Rot',
  Fire: 'Burning',
  Holy: 'Blind',
  Lightning: 'Paralyzed',
  Water: 'Frozen',
};

export function handleData(monsterData, skillData) {
  const gglist = [
    'name',
    'zh',
    'image',
    'type',
    'element',
    'description',
  ];

  [monsterData, skillData].forEach(data => {
    data.forEach(item => {
      for (let prop in item) {
        if (!item[prop]) {
          delete item[prop];
        } else {
          if (gglist.indexOf(prop) === -1) {
            item[prop] = JSON.parse(item[prop]);
          }
        }
        if (!item.zh) {
          item.zh = item.name;
        }
      }
    })
  });

  let getSkill = (id) => {
    return skillData.find(s => s.id === id);
  }

  // add default debuff for element type skill
  skillData.forEach(s => {
    let elementDebuff = elementSkillEffect[s.element];
    if (s.element && elementDebuff) {
      s.causes = [
        ...new Set([ ...(s.causes || []), elementDebuff])
      ];
    }
  });

  // gen skill effect
  monsterData.forEach(monster => {
    if (!monster.skills) { return; }

    let skills_effect = [...new Set(monster.skills
      .map(skill_id => getSkill(skill_id)?.causes)
      .filter(Boolean)
      .flat()
    )];

    if (skills_effect.length) {
      monster.skills_effect = skills_effect
        .map(optionEnZh)
        .sort((a, b) => a.label.localeCompare(b.label));
    }
  })

  return {
    monsters: monsterData,
    skills: skillData,
  };
}

const STORAGE_KEY = 'Orna/monster';
export function saveItem(data) {
  if (!data || !data.key) { return false;}
  let odata = getItem() || {};

  odata[data.key] = data.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(odata));
};

export function getItem(key) {
  let data = localStorage.getItem(STORAGE_KEY);
  if (!data) { return null; }
  data = JSON.parse(data);

  return key ? data[key] : data;
};

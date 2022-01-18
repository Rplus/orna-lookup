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

export function handleData(data) {
  let { monsters, skills, pets } = data;

  let getSkill = (id) => {
    return skills.find(s => s.id === id);
  }

  // add default debuff for element type skill
  skills.forEach(s => {
    let elementDebuff = elementSkillEffect[s.element];
    if (s.element && elementDebuff) {
      s.causes = [
        ...new Set([ ...(s.causes || []), elementDebuff])
      ];
    }
  });

  // gen skill effect
  [monsters, pets].forEach(collection => {
    collection.forEach(iii => {
      if (!iii.skills) { return; }

      let skills_effect = [...new Set(iii.skills
        .map(skill_id => getSkill(skill_id)?.causes)
        .filter(Boolean)
        .flat()
      )];

      if (skills_effect.length) {
        iii.skills_effect = skills_effect
          .sort((a, b) => a.indexOf('↓'))
      }
    })
  })

  return {
    monsters: monsters,
    skills: skills,
    pets: pets,
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

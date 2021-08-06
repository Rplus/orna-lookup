const words = {
  'Bleeding': '流血',
  'Frozen': '冰凍',
  'Burning': '燃燒',
  'Asleep': '入睡',
  'Paralyzed': '麻痺',
  'Blind': '致盲',
  'Stunned': '暈眩',
  'Rot': '腐敗',
  'Blight': '枯萎',
  'Petrified': '石化',
  'Poisoned': '中毒',
  'Drenched': '濕滑',
  'Cursed': '詛咒',

  'Mage': '法師',
  'Thief': '盜賊',
  'Warrior': '戰士',

  'Curative': '藥水',
  'Weapon': '武器',
  'Other': '其他',
  'Item': '物品',
  'Head': '頭部',
  'Armor': '護甲',
  'Legs': '腿部',
  'Accessory': '配件',
  'Material': '材料',
  'Off-hand': '副手',
  'Adornment': '裝飾品',

  'Dark': '黑暗',
  'Water': '水',
  'Fire': '火',
  'Physical': '物理',
  'Holy': '神聖',
  'Earthen': '地',
  'Lightning': '雷',
  'Dragon': '龍',
  'Arcane': '奧術',
}

let xx = [];

export function getList(data) {
  let obj = {
    types: [...new Set(data.map(i => i.type))],
    tiers: [...new Set(data.map(i => i.tier))],
    element: [...new Set(data.map(i => i.element))],
    immunities: [...new Set(data.map(i => i.immunities?.split(', ')).flat())],
    causes: [...new Set(data.map(i => i.causes?.split(', ')).flat())],
    equipped_by: [...new Set(data.map(i => i.equipped_by).flat().filter(Boolean))],
  }

  return genLabelValue(obj);
}

function genLabelValue(obj) {
  for (let prop in obj) {
    obj[prop] = obj[prop]
    .filter(Boolean)
    .map(i => (
      {
        value: i,
        label: words[i] ? `${words[i]} ${i}` : i,
      }
    ))
    .sort((a, b) => sortLables(a.label, b.label));
  }
  return obj;
}

function sortLables(label_1, label_2) {
  switch (typeof label_1) {
    case 'number':
      return label_1 - label_2;
    case 'string':
      return label_1.toLowerCase().localeCompare(label_2.toLowerCase());
    default:
      return label_1 > label_12;
  }
}

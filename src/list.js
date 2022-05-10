export const words = {
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
  'Toxic': '劇毒',
  'Lulled': '恍惚',
  'Stasis': '停滯',
  'Doom': '厄運',
  'Confused': '迷惑',

  'Mage': '法師',
  'Thief': '盜賊',
  'Warrior': '戰士',

  'Curative': '藥水',
  'Weapon': '.. 武器',
  'Other': '其他',
  'Item': '物品',
  'Head': '. 頭部',
  'Armor': '.. 護甲',
  'Legs': '... 腿部',
  'Accessory': '... 配件',
  'Material': '材料',
  'Off-hand': '.. 副手',
  'Adornment': '裝飾品',

  'dark': '闇',
  'water': '水',
  'fire': '火',
  'physical': '物',
  'holy': '光',
  'earthen': '土',
  'lightning': '雷',
  'dragon': '龍',
  'arcane': '奧',

  'Fire Def': '.火抗',
  'Water Def': '.水抗',
  'Earth Def': '.土抗',
  'Lightning Def': '.雷抗',
  'Holy Def': '.光抗',
  'Dark Def': '.闇抗',

  // stats
  'attack': '物攻',
  'magic': '魔攻',
  'defense': '物防',
  'ward': '護盾',
  'dexterity': '敏捷',
  'mana': '魔力',
  'crit': '暴擊',
  'resistance': '魔防',
  'hp': '血量',
  'foresight': '預知',

  // rarity
  'w': '1 白',
  'g': '2 綠',
  'b': '3 藍',
  'p': '4 紫',

  // tags
  'shops': '商店',
  'chests': '寶箱',

  // category
  'bows': '弓箭',
  'swords': '劍',
  'staffs': '杖',
  'daggers': '匕首',
  'instruments': '樂器',
  'polearms': '長矛',
  'archistaffs': '大法師杖',
  'axes & hammers': '斧&錘',
  'curved swords': '彎刀',
  'greatbows': '長弓',
}

export function getList(data) {
  let obj = {
    types: [...new Set(data.map(i => i.type))],
    categories: [...new Set(data.map(i => i.category))],
    tiers: [...new Set(data.map(i => i.tier))],
    element: [...new Set(data.map(i => i.element))],
    immunities: [...new Set(data.map(i => i.immunities).flat())],
    causes: [...new Set(data.map(i => i.causes).flat())],
    gives: [...new Set(data.map(i => i.gives).flat())],
    cures: [...new Set(data.map(i => i.cures).flat())],
    tags: [...new Set(data.map(i => i.tags).flat())],
    rarity: [...new Set(data.map(i => i.rarity))],
    equipped_by: [...new Set(data.map(i => i.equipped_by).flat().filter(Boolean))],

    // gives: [...new Set(data.map(i => i.gives).flat().map(i => i && i[0]))],
    // prevents: [...new Set(data.map(i => i.prevents).flat())],
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
    obj[prop].unshift({value: '', label: ''});
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
      return label_1 > label_2;
  }
}

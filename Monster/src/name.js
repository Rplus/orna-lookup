const en2zhMap = {
  // debuffs
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
  'Lulled': '安份',

  // element
  'Dark': '闇',
  'Water': '水',
  'Fire': '火',
  'Physical': '物',
  'Holy': '光',
  'Earthen': '土',
  'Lightning': '雷',
  'Dragon': '龍',
  'Arcane': '奧',

  // spec
  'weak_to': '弱點',
  'immune_to': '免疫',
  'resistant_to': '抗性',
  'immune_to_status': '狀態免疫',

  // skill
  'type': '類別',
  'gives': '附與',
  'causes': '造成',
  'element': '元素',
};

export function en2zh(en) {
  return en2zhMap[en] || en;
}

export function optionEnZh(en) {
  return {
    value: en,
    label: en2zh(en),
  };
}

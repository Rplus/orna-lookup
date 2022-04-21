import {
  addMessages,
  init,
  getLocaleFromNavigator
} from 'svelte-i18n';
import { getItem } from './u.js';

const _defaultLang = 'en';

const langs = ['en', 'zh'];

let resources = {};
let missingTransition = [];
const _words = {
  // spec
  'weak_to': {
    en: 'Weak',
    zh: '弱點',
  },
  'immune_to': {
    en: 'Immune',
    zh: '免疫',
  },
  'resistant_to': {
    en: 'Resists',
    zh: '抗性',
  },
  'immune_to_status': {
    en: 'Status Immunity',
    zh: '狀態免疫',
  },

  // skill
  'type': {
    en: 'Type',
    zh: '類別',
  },
  'gives': {
    en: 'Gives',
    zh: '附與',
  },
  'causes': {
    en: 'Causes',
    zh: '造成',
  },
  'element': {
    en: 'Element',
    zh: '元素',
  },

  // debuffs
  'Bleeding': {
    zh: '流血',
  },
  'Frozen': {
    zh: '冰凍',
  },
  'Burning': {
    zh: '燃燒',
  },
  'Asleep': {
    zh: '入睡',
  },
  'Paralyzed': {
    zh: '麻痺',
  },
  'Blind': {
    zh: '致盲',
  },
  'Stunned': {
    zh: '暈眩',
  },
  'Rot': {
    zh: '腐敗',
  },
  'Blight': {
    zh: '枯萎',
  },
  'Petrified': {
    zh: '石化',
  },
  'Poisoned': {
    zh: '中毒',
  },
  'Drenched': {
    zh: '濕滑',
  },
  'Cursed': {
    zh: '詛咒',
  },
  'Toxic': {
    zh: '劇毒',
  },
  'Lulled': {
    zh: '安份',
  },
  'Stasis': {
    zh: '停滯',
  },
  'Doom': {
    zh: '厄運',
  },
  'Confused': {
    zh: '迷惑',
  },
  'Starstruck': {
    zh: '暈星',
  },

  // element
  'Dark': {
    zh: '闇',
  },
  'Water': {
    zh: '水',
  },
  'Fire': {
    zh: '火',
  },
  'Physical': {
    zh: '物',
  },
  'Holy': {
    zh: '光',
  },
  'Earthen': {
    zh: '土',
  },
  'Lightning': {
    zh: '雷',
  },
  'Dragon': {
    zh: '龍',
  },
  'Arcane': {
    zh: '奧',
  },

  // chart
  'Multi-round Attack': {
    zh: '詠唱 Attack',
  },
  'Multi-round Magic': {
    zh: '詠唱 Magic',
  },

  'history': {
    en: 'History',
    zh: '搜尋紀錄',
  },
  'name_prop': {
    en: 'name',
    zh: 'zh',
  },
};

for (let _w in _words) {
  for (let _l in langs) {
    let lng = langs[_l];
    if (!resources[lng]) {
      resources[lng] = {};
    }
    resources[lng][_w] = _words[_w][lng] || _words[_w][_defaultLang];
    if (!_words[_w][lng]) {
      missingTransition.push([lng, _w].join());
    }
  }
}

langs.forEach(lang => addMessages(lang, resources[lang]));

init({
  fallbackLocale: 'en',
  initialLocale: getItem('lang') || getLocaleFromNavigator().split('-')[0],
});

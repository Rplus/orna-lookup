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
  // 'uid': {
  //   zh: 'UID',
  // },
  'tier': {
    en: '★tier',
    zh: '★tier',
  },
  // 'img': {
  //   zh: 'img',
  // },
  'titles': {
    en: 'Name',
    zh: '名稱',
  },
  'intros': {
    en: 'Intros',
    zh: '描述',
  },
  'tags': {
    en: 'Tags',
    zh: 'Tags',
  },
  'effect.causes': {
    en: 'Causes',
    zh: '造成',
  },
  'effect.gives': {
    en: 'Gives',
    zh: '給予',
  },


  'Asleep': {
    zh: '入睡'
  },
  'Bleeding': {
    zh: '流血'
  },
  'Blight': {
    zh: '枯萎'
  },
  'Blind': {
    zh: '致盲'
  },
  'Bloodshift': {
    zh: '鮮血轉移'
  },
  'Burning': {
    zh: '燃燒'
  },
  'Call of Brynhild': {
    zh: '布倫希爾德的呼召'
  },
  'Call of Idun': {
    zh: '伊登的呼召'
  },
  'Call of Jord': {
    zh: '嬌德的呼召'
  },
  'Call of Skadi': {
    zh: '斯卡蒂的呼召'
  },
  'Castor': {
    zh: '卡斯托耳的機智'
  },
  'Confused': {
    zh: '迷惑'
  },
  'Cursed': {
    zh: '詛咒'
  },
  'Dark Def': {
    zh: '暗 抗'
  },
  'Dark Immune': {
    zh: '暗 免疫'
  },
  'Defending': {
    zh: '防禦中'
  },
  'Doom': {
    zh: '厄運'
  },
  'Earth Aligned': {
    zh: '地行者'
  },
  'Earth Att': {
    zh: '地 攻'
  },
  'Earth Def': {
    zh: '地 抗'
  },
  'Earth Immune': {
    zh: '地 免疫'
  },
  'Eir': {
    zh: '埃爾'
  },
  'Elementless': {
    zh: '元素解除'
  },
  'Fire Aligned': {
    zh: '火行者'
  },
  'Fire Att': {
    zh: '火 攻'
  },
  'Fire Def': {
    zh: '火 抗'
  },
  'Fire Immune': {
    zh: '火 免疫'
  },
  'Foresight ↑': {
    zh: '預知 ↑'
  },
  'Foresight ↓': {
    zh: '預知 ↓'
  },
  'Frozen': {
    zh: '冰凍'
  },
  'Gunnr': {
    zh: '古娜'
  },
  'Holy Def': {
    zh: '光 抗'
  },
  'Holy Immune': {
    zh: '光 免疫'
  },
  'Kára': {
    zh: '卡拉'
  },
  'Lightning Aligned': {
    zh: '雷行者'
  },
  'Lightning Att': {
    zh: '雷 攻'
  },
  'Lightning Def': {
    zh: '雷 抗'
  },
  'Lightning Immune': {
    zh: '雷 免疫'
  },
  'Lulled': {
    zh: '恍惚'
  },
  "Lyon's Mark": {
    zh: '里昂的標記'
  },
  'Paralyzed': {
    zh: '麻痺'
  },
  'Petrified': {
    zh: '石化'
  },
  'Poisoned': {
    zh: '中毒'
  },
  'Pollux': {
    zh: '波魯克斯'
  },
  'Rot': {
    zh: '腐敗'
  },
  'Snotra': {
    zh: '斯洛特拉'
  },
  'Starstruck': {
    zh: '暈星'
  },
  'Stasis': {
    zh: '停滯'
  },
  'Stunned': {
    zh: '暈眩'
  },
  'Target ↑': {
    zh: '目標 ↑'
  },
  'Target ↑↑': {
    zh: '目標 ↑↑'
  },
  'Target ↓': {
    zh: '目標 ↓'
  },
  'Target ↓↓': {
    zh: '目標 ↓↓'
  },
  'Toxic': {
    zh: ''
  },
  'Tree of Demise': {
    zh: '絕命之樹'
  },
  'Tree of Life': {
    zh: '生命之樹'
  },
  'Water Aligned': {
    zh: '水行者'
  },
  'Water Att': {
    zh: '水 攻'
  },
  'Water Def': {
    zh: '水 抗'
  },
  'Water Immune': {
    zh: '水 免疫'
  }
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

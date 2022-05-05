export function sortByChar(a, b) {
  return a.localeCompare(b);
}

export function handleData(data) {
  data.forEach(i => {
    i.titles = Object.values(i.title).join();
    i.intros = Object.values(i.intro).join();
    i.effect_types = Object.keys(i.meta);
    i.effects = Object.values(i.meta)
      .map(j => j[0])
      .flat();
  });
  data.sort((a, b) => a.title.en.localeCompare(b.title.en));

  return data;
}

export function uniq(arr) {
  return [...new Set(arr)];
}

export async function fetchJSON(url) {
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();
    if (!data?.data) {
      throw new Error('empty data');
    }
    return data;
  } else {
    throw new Error(data);
  }
}


export const Langs = {
  en: 'en',
  zh: 'zh-hant',
};

export function trans(obj, lang = 'en') {
  return obj[lang] || obj.en;
};

const STORAGE_KEY = 'Orna/codex';
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

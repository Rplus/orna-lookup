export const filtersDef = [
  {
    prop: 'name_zh',
    type: 'text',
    sort: true,
  },
  {
    prop: 'name',
    type: 'text',
    sort: true,
  },
  {
    prop: 'tier',
    type: 'number',
    list: 'tiers',
    min: 1,
    max: 10,
    sort: true,
  },
  {
    prop: 'equipped_by',
    type: 'text',
    list: 'equipped_by',
  },
  {
    prop: 'context',
    type: 'text',
  },
  {
    prop: 'prevents',
    type: 'text',
    list: 'prevents',
  },
  {
    prop: 'causes',
    type: 'text',
    list: 'causes',
  },
  {
    prop: 'id',
    type: 'number',
    min: 1,
    sort: true,
  },
  {
    prop: 'description',
    type: 'text',
  },
  {
    prop: 'type',
    type: 'text',
    list: 'types',
    // exact: true,
    sort: true,
  },
  {
    prop: 'boss',
    type: 'checkbox',
  },
  {
    prop: 'arena',
    type: 'checkbox',
  },
  // {
  //   prop: 'image',
  //   type: 'text',
  // },
  // {
  //   prop: 'stats',
  // },
  // {
  //   prop: 'materials',
  // },
  // {
  //   prop: 'dropped_by',
  // },
  // {
  //   prop: 'quests',
  // },
  {
    prop: 'element',
    type: 'text',
    list: 'element',
    sort: true,
  },
  {
    prop: 'view_distance',
    type: 'checkbox',
  },
  {
    prop: 'stats.attack.base',
    type: 'number',
    sort: true,
  },
  {
    prop: 'stats.magic.base',
    type: 'number',
    sort: true,
  },
  {
    prop: 'stats.defense.base',
    type: 'number',
    sort: true,
  },
  {
    prop: 'stats.ward.base',
    type: 'number',
    sort: true,
  },
  {
    prop: 'stats.dexterity.base',
    type: 'number',
    sort: true,
  },
  {
    prop: 'stats.mana.base',
    type: 'number',
    sort: true,
  },
  {
    prop: 'stats.crit.base',
    type: 'number',
    sort: true,
  },
  {
    prop: 'stats.resistance.base',
    type: 'number',
    sort: true,
  },
  {
    prop: 'stats.hp.base',
    type: 'number',
    sort: true,
  },
];

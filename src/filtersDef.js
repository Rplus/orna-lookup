export const filtersDef = [
  {
    prop: 'name_zh',
    type: 'text',
  },
  {
    prop: 'name',
    type: 'text',
  },
  {
    prop: 'tier',
    type: 'number',
    list: 'tiers',
    min: 1,
    max: 10,
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
    min: 0,
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
  },
  {
    prop: 'view_distance',
    type: 'checkbox',
  },
];

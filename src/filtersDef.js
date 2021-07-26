export const filtersDef = [
  {
    prop: 'name',
    type: 'text',
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
    prop: 'tier',
    type: 'number',
    list: 'tiers',
    min: 1,
    max: 10,
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
  {
    prop: 'equipped_by',
    type: 'text',
    list: 'equipped_by',
  },
  {
    prop: 'context',
    type: 'text',
  },
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
  // {
  //   prop: 'element',
  // },
  {
    prop: 'view_distance',
    type: 'checkbox',
  },
];

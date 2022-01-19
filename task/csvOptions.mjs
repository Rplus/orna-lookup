export default {
  defalt: {
    emptyFieldValue: '',
  },
  item: {
    emptyFieldValue: '',
    // excludeKeys: ['description'],
    keys: [
      'id',
      'name',
      'zh',
      'tier',
      'type',

      'boss',
      'arena',
      'view_distance',

      'equipped_by',

      'element',

      { field: 'stats.attack.base', title: 'stats.attack', },
      { field: 'stats.magic.base', title: 'stats.magic', },
      { field: 'stats.defense.base', title: 'stats.defense', },
      { field: 'stats.resistance.base', title: 'stats.resistance', },
      { field: 'stats.dexterity.base', title: 'stats.dexterity', },
      { field: 'stats.crit.base', title: 'stats.crit', },
      { field: 'stats.ward.base', title: 'stats.ward', },
      { field: 'stats.hp.base', title: 'stats.hp', },
      { field: 'stats.mana.base', title: 'stats.mana', },

      'prevents',
      'causes',
      'cures',
      'gives',

      'dropped_by',
      'materials',

      'quests',
      'image',

      'other_effect',
      'two_handed',
      'slots',
      'rarity',
      'description',
    ],
  },
  monster: {
    emptyFieldValue: '',
    keys: [
      'id',
      'name',
      'zh',
      'tier',
      'level',
      'boss',

      'buffs',
      'spawns',

      'weak_to',
      'immune_to',
      'resistant_to',

      'immune_to_status',
      'vulnerable_to_status',

      'skills',
      'drops',

      'quests',
      'image',
    ],
  },
  skill: {
    emptyFieldValue: '',
    keys: [
      'id',
      'name',
      'zh',
      'tier',

      'type',
      'element',
      'is_magic',

      'bought',
      'cost',
      'mana_cost',

      'm1',
      'm2.max',
      'm2.min',
      'turns',
      'ward',
      'hp',
      'strikes',
      'crit',

      'cures',
      'gives',
      'causes',

      'buffed_by',
      'pets_use',
      'monsters_use',
      'learned_by',

      'description',
    ],
  },
  pet: {
    emptyFieldValue: '',
    keys: [
      'id',
      'name',
      'zh',
      'tier',
      'cost',
      'skills',
      'stats.attack',
      'stats.heal',
      'stats.protect',
      'stats.buff',
      'stats.debuff',
      'stats.spell',
      'image',
      'description',
    ],
  },
}

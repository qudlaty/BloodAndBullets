const entities = [
  {
    name: "John Rambo", age: 40, hp: 95, maxHp: 100,
    icon: "😠",
    isBreathing: true,
    position: {x:0, y:0},
    inventory: ['KA-BAR', 'M16'],
    equipment: {head: 'Red Bandana'},
    damage: 1, rounds: 10, maxRounds: 15, hasWeapon: true,
  },
  {
    name: "Ellen Replay", age: 30, hp: 50, maxHp: 65,
    icon: "👩",
    isBreathing: true,
    position: {x:0, y:1},
    inventory: ['Lazer', 'Motion Detector'],
    equipment: {head: 'Afro'},
    damage: 1, rounds: 10, maxRounds: 10, hasWeapon: true,
  },
  {
    name: "Lazer Blady", age: 60, hp: 75, maxHp: 100,
    icon: "🧑🏻",
    isBreathing: true,
    position: {x:4, y:8},
    inventory: ['Lazer'],
    equipment: {},
    damage: 10, rounds: 3, maxRounds: 3, hasWeapon: true,
  },
  {
    name: "Octo", age: 8, hp: 888, maxHp: 1000,
    icon: "🐙",
    isBreathing: true,
    position: {x:8, y:8},
    inventory: [], equipment: {},
  },
  {
    name: "Squid", age: 5, hp: 55, maxHp: 100,
    icon: "🦑",
    isBreathing: true,
    position: {x:5, y:5},
    inventory: [], equipment: {},
  },

];

export default entities;

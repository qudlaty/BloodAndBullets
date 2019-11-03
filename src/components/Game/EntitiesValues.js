const entities = [
  {
    name: "John Rambo", age: 40, hp: 95, maxHp: 100,
    icon: "😠",
    isBreathing: true,
    isFriendly: true,
    position: {x:0, y:0},
    inventory: ['KA-BAR', 'M16'],
    equipment: {head: 'Red Bandana'},
    damage: 1, rounds: 10, maxRounds: 15, hasWeapon: true,
  },
  {
    name: "Ellen Replay", age: 30, hp: 50, maxHp: 65,
    icon: "👩",
    isBreathing: true,
    isFriendly: true,
    position: {x:0, y:1},
    inventory: ['Lazer', 'Motion Detector'],
    equipment: {head: 'Afro'},
    damage: 1, rounds: 10, maxRounds: 10, hasWeapon: true,
  },
  {
    name: "Lazer Blady", age: 60, hp: 75, maxHp: 100,
    icon: "🧑🏻",
    isBreathing: true,
    isFriendly: true,
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
  },
  {
    name: "Squid", age: 5, hp: 55, maxHp: 100,
    icon: "🦑",
    isBreathing: true,
    position: {x:5, y:5},
  },
  {
    name: "Ant", age: 1, hp: 15, maxHp: 20,
    icon: "🐜",
    isBreathing: true,
    position: {x:7, y:6},
  },
  {
    name: "Spider", age: 1, hp: 40, maxHp: 40,
    icon: "🕷️",
    isBreathing: true,
    position: {x:9, y:3},
  },
  {
    name: "Mosquito", age: 1, hp: 10, maxHp: 10,
    icon: "🦟",
    isBreathing: true,
    position: {x:2, y:7},
  },
  {
    name: "Microbe", age: 1, hp: 1, maxHp: 5,
    icon: "🦠",
    isBreathing: true,
    position: {x:3, y:5},
  },

];

export default entities;

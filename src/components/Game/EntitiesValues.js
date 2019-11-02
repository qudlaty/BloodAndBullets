const entities = [
  {
    position: {x:0, y:0}, value: "😠", name: "John Rambo", age: 40, hp: 95, maxHp: 100,
    inventory: ['KA-BAR', 'M16'], equipment: {head: 'Red Bandana'}, isBreathing: true,
    damage: 1, rounds: 10, maxRounds: 15, hasWeapon: true,
  },
  {
    position: {x:0, y:1}, value: "👩", name: "Ellen Ripley", age: 30, hp: 50, maxHp: 65,
    inventory: ['Lazer', 'Motion Detector'], equipment: {head: 'Afro'}, isBreathing: true,
    damage: 1, rounds: 10, maxRounds: 10, hasWeapon: true,
  },
  {
    position: {x:4, y:8}, value: "🧑🏻", name: "Lazer Blady", age: 60, hp: 75, maxHp: 100,
    inventory: ['Lazer'], equipment: {}, isBreathing: true,
    damage: 10, rounds: 3, maxRounds: 3, hasWeapon: true,
  },
  {position: {x:8, y:8}, value: "🐙", name: "Octo", age: 8, hp: 888, maxHp: 1000, inventory: [], equipment: {}, isBreathing: true,},
  {position: {x:5, y:5}, value: "🦑", name: "Squid", age: 5, hp: 55, maxHp: 100, inventory: [], equipment: {}, isBreathing: true,},

];

export default entities;

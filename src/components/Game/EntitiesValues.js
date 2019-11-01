const entities = [
  {position: {x:0, y:0}, value: "😠", name: "John Rambo", age: 40, hp: 95, maxHp: 100, inventory: ['KA-BAR', 'M16'], equipment: {head: 'Red Bandana'}, isBreathing: true,},
  {position: {x:0, y:1}, value: "👩", name: "Ellen Ripley", age: 30, hp: 50, maxHp: 65, inventory: ['Motion Detector'], equipment: {head: 'Afro'}, isBreathing: true, isShooting: false, targetPosition: {x: 5, y: 10}, damage: 10,},
  {position: {x:8, y:8}, value: "🐙", name: "Octo", age: 8, hp: 88, maxHp: 100, inventory: [], equipment: {}, isBreathing: true,},
  {position: {x:5, y:5}, value: "🦑", name: "Squid", age: 5, hp: 55, maxHp: 100, inventory: [], equipment: {}, isBreathing: true,},
];

export default entities;

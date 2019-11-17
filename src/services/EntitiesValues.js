//TODO: Move this out of the component
class Weapon {
  causesBleeding = 0
  range = 0
  damage =  0
}

class RangedWeapon extends Weapon{
  rounds = 0
  maxRounds = 5

  fire = () => {
    this.rounds--;
    console.log('firing rifle', this.damage);
    return this.damage
  }
  get isAbleToFire() {
    return this.rounds > 0;
  }
  reload = () => {
    this.rounds = this.maxRounds;
  }
}

class Rifle extends RangedWeapon{
  type = 'projectile'
  causesBleeding =  2
  range = 4

}

class Lazer extends RangedWeapon{
  type = 'lazer'
  causesBleeding = 0
  range = 6
}


class M16 extends Rifle {
  name = 'M16'
  rounds = 20
  maxRounds = 20
  damage = 1
}

class L30 extends Lazer {
  name = 'Assault Lazer Rifle'
  rounds = 3
  maxRounds = 3
  damage = 10
}

class M40 extends Rifle {
  name = 'M41A Pulse Rifle'
  rounds = 40
  maxRounds = 40
  damage = 1
}

const entities = [
  {
    name: "John Rambo", age: 40, hp: 95, maxHp: 100,
    icon: "😠",
    isBreathing: true,
    isFriendly: true,
    position: {x:8, y:8},
    inventory: [{name:'KA-BAR'}, new M16],
    equipment: {head: 'Red Bandana', hands: null},
    damage: 1, rounds: 10, maxRounds: 15, hasWeapon: true,
  },
  {
    name: "Ellen Replay", age: 30, hp: 50, maxHp: 65,
    icon: "👩",
    isBreathing: true,
    isFriendly: true,
    position: {x:1, y:8},
    inventory: [new M40, {name:'Motion Detector'}],
    equipment: {head: 'Afro'},
    damage: 1, rounds: 10, maxRounds: 10, hasWeapon: true,
  },
  {
    name: "Lazer Blady", age: 60, hp: 75, maxHp: 100,
    icon: "🧑🏻",
    isBreathing: true,
    isFriendly: true,
    position: {x:4, y:8},
    inventory: [new L30, new M16],
    equipment: {},
    damage: 10, rounds: 3, maxRounds: 3, hasWeapon: true,
  },
  {
    name: "Lux Aeterna", age: 20, hp: 50, maxHp: 50,
    icon: "👱‍♀️",
    isBreathing: true,
    isFriendly: true,
    position: {x:1, y:1},
    inventory: [new L30],
    equipment: {},
    damage: 4, rounds: 1, maxRounds: 1, hasWeapon: true,
  },
  {
    name: "Octo", age: 8, hp: 288, maxHp: 300,
    icon: "🐙",
    isBreathing: true,
    position: {x:8, y:2},
  },
  {
    name: "Squid", age: 5, hp: 55, maxHp: 55,
    icon: "🦑",
    isBreathing: true,
    position: {x:5, y:5},
  },
  {
    name: "Ant", age: 1, hp: 35, maxHp: 40,
    icon: "🐜",
    isBreathing: true,
    position: {x:7, y:6},
  },
  {
    name: "Spider", age: 1, hp: 160, maxHp: 150,
    icon: "🕷️",
    isBreathing: true,
    position: {x:9, y:3},
    bleedingReductionPerTurn: 1,
  },
  {
    name: "Mosquito", age: 1, hp: 12, maxHp: 20,
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

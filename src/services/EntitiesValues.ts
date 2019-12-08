//TODO: Move this out of the component
class Weapon {
  causesBleeding = 0
  range = 0
  damage =  0
}

class RangedWeapon extends Weapon{
  rounds = 0
  maxRounds = 5

  fire() {
    this.rounds--;
    console.log('Firing ranged weapon. Damage: ', this.damage);
    return this.damage
  }

  get isAbleToFire() {
    return this.rounds > 0;
  }

  reload() {
    this.rounds = this.maxRounds;
  }
}

class Rifle extends RangedWeapon{
  type = 'projectile'
  range = 4
  damage = 1
  causesBleeding = 4
}

class Lazer extends RangedWeapon{
  type = 'lazer'
  range = 6
  damage = 5
  causesBleeding = 0
}


class M16 extends Rifle {
  name = 'M16'
  rounds = 15
  maxRounds = 20
  damage = 2
}

class L30 extends Lazer {
  name = 'Assault Lazer Cannon'
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

interface Position{x: number, y: number}

class BasicEntity {
  name: string = "An Entity"
  icon: string = "E"
  position: Position = {x: undefined, y: undefined}
  hp: number = 100
  maxHp: number = 100
  get isDead(): boolean {
    return this.hp <= 0;
  }
}

const ExtendableMixin = superClass => class extends superClass {
  constructor(...props) {
    super(...props);
    Object.assign(this, ...props);
  }
}

const BreathingMixin = superClass => class extends superClass {
  isSupposedToBeBreathing = undefined;
  get isBreathing() {
    return this.hp > 0 && this.isSupposedToBeBreathing;
  }
  set isBreathing(value) {
    this.isSupposedToBeBreathing = value;
  }
}

// const MobilityMixin = superClass => class extends superClass {
//   get canMove() {

//   }
//   move() {

//   }
// }

const MortalMixin = superClass => class extends superClass {

}

export class Entity extends ExtendableMixin(BreathingMixin(BasicEntity)) {
  // extendable must be on the left, so what is given in constructor props
  // can overwrite what was defined within classess
}

const entitiesInitialValues = [
  {
    name: "John Rambo", age: 40, hp: 95, maxHp: 100,
    icon: "😠",
    isBreathing: true,
    isFriendly: true,
    position: {x:8, y:8},
    inventory: [{name:'KA-BAR'}, new M16()],
    equipment: {head: 'Red Bandana', hands: null},
    damage: 1, rounds: 10, maxRounds: 15, hasWeapon: true,
  },
  {
    name: "Ellen Replay", age: 30, hp: 50, maxHp: 65,
    icon: "👩",
    isBreathing: true,
    isFriendly: true,
    position: {x:1, y:8},
    inventory: [new M40(), {name:'Motion Detector'}],
    equipment: {head: 'Afro'},
    damage: 1, rounds: 10, maxRounds: 10, hasWeapon: true,
  },
  {
    name: "Lazer Blady", age: 60, hp: 75, maxHp: 100,
    icon: "🧑🏻",
    isBreathing: true,
    isFriendly: true,
    position: {x:4, y:8},
    inventory: [new L30(), new M16()],
    equipment: {},
    damage: 10, rounds: 3, maxRounds: 3, hasWeapon: true,
  },
  {
    name: "Lux Aeterna", age: 20, hp: 50, maxHp: 50,
    icon: "👱‍♀️",
    isBreathing: true,
    isFriendly: true,
    position: {x:1, y:1},
    inventory: [new L30()],
    equipment: {},
    damage: 4, rounds: 1, maxRounds: 1, hasWeapon: true,
  },
  {
    name: "Robot", age: 1, hp: 50, maxHp: 50,
    icon: "🤖",
    isBreathing: false,
    position: {x:4, y:5},
  },
  {
    name: "Octo", age: 8, hp: 200, maxHp: 200,
    icon: "🐙",
    isBreathing: true,
    position: {x:8, y:2},
  },
  {
    name: "Squid", age: 5, hp: 100, maxHp: 100,
    icon: "🦑",
    isBreathing: true,
    position: {x:5, y:5},
  },
  {
    name: "Ant", age: 1, hp: 45, maxHp: 50,
    icon: "🐜",
    isBreathing: true,
    position: {x:7, y:6},
  },
  {
    name: "Spider", age: 1, hp: 100, maxHp: 150,
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

const entities = entitiesInitialValues.map(entry => new Entity(entry));

export default entities;

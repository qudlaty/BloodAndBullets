import { applyMixins } from '../helpers';
import EntitiesService from './EntitiesService';
import { SquaresService } from '.';
import { Square } from './SquaresService';
import * as Helpers from '../helpers'
import Message from '../services/MessageService';

export class Weapon {
  causesBleeding = 0
  range = 0
  damage =  0
}

export class RangedWeapon extends Weapon{
  rounds: number | any = 0
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

/** Position on a grid */
export interface Position { x: number, y: number }

class Identifiable {
  name: string = "An Entity"
  icon: string = "E"
}

export class Positionable {
  position: Position = {x: undefined, y: undefined}
}

class Movable {
  moveDestination: Position


  moveIntoSquare(squareIndex: number) {
    this.moveIntoPosition(SquaresService.targetSquarePosition(squareIndex));
  }
  
  moveIntoPosition(targetPosition: Position) {
    let targetSquare = SquaresService.getSquare(targetPosition.x, targetPosition.y);
    if(!targetSquare.entity || targetSquare.entity.isDead) {
      this.moveDestination = targetPosition;
      Helpers.resetGivenFieldsOnACollection(SquaresService.squares, 'isChosenDestination');
      targetSquare.isChosenDestination = true;
    } else {
      Message.send(`Cannot move into square ${targetPosition.x} ${targetPosition.y}`);
    }
  }
}

export class Mortal extends Positionable {
  hp: number = 100
  maxHp: number = 100
  get isDead(): boolean {
    return this.hp <= 0;
  }
}

export class Bleedable extends Mortal {
  bleeding: number
  bleedingReductionPerTurn: number = 1
  bleed(): number {
    let entity = this;
    let bloodReleased = 0
    if(entity.bleeding && entity.hp > 0) {
      bloodReleased = entity.bleeding;
      entity.hp -= bloodReleased ;
      entity.bleeding -= entity.bleedingReductionPerTurn;
    }
    return bloodReleased;
  }

  bleedExternally() {
    if(!this.bleeding) return;
    let entity = this;
    let bloodReleased = this.bleed();
    let square: Square = SquaresService.getSquare(entity.position.x, entity.position.y);
    SquaresService.addBlood(square, bloodReleased);
  }
}

class Breathing extends Mortal {
  isSupposedToBeBreathing: boolean = undefined;
  get isBreathing(): boolean {
    return this.hp > 0 && this.isSupposedToBeBreathing;
  }
  set isBreathing(value: boolean) {
    this.isSupposedToBeBreathing = value;
  }
}

class Combative extends Identifiable {
  targetPosition: Position
  isShooting?: boolean
  ceaseFire?: boolean
  hasWeapon?: boolean
  attackPosition(targetedSquarePosition: Position){
    if(this.hasWeapon){
      this.targetPosition = targetedSquarePosition;
      this.isShooting = true;  
    }else {
      Message.send(`${this.name} no fkin weapon in hands`)
    }
  }
}

export class Entity {// Extended by mixins below
  constructor(...props) {
    Object.assign(this, ...props);
  }

  active?: boolean
  inventory: any[]
  equipment: any
  hasWeapon: boolean
}

/************************************************************/
/* Always update both lists */

export interface Entity extends 
  Identifiable, Positionable, Mortal, Bleedable, Movable, Breathing, Combative
  {};
applyMixins(Entity, [
  Identifiable, Positionable, Mortal, Bleedable, Movable, Breathing, Combative
]);

/************************************************************/

const entitiesInitialValues = [
  {
    name: "John Rambo", age: 40, hp: 95, maxHp: 100,
    icon: "😠",
    isBreathing: true,
    isFriendly: true,
    position: {x:8, y:8},
    inventory: [{name:'KA-BAR'}, new M16()],
    equipment: {head: 'Red Bandana', hands: null},
  },
  {
    name: "Ellen Replay", age: 30, hp: 50, maxHp: 65,
    icon: "👩",
    isBreathing: true,
    isFriendly: true,
    position: {x:1, y:8},
    inventory: [new M40(), {name:'Motion Detector'}],
    equipment: {head: 'Afro'},
  },
  {
    name: "Lazer Blady", age: 60, hp: 75, maxHp: 100,
    icon: "🧑🏻",
    isBreathing: true,
    isFriendly: true,
    position: {x:4, y:8},
    inventory: [new L30(), new M16()],
    equipment: {},
  },
  {
    name: "Lux Aeterna", age: 20, hp: 50, maxHp: 50,
    icon: "👱‍♀️",
    isBreathing: true,
    isFriendly: true,
    position: {x:1, y:1},
    inventory: [new L30()],
    equipment: {},
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
    bleedingReductionPerTurn: 0,
    bleeding: 1,
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

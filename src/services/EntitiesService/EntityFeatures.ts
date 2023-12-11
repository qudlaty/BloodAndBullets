import { Item, Weapon, Square } from "services";
import { SquaresService, MessageService } from "services";
import { Entity } from "./EntityClass";

/** Position on a grid */
export interface Position {
  x: number;
  y: number;
}

export class Identifiable {
  id: number | string;
  name: string = "";
  icon: string = " ";
}

export class Actor {
  // one who acts
  actionPoints: number = 2;
  maxActionPoints: number = 2;
}

export class Positionable {
  position: Position = { x: undefined, y: undefined };
  isPassable: boolean = false;
  get isBlocking(): boolean {
    return !this.isPassable;
  }
  get square(): Square {
    const square: Square = SquaresService.getSquareFromPosition(this.position.x, this.position.y);
    return square;
  }
}

export class Movable extends Identifiable {
  moveDestination: Position;
  // TODO: are these methods really appropriate for this context?

  setMoveDestinationSquareByNumber(squareIndex: number) {
    this.setMoveDestinationPosition(SquaresService.getSquarePositionFromIndex(squareIndex));
  }

  setMoveDestinationPosition(targetPosition: Position) {
    const targetSquare: Square = SquaresService.getSquareFromPosition(targetPosition.x, targetPosition.y);
    const targetSquareNumber: number = SquaresService.getSquareIndexFromPosition(targetPosition.x, targetPosition.y);
    if (SquaresService.isTargetSquareEnterable(targetSquare)) {
      this.moveDestination = targetPosition;
      SquaresService.markSquareAtIndexAsChosenDestination(targetSquareNumber);
    } else {
      MessageService.send(`${this.name} can't move into square (${targetPosition.x}, ${targetPosition.y})`);
    }
  }
}

export class Mortal extends Positionable {
  hp: number = 100;
  maxHp: number = 100;
  get isDead(): boolean {
    return !this.isAlive;
  }
  get isAlive(): boolean {
    return this.hp > 0;
  }
}

export class Bleedable extends Mortal {
  public bleeding: number = 0;
  public bleedingReductionPerTurn: number = 1;
  bleed(): number {
    const entity = this;
    let bloodReleased = 0;
    if (entity.bleeding && entity.isAlive) {
      bloodReleased = entity.bleeding;
      entity.hp -= bloodReleased;
      entity.bleeding -= entity.bleedingReductionPerTurn;
      if (entity.bleeding < 0) entity.bleeding = 0;
    }
    return bloodReleased;
  }

  bleedExternally() {
    if (!this.bleeding) return;
    const entity = this;
    const bloodReleased = this.bleed();
    const square: Square = SquaresService.getSquareFromPosition(entity.position.x, entity.position.y);
    SquaresService.addBloodToSquare(square, bloodReleased);
  }
}

export class Breathing extends Mortal {
  isSupposedToBeBreathing: boolean = undefined;
  get isBreathing(): boolean {
    return this.isAlive && this.isSupposedToBeBreathing;
  }
  set isBreathing(value: boolean) {
    this.isSupposedToBeBreathing = value;
  }
}

export class Combative extends Identifiable {
  targetPosition: Position;
  isShooting?: boolean; // TODO: refactor to not be optional maybe?
  ceaseFire?: boolean;
  hasWeapon?: boolean;
  attackPosition(targetedSquarePosition: Position) {
    if (this.hasWeapon) {
      this.targetPosition = targetedSquarePosition;
      //this.isShooting = true;
      this.ceaseFire = false;
    } else {
      MessageService.send(`${this.name} can't shoot - no weapon equipped`);
    }
    console.log(this.name, "is attacking", targetedSquarePosition, this);
  }
}

export type InventoryItem = Item | Entity;
export class HavingInventory extends Identifiable {
  inventory: Array<InventoryItem>;
  takeFromInventory(itemName: string): InventoryItem {
    if (!this.inventory) {
      this.inventory = [];
    }
    const actualItemIndex: number = this.inventory.findIndex((item) => item.name === itemName);
    if (actualItemIndex === -1) return null;
    const actualItem: InventoryItem = this.inventory.splice(actualItemIndex, 1)[0];

    return actualItem;
  }
  addToInventory(item: InventoryItem) {
    if (!this.inventory) {
      this.inventory = [];
    }
    this.inventory.push(item);
  }
}

export class HavingEquipment extends HavingInventory {
  equipment: { hands: Item };
  hasWeapon?: boolean;

  equipInHands(itemName: string) {
    this.unEquipFromHands();
    const item: Item = this.takeFromInventory(itemName);
    this.equipment.hands = item;
    if (item instanceof Weapon) {
      this.hasWeapon = true;
    } else {
      this.hasWeapon = false;
    }
  }

  unEquipFromHands() {
    if (this.equipment.hands) {
      this.addToInventory(this.equipment.hands);
      this.equipment.hands = null;
      this.hasWeapon = false;
    }
  }
}

import { Item, Weapon, Square } from "services";
import { SquaresService, MessageService } from "services";
import { Entity } from "./EntityClass";

/** Position on a grid */
export interface Position {
  x: number;
  y: number;
}

/** The one who can be identified */
export class Identifiable {
  id: number | string;
  name: string = "";
  icon: string = " ";
}

/** The one who acts */
export class Actor {
  actionPoints: number = 2;
  maxActionPoints: number = 2;
}

/** The one who can be positioned, who can take space */
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

/** The one who can move */
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

/** The one who can die */
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

/** The one who can bleed */

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

/** The one who can breathe */
export class Breathing extends Mortal {
  isSupposedToBeBreathing: boolean = undefined;
  get isBreathing(): boolean {
    return this.isAlive && this.isSupposedToBeBreathing;
  }
  set isBreathing(value: boolean) {
    this.isSupposedToBeBreathing = value;
  }
}

/** The one who can fight */
export class Combative extends Identifiable {
  targetPosition: Position;
  isShooting?: boolean; // TODO: refactor to not be optional maybe?
  ceaseFire?: boolean;
  hasWeapon?: boolean;
  // TODO: Refactor this to work differently, this class has no bussiness counting the attacks executed
  /** Unique number of the attack action - used to ensure each attack has a separate animation */
  attackNumber: number;

  attackPosition(targetedSquarePosition: Position) {
    if (this.hasWeapon) {
      this.targetPosition = targetedSquarePosition;
      //this.isShooting = true;
      this.ceaseFire = false;
      if (!this.attackNumber) {
        this.attackNumber = 1;
      } else {
        this.attackNumber++;
      }
      console.log(this.attackNumber);
    } else {
      MessageService.send(`${this.name} can't shoot - no weapon equipped`);
    }
    console.log(this.name, "is attacking", targetedSquarePosition, this);
  }
}

/** The one who can be held in Inventory */
export type InventoryItem = Item | Entity;
/** The one who can have Inventory */
export class HavingInventory extends Identifiable {
  inventory: Array<InventoryItem>;
  takeFromInventory(itemName: string): InventoryItem {
    if (!this.inventory) {
      this.inventory = [];
    }
    const actualItemIndex: number = this.inventory.findIndex(item => item.name === itemName);
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

/** The one who can have Equipment */
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

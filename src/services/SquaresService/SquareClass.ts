import { Item } from "services/ItemService";
import { Entity, HavingInventory, Position } from "services/EntitiesService";

export interface Square {
  position?: Position;
  description?: string;
  entities: Entity[];
  entity?: Entity;
  blood?: number;
  squareType: string;
  isLit?: boolean;
  isInTwilightZone?: boolean;
  addItem(item: Item): void;

  // Interface state
  isAvailableDestination?: boolean;
  isChosenDestination?: boolean;
  isTargeted?: boolean;
  isAttacked?: boolean;
}

export class Square extends HavingInventory implements Square {
  public squareType: string = "nothing";
  entities: Entity[] = [];
  constructor(squareIndex) {
    super();
    this.id = squareIndex;
    this.entities = [];
  }
  addItem(item: Item) {
    this.addToInventory(item);
  }
  get items() {
    return this.inventory;
  }
}

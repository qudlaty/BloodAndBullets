import { Item } from "../ItemService";
import { Entity, HavingInventory } from "../EntitiesService";

export interface Square {
  entity?: Entity;
  blood?: number;
  squareType: string;
  isAvailableDestination?: boolean;
  isChosenDestination?: boolean;
  isTargeted?: boolean;
  isLit?: boolean;
  isInTwilightZone?: boolean;
  addItem(item: Item): void;
}

export class Square extends HavingInventory implements Square {
  public squareType: string = "nothing";
  addItem(item: Item) {
    this.addToInventory(item);
  }
  get items() {
    return this.inventory;
  }
}

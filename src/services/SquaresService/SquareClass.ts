import { Item } from "services/ItemService";
import { Entity, HavingInventory, Identifiable } from "services/EntitiesService";

export interface Square {
  entity?: Entity;
  blood?: number;
  squareType: string;
  isAvailableDestination?: boolean;
  isChosenDestination?: boolean;
  isTargeted?: boolean;
  isAttacked?: boolean;
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

import { Item } from "services/ItemService";
import { Entity, HavingInventory, Identifiable, Position } from "services/EntitiesService";
import { SquaresService } from "./SquaresService";

export interface Square {
  position?: Position;
  description?: string;
  entities?: Entity[];
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
  constructor(squareIndex){
    super();
    this.id = squareIndex;
  }
  addItem(item: Item) {
    this.addToInventory(item);
  }
  get items() {
    return this.inventory;
  }
}

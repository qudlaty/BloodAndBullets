import { applyMixins } from "helpers";
import {
  Identifiable,
  Positionable,
  Mortal,
  Bleedable,
  Movable,
  Breathing,
  Combative,
  HavingInventory,
  HavingEquipment,
} from ".";

/**
 * @description The base class for Entities on the board
 */
export class Entity {
  // Extended by mixins below
  constructor(...props) {
    Object.assign(this, ...props);
  }
  isFriendly?: boolean;
  active?: boolean;
}

/************************************************************/
/* Always update both lists */

export interface Entity
  extends Identifiable,
    Positionable,
    Mortal,
    Bleedable,
    Movable,
    Breathing,
    Combative,
    HavingInventory,
    HavingEquipment {}
applyMixins(Entity, [
  Identifiable,
  Positionable,
  Mortal,
  Bleedable,
  Movable,
  Breathing,
  Combative,
  HavingInventory,
  HavingEquipment,
]);

/************************************************************/

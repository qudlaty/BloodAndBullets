import { applyMixins } from "helpers";
import {
  Identifiable,
  Military,
  Positionable,
  Mortal,
  Bleedable,
  Movable,
  Breathing,
  Combative,
  HavingInventory,
  HavingEquipment,
  Actor,
} from "./EntityFeatures";

/** The base class for Entities on the board */
export class Entity {
  // Extended by mixins below
  constructor(...props) {
    Object.assign(this, ...props);
    this.id = crypto.randomUUID();
  }
  isFriendly?: boolean;
  active?: boolean;
}

/************************************************************/
/* Always update both lists */

export interface Entity
  extends Identifiable,
    Military,
    Positionable,
    Mortal,
    Bleedable,
    Movable,
    Breathing,
    Combative,
    HavingInventory,
    HavingEquipment,
    Actor {}
applyMixins(Entity, [
  Identifiable,
  Military,
  Positionable,
  Mortal,
  Bleedable,
  Movable,
  Breathing,
  Combative,
  HavingInventory,
  HavingEquipment,
  Actor,
]);

/************************************************************/

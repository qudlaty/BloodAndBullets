import { Entity, Position, HavingInventory } from ".";
import { SquaresService, Square } from "services/SquaresService";
import * as Helpers from "helpers";
import { RangedWeapon } from "services";
import { Identifiable } from "./EntityFeatures";
import { Item } from "services/ItemService";
const arenaSize: number = 10;

/**
 * @description Set of functions to interact with Entities
 */
class EntitiesServiceClass {
  entities: Entity[];
  selected: Entity;

  getEntityId(entity: Identifiable): string {
    return entity.name;
  }

  findEntityById(id: string): Entity {
    let result: Entity = this.entities.filter(entity => this.getEntityId(entity) === id)[0];
    return result;
  }

  findItemOnEntity(entity: HavingInventory, id: string) {
    let result = entity.inventory.filter(item => this.getEntityId(entity) === id)[0];
    return result;
  }

  moveEntityRandomly(entity: Entity) {
    if (entity.isDead) return;

    let oldPositionX = entity.position.x;
    let oldPositionY = entity.position.y;

    entity.position.x = entity.position.x + Helpers.getRandomIntInclusive(-1, 1);
    entity.position.y = entity.position.y + Helpers.getRandomIntInclusive(-1, 1);

    entity.position.x = Helpers.getNumberWithinBoundaries(entity.position.x, 0, arenaSize - 1);
    entity.position.y = Helpers.getNumberWithinBoundaries(entity.position.y, 0, arenaSize - 1);

    let newSquare = SquaresService.getSquareFromPosition(entity.position.x, entity.position.y);

    if ((newSquare && newSquare.entity) || (newSquare && newSquare.squareType !== "floor")) {
      // if square occupiec, reverse the move
      entity.position.x = oldPositionX;
      entity.position.y = oldPositionY;
    }
  }

  stopBreathingForKilledEntity(entity: Entity): Entity {
    if (entity.isDead) {
      entity.isBreathing = false;
      entity.isShooting = false;
      entity.hp = 0;
    }
    return entity;
  }

  getEntitiesAtGivenPosition(targetPosition: Position): Entity[] {
    return this.entities.filter((potentialTargetEntity: Entity): boolean => {
      return (
        potentialTargetEntity.position.x === targetPosition.x &&
        potentialTargetEntity.position.y === targetPosition.y
      );
    });
  }

  selectEntityFromGivenSquare(selected: Entity, targeted: Square): Entity {
    if (selected && targeted && targeted.entity) {
      selected.active = false;
    }
    if (targeted && targeted.entity) {
      selected = targeted.entity;
      selected.active = true;
    }

    return selected;
  }

  setSelected(selected: Entity, value: boolean): Entity {
    let selectedInEntities = this.findEntityById(this.getEntityId(selected));
    if (value) {
      selected.active = value;
    } else {
      selected = null;
      console.log("Nullified:", selected);
    }
    selectedInEntities.active = value;
    return selected;
  }

  checkAmmoAndCalculateDamageApplied(entity: Entity): number {
    let damageApplied: number = 0;
    let weapon: RangedWeapon = undefined;
    let equippedWeapon: Item = entity.equipment && entity.equipment.hands;
    if(!(equippedWeapon instanceof RangedWeapon)){
      return 0;
    } else {
      weapon = equippedWeapon;
    }

    if (weapon.isAbleToFire) {
      damageApplied = weapon.fire();
    } else {
      weapon.rounds = "empty";
      entity.isShooting = false;
      return 0;
    }

    return damageApplied;
  }

  fireAShot(entity: Entity) {
    if (entity.ceaseFire || entity.isDead) {
      entity.isShooting = false;
      entity.ceaseFire = false;
      return;
    }
    let damageApplied = this.checkAmmoAndCalculateDamageApplied(entity);
    let targetEntities = this.getEntitiesAtGivenPosition(entity.targetPosition);
    targetEntities.forEach((targetEntity) => {
      this.applyDamageToTargetEntity(targetEntity, damageApplied);
      this.ceaseFireNextTickIfTargetIsKilled(entity, targetEntity);
    });
  }

  applyDamageToTargetEntity(targetEntity: Entity, damage: number) {
    if (damage) {
      targetEntity.hp -= damage; // TODO: This should go through a method to calc armor in
      targetEntity.bleeding = 5; // TODO: This should be defined elsewhere (on a weapon)
    }
  }

  ceaseFireNextTickIfTargetIsKilled(entity: Entity, targetEntity: Entity): void {
    if (targetEntity.isDead) {
      entity.ceaseFire = true;
    }
  }

  isEntityShootingProperly(entity: Entity): boolean {
    return (
      entity.isShooting &&
      entity.targetPosition &&
      (entity.targetPosition.x !== entity.position.x || entity.targetPosition.y !== entity.position.y)
    );
  }

  applyEffectsOfBleeding(entity: Entity): Entity {
    // TODO: move to a "bleed" method
    entity.bleedExternally();
    return entity;
  }

  moveEntityIntoChosenDestination(entity: Entity): Entity {
    if (!entity.isDead && entity.moveDestination) {
      let chosenDestinationSquare: Square = SquaresService.getSquareFromPosition(
        entity.moveDestination.x,
        entity.moveDestination.y
      );

      entity.position = entity.moveDestination;
      delete entity.moveDestination;
      chosenDestinationSquare.isChosenDestination = undefined;
    }
    return entity;
  }

  setMoveDestinationOnASelectedEntity(selected: Entity, targetedSquarePosition: Position): void {
    selected.moveDestination = targetedSquarePosition;
  }

  moveEntities(): void {
    this.entities.forEach((entity) => this.moveEntityIntoChosenDestination(entity));
    // let OP: Entity = this.findEntityById("Squid");
    // let OC: Entity = this.findEntityById("Octo");
    // //this.moveEntityRandomly(JR);
    // this.moveEntityRandomly(OP);
    // this.moveEntityRandomly(OC);
    this.entities.filter(entity => !entity.isFriendly).forEach((entity) => {
      this.moveEntityRandomly(entity);
    });
  }
}

export const EntitiesService = new EntitiesServiceClass();

import { Entity, Position, HavingInventory } from ".";
import { SquaresService, Square } from "services/SquaresService";
import * as Helpers from "helpers";
import { MessageService, RangedWeapon } from "services";
import { Identifiable } from "./EntityFeatures";
import { Item } from "services/ItemService";
const arenaSize: number = 10;

const defaultEntityValues = {
  bleedingReductionPerTurn: 1,
  isBreathing: true,
  isPassable: false,
  actionPoints: 2,
  maxActionPoints: 2,
  hasWeapon: true,
};

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
    const result: Entity = this.entities.filter(entity => this.getEntityId(entity) === id)[0];
    return result;
  }

  removeEntity(entity: Entity) {
    this.removeEntityFromListOfEntities(this.entities, entity);
  }

  removeEntityFromListOfEntities(entities: Entity[], entity: Entity) {
    const indexOfEntityToRemove = entities.findIndex(
      currentEntity => (currentEntity && currentEntity.name) === (entity && entity.name)
    );
    if (indexOfEntityToRemove === -1) return -1;
    entities.splice(indexOfEntityToRemove, 1);
    return 0;
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  addEntityToDefaultValues(entity) {
    return Object.assign({ ...defaultEntityValues }, entity);
  }

  changeEntitiesIntoFullBlownObjects(entitiesInitialValues: any[]): Entity[] {
    return entitiesInitialValues
      .map(entity => this.addEntityToDefaultValues(entity)) //
      .map(entity => new Entity(entity));
  }
  findItemOnEntity(entity: HavingInventory, id: string) {
    const result = entity.inventory.filter(item => this.getEntityId(entity) === id)[0];
    return result;
  }

  moveEntityRandomly(entity: Entity) {
    if (entity.isDead || entity.isFriendly) return;

    const oldPositionX = entity.position.x;
    const oldPositionY = entity.position.y;

    let deltaX = Helpers.getRandomIntInclusive(-1, 1);
    let deltaY = Helpers.getRandomIntInclusive(-1, 1);

    if (!entity.actionPoints) {
      deltaX = 0;
      deltaY = 0;
    }
    if (deltaX || deltaY) {
      // non-zero move
      entity.actionPoints--;
    } else {
      // zero ==> no move
    }

    entity.position.x = entity.position.x + deltaX;
    entity.position.y = entity.position.y + deltaY;

    entity.position.x = Helpers.getNumberWithinBoundaries(entity.position.x, 0, arenaSize - 1);
    entity.position.y = Helpers.getNumberWithinBoundaries(entity.position.y, 0, arenaSize - 1);

    const newSquare = SquaresService.getSquareFromPosition(entity.position.x, entity.position.y);

    if ((newSquare && newSquare.entity) || (newSquare && newSquare.squareType !== "floor")) {
      // if square occupiec, reverse the move
      entity.position.x = oldPositionX;
      entity.position.y = oldPositionY;
    }
  }

  stopBreathingForKilledEntity(entity: Entity): Entity {
    if (entity.isDead) {
      entity.isBreathing = false;
      this.stopShooting(entity);
      entity.hp = 0;
    }
    return entity;
  }

  getEntitiesAtGivenPosition(targetPosition: Position): Entity[] {
    return this.entities.filter((potentialTargetEntity: Entity): boolean => {
      return (
        potentialTargetEntity.position.x === targetPosition.x && potentialTargetEntity.position.y === targetPosition.y
      );
    });
  }

  getEntitiesAtGivenPositionThatAreAlive(targetPosition: Position): Entity[] {
    const entitiesAtTargetSquare = this.getEntitiesAtGivenPosition(targetPosition);
    const aliveEntitiesAtTargetSquare = entitiesAtTargetSquare.filter(entity => entity.isAlive);
    return aliveEntitiesAtTargetSquare;
  }

  selectEntityFromGivenSquare(selected: Entity, targeted: Square): Entity {
    let newlySelected;
    if (selected && targeted && targeted.entities.length) {
      selected.active = false;
    }
    if (targeted && targeted.entities.length) {
      newlySelected = targeted.entities[0];
      newlySelected.active = true;
    }

    return newlySelected;
  }

  setSelected(givenEntity: Entity): Entity {
    this.selected = givenEntity;
    this.selected.active = true;
    return this.selected;
  }

  setDeselected(selected: Entity): Entity {
    this.selected = null;
    selected.active = false;
    console.log("Deselected:", selected);
    return selected;
  }

  checkAmmoAndCalculateDamageApplied(entity: Entity): number {
    let damageApplied: number = 0;
    let weapon: RangedWeapon = undefined;
    const equippedWeapon: Item = entity.equipment && entity.equipment.hands;
    if (!(equippedWeapon instanceof RangedWeapon)) {
      return 0;
    } else {
      weapon = equippedWeapon;
    }

    if (weapon.isAbleToFire) {
      damageApplied = weapon.fire();
      entity.isShooting = true;
      entity.actionPoints--;
    } else {
      weapon.rounds = "empty";
      this.stopShooting(entity);
      return 0;
    }

    return damageApplied;
  }

  shouldEntityStopShooting = entity => entity.ceaseFire || entity.isDead;
  stopShooting = entity => {
    entity.isShooting = false;
    entity.ceaseFire = false;
  };
  stopShootingWhenForbidden = entity => {
    if (this.shouldEntityStopShooting(entity)) {
      this.stopShooting(entity);
    }
  };

  fireAShot(entity: Entity) {
    if (!entity.actionPoints || entity.isDead) return;
    const damageApplied = this.checkAmmoAndCalculateDamageApplied(entity);
    const targetEntities = this.getEntitiesAtGivenPosition(entity.targetPosition);
    targetEntities.forEach(targetEntity => {
      this.applyDamageToTargetEntity(targetEntity, damageApplied);
    });
  }

  reloadWeapon(entity: Entity, weapon: RangedWeapon) {
    const equippedWeapon: Item = entity.equipment && entity.equipment.hands;
    if (!(equippedWeapon instanceof RangedWeapon)) {
      return 0;
    } else {
      weapon = equippedWeapon;
    }
    if (entity.equipment.hands && entity.equipment.hands === weapon) {
      this.stopShooting(entity);
    }
    if (weapon.rounds === weapon.maxRounds) {
      MessageService.send(`${weapon.name} already fully loaded`);
      return;
    }
    if (entity.actionPoints >= weapon.reloadCostInAP) {
      entity.actionPoints -= weapon.reloadCostInAP;
      weapon.reload();
    } else {
      MessageService.send(`${entity.name} has not enough AP to reload ${weapon.name}`);
    }
  }

  applyDamageToTargetEntity(targetEntity: Entity, damage: number) {
    if (damage) {
      targetEntity.hp -= damage; // TODO: This should go through a method to calc armor in
      targetEntity.bleeding = 5; // TODO: This should be defined elsewhere (on a weapon)
    }
  }

  ceaseFireNextTickIfNoAliveTargets(entity: Entity): void {
    if (!entity.targetPosition) return;
    const areThereAliveTargetEntities = !!EntitiesService.getEntitiesAtGivenPositionThatAreAlive(entity.targetPosition)
      .length;
    if (!areThereAliveTargetEntities) {
      entity.ceaseFire = true;
    }
  }

  isEntityTargettingSomethingAlive(entity: Entity): boolean {
    const areThereAliveTargetEntities: boolean =
      entity.targetPosition && !!EntitiesService.getEntitiesAtGivenPositionThatAreAlive(entity.targetPosition).length;

    return (
      entity.targetPosition &&
      (entity.targetPosition.x !== entity.position.x || entity.targetPosition.y !== entity.position.y) &&
      areThereAliveTargetEntities
    );
  }

  applyEffectsOfBleeding(entity: Entity): Entity {
    // TODO: move to a "bleed" method
    entity.bleedExternally();
    return entity;
  }

  moveEntityIntoChosenDestination(entity: Entity): Entity {
    if (!entity.actionPoints) return entity;
    if (!entity.isDead && entity.moveDestination) {
      const chosenDestinationSquare: Square = SquaresService.getSquareFromPosition(
        entity.moveDestination.x,
        entity.moveDestination.y
      );

      entity.position = entity.moveDestination;
      delete entity.moveDestination;
      chosenDestinationSquare.isChosenDestination = undefined;
      entity.actionPoints--;
    }
    return entity;
  }

  setMoveDestinationOnASelectedEntity(selected: Entity, targetedSquarePosition: Position): void {
    selected.moveDestination = targetedSquarePosition;
  }

  moveEntities(): void {
    // this.entities.forEach((entity) => this.moveEntityIntoChosenDestination(entity));
    // let OP: Entity = this.findEntityById("Squid");
    // let OC: Entity = this.findEntityById("Octo");
    // //this.moveEntityRandomly(JR);
    // this.moveEntityRandomly(OP);
    // this.moveEntityRandomly(OC);
    this.entities
      .filter(entity => !entity.isFriendly)
      .forEach(entity => {
        this.moveEntityRandomly(entity);
      });
  }

  refillActionPointsForAllEntities() {
    this.entities.forEach(entity => {
      entity.actionPoints = entity.maxActionPoints;
    });
  }
}

export const EntitiesService = new EntitiesServiceClass();

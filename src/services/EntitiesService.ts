import { default as SquaresService, Square } from './SquaresService';
import * as Helpers from '../helpers/Helpers';
import { Entity, Position, Weapon, RangedWeapon, Mortal, Positionable, Bleedable } from '../services/EntitiesValues';
const arenaSize: number = 10;

class EntitiesServiceClass {
  entities: Entity[]
  selected: Entity

  getEntityId(entity: Entity): string {
    return entity.name;
  }

  findEntityById(id: string): Entity {
    let result: Entity = this.entities.filter((entity) => entity.name === id)[0];
    return result;
  }

  findItemOnEntity(entity: Entity, id: string) {
    let result = entity.inventory.filter((item) => item.name === id)[0];
    return result;
  }


  moveEntityRandomly(entity: Entity) {
    if(entity.isDead) return;

    let oldPositionX = entity.position.x;
    let oldPositionY = entity.position.y;

    entity.position.x = entity.position.x + Helpers.getRandomIntInclusive(-1,1);
    entity.position.y = entity.position.y + Helpers.getRandomIntInclusive(-1,1);

    entity.position.x = Helpers.getNumberWithinBoundaries(entity.position.x, 0, arenaSize-1);
    entity.position.y = Helpers.getNumberWithinBoundaries(entity.position.y, 0, arenaSize-1);

    let newSquare = SquaresService.getSquare(entity.position.x, entity.position.y);

    if (newSquare && newSquare.entity) {// if square occupiec, reverse the move
      entity.position.x = oldPositionX;
      entity.position.y = oldPositionY;
    }
  }

  stopBreathingForKilledEntity(entity: Entity): Entity {
    if(entity && entity.hp <= 0){
      entity.isBreathing = false;
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
    if(selected && targeted && targeted.entity){
      selected.active = false;
    }
    if(targeted && targeted.entity){
      selected = targeted.entity;
      selected.active = true;
    }

    return selected;
  }

  setSelected(selected: Entity, value: boolean): Entity {
    let selectedInEntities = this.findEntityById(
      this.getEntityId(selected)
    );
    if(value) {
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
    let weapon: RangedWeapon = entity.equipment && entity.equipment.hands;

    if(!weapon) return 0;

    if(weapon.isAbleToFire) {
      damageApplied = weapon.fire();
    } else {
      weapon.rounds = "empty";
      entity.isShooting = false;
    }

    return damageApplied;
  }


  fireAShot(entity: Entity) {
    if(entity.ceaseFire) {
      entity.isShooting = false;
      entity.ceaseFire = false;
      return;
    }
    let damageApplied = this.checkAmmoAndCalculateDamageApplied(entity);
    let targetEntities =
      this.getEntitiesAtGivenPosition(entity.targetPosition);
    targetEntities.forEach((targetEntity) => {
      this.applyDamageToTargetEntity(targetEntity, damageApplied);
      this.ceaseFireNextTickIfTargetIsKilled(entity, targetEntity);
    });
  }

  applyDamageToTargetEntity(targetEntity: Entity, damage: number) {
    if(damage) {
      targetEntity.hp -= damage;
      targetEntity.bleeding = 5;
    }
  }

  ceaseFireNextTickIfTargetIsKilled(entity: Entity, targetEntity: Entity): void {
    if(targetEntity.hp < 0) {
      entity.ceaseFire = true;
    }
  }

  isEntityShootingProperly(entity: Entity): boolean {
    return entity.isShooting && entity.targetPosition && (
      entity.targetPosition.x !== entity.position.x ||
      entity.targetPosition.y !== entity.position.y
    );
  }

  applyEffectsOfBleeding(entity: Entity): Entity {
    // TODO: move to a "bleed" method
    if(entity.bleeding && entity.hp > 0) {
      entity.hp -= entity.bleeding ;
      let square: Square = SquaresService.getSquare(entity.position.x, entity.position.y);
      SquaresService.addBlood(square, entity.bleeding);
      entity.bleeding -= entity.bleedingReductionPerTurn;
    }
    return entity;
  }

  moveEntityIntoChosenDestination(entity: Entity): Entity {
    if(!entity.isDead && entity.moveDestination) {
      let chosenDestinationSquare: Square = SquaresService.getSquare(
          entity.moveDestination.x, entity.moveDestination.y
      );

      entity.position = entity.moveDestination;
      delete entity.moveDestination;
      chosenDestinationSquare.isChosenDestination = undefined;
    }
    return entity;
  }

  setMoveDestinationOnASelectedEntity(
      selected: Entity, 
      targetedSquarePosition: Position
    ): void {
    selected.moveDestination = targetedSquarePosition;
  }

  moveEntities(): void {
    this.entities.forEach(entity => this.moveEntityIntoChosenDestination(entity));
    let JR: Entity = this.findEntityById("John Rambo");
    let OP: Entity = this.findEntityById("Squid");
    let OC: Entity = this.findEntityById("Octo");
    this.moveEntityRandomly(JR);
    this.moveEntityRandomly(OP);
    this.moveEntityRandomly(OC);
  }

}

let EntitiesService = new EntitiesServiceClass();
export default EntitiesService;

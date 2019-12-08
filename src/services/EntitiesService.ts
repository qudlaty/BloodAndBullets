import SquaresService from './SquaresService';
import * as Helpers from '../helpers/Helpers';
import {Entity} from '../services/EntitiesValues';
const arenaSize = 10;

class EntitiesServiceClass {
  entities: Entity[]
  selected: Entity

  getEntityId(entity) {
    return entity.name;
  }

  findEntityById(id) {
    let result = this.entities.filter((entity) => entity.name === id)[0];
    return result;
  }

  findItemOnEntity(entity, id) {
    let result = entity.inventory.filter((entity) => entity.name === id)[0];
    return result;
  }


  moveEntityRandomly(entity) {
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

  stopBreathingForKilledEntity(entity) {
    if(entity && entity.hp <= 0){
      entity.isBreathing = false;
      entity.hp = 0;
    }
    return entity;
  }

  getEntitiesAtGivenPosition(targetPosition) {
    return this.entities.filter((potentialTargetEntity) => {
      return (
        potentialTargetEntity.position.x === targetPosition.x &&
        potentialTargetEntity.position.y === targetPosition.y
      );
    });
  }

  selectEntityFromGivenSquare(selected, targeted) {
    if(selected && targeted && targeted.entity){
      selected.active = false;
    }
    if(targeted && targeted.entity){
      selected = targeted.entity;
      selected.active = true;
    }

    return selected;
  }

  setSelected(selected, value) {
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

  checkAmmoAndCalculateDamageApplied(entity) {
    let damageApplied = 0;
    let weapon = entity.equipment && entity.equipment.hands;

    if(!weapon) return 0;

    if(weapon.isAbleToFire) {
      damageApplied = weapon.fire();
    } else {
      weapon.rounds = "empty";
      entity.isShooting = false;
    }

    return damageApplied;
  }


  fireAShot(entity) {
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

  applyDamageToTargetEntity(targetEntity, damage) {
    if(damage) {
      targetEntity.hp -= damage;
      targetEntity.bleeding = 5;
    }
  }

  ceaseFireNextTickIfTargetIsKilled(entity, targetEntity) {
    if(targetEntity.hp < 0) {
      entity.ceaseFire = true;
    }
  }

  isEntityShootingProperly(entity) {
    return entity.isShooting && entity.targetPosition && (
      entity.targetPosition.x !== entity.position.x ||
      entity.targetPosition.y !== entity.position.y
    );
  }

  applyEffectsOfBleeding(entity) {
    if(entity.bleeding && entity.hp > 0) {
      entity.hp -= entity.bleeding ;
      let square = SquaresService.getSquare(entity.position.x, entity.position.y);
      SquaresService.addBlood(square, entity.bleeding);
      entity.bleeding -= entity.bleedingReductionPerTurn || 1;
    }
    return entity;
  }

  moveEntityIntoChosenDestination(entity) {
    if(!entity.isDead && entity.moveDestination) {
      let chosenDestinationSquare = SquaresService.getSquare(
          entity.moveDestination.x, entity.moveDestination.y
      );

      entity.position = entity.moveDestination;
      delete entity.moveDestination;
      chosenDestinationSquare.isChosenDestination = undefined;
    }
    return entity;
  }

  setMoveDestinationOnASelectedEntity(selected, targetedSquarePosition) {
    selected.moveDestination = targetedSquarePosition;
  }

  moveEntities() {
    this.entities.forEach(entity => this.moveEntityIntoChosenDestination(entity));
    let JR = this.findEntityById("John Rambo");
    let OP = this.findEntityById("Squid");
    this.moveEntityRandomly(JR);
    this.moveEntityRandomly(OP);
  }

}

let EntitiesService = new EntitiesServiceClass();
export default EntitiesService;

import { getSquare } from './SquaresService';
import * as SquaresService from './SquaresService';
import * as Helpers from '../helpers/Helpers';
const arenaSize = 10;

export function getEntityId(entity) {
  return entity.name;
}

export function findEntityById(entities, id) {
  let result = entities.filter((entity) => entity.name === id)[0];
  //console.log("found entity:", result);
  return result;
}

export function moveEntityRandomly(squares, entity) {
  if(!entity.isBreathing) return;
  // modifies entity in-place
  let oldPositionX = entity.position.x;
  let oldPositionY = entity.position.y;

  entity.position.x = entity.position.x + Helpers.getRandomIntInclusive(-1,1);
  entity.position.y = entity.position.y + Helpers.getRandomIntInclusive(-1,1);

  entity.position.x = Helpers.getNumberWithinBoundaries(entity.position.x, 0, arenaSize-1);
  entity.position.y = Helpers.getNumberWithinBoundaries(entity.position.y, 0, arenaSize-1);

  let newSquare = getSquare(squares, entity.position.x, entity.position.y);

  if (newSquare && newSquare.entity) {
    entity.position.x = oldPositionX;
    entity.position.y = oldPositionY;
  }

  // NO RETURN AS IT'S MODIFIED IN-PLACE return entity;
  // WHICH IS A BAD HABIT, BUT OH SO COMFY.
}

export function stopBreathingForKilledEntities(entity) {
  if(entity && entity.hp <= 0){
    entity.isBreathing = false;
    entity.hp = 0;
  }
  return entity;
}

export function getEntitiesAtGivenPosition(entities, targetPosition) {
  return entities.filter((potentialTargetEntity) => {
    return (
      potentialTargetEntity.position.x === targetPosition.x &&
      potentialTargetEntity.position.y === targetPosition.y
    );
  });
}

export function setSelected(entities, selected, value) {
  let selectedInEntities = this.findEntityById(
    entities,
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

export function checkAmmoAndCalculateDamageApplied(entity) {
  let damageApplied = 0;
  let weapon = entity.equipment && entity.equipment.hands;

  if(!weapon){return 0}
  if(weapon.isAbleToFire) {// if we still have ammo
    damageApplied = weapon.fire();
  }
  if(weapon.rounds === 0) {
    weapon.rounds = "empty";
  } else if(weapon.rounds === "empty") {
    // when ordered to shoot with "empty" magazine state, load ammo instead
    weapon.reload();
    entity.isShooting = false;
    //entity.damageApplied = 0;
  }

  return damageApplied;
}

export function fireAShot(entities, entity) {
  if(entity.ceaseFire) {
    entity.isShooting = false;
    entity.ceaseFire = false;
    return;
  }
  let damageApplied = this.checkAmmoAndCalculateDamageApplied(entity);
  let targetEntities =
    this.getEntitiesAtGivenPosition(entities, entity.targetPosition);
  targetEntities.forEach((targetEntity) => {
    this.applyDamageToTargetEntity(targetEntity, damageApplied);
    this.ceaseFireNextTickIfTargetIsKilled(entity, targetEntity);
  });
}

export function applyDamageToTargetEntity(targetEntity, damage) {
  if(damage) {
    targetEntity.hp -= damage;
    targetEntity.bleeding = 5;
  }
}

export function ceaseFireNextTickIfTargetIsKilled(entity, targetEntity) {
  if(targetEntity.hp < 0) {
    //entity.isShooting = false;
    entity.ceaseFire = true;
  }
}

export function isEntityShootingProperly(entity) {
  return entity.isShooting && entity.targetPosition && (
    entity.targetPosition.x !== entity.position.x ||
    entity.targetPosition.y !== entity.position.y
  );
}

export function applyEffectsOfBleeding(entity, squares) {
  if(entity.bleeding && entity.hp > 0) {
    entity.hp -= entity.bleeding ;
    let square = SquaresService.getSquare(squares, entity.position.x, entity.position.y);
    SquaresService.addBlood(square, entity.bleeding);
    entity.bleeding -= entity.bleedingReductionPerTurn || 1;
  }
  return entity;
}

export function moveEntityIntoChosenDestinations(selected, entity){
  if(entity.isBreathing && entity.moveDestination && selected) {
    entity.position = entity.moveDestination;
    selected.position = entity.position;
    delete entity.moveDestination;
  }
}

export function moveEntities(entities, squares, selected) {
  entities.forEach(
    entity => this.moveEntityIntoChosenDestinations(
      selected, entity
    )
  );
  let JR = this.findEntityById(entities, "John Rambo");
  let OP = this.findEntityById(entities, "Squid");
  this.moveEntityRandomly(squares, JR);
  this.moveEntityRandomly(squares, OP);
}

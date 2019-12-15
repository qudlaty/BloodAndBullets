import { Entity } from "../services/EntitiesValues";
import { Square } from "../services/SquaresService";


export function resetGivenFieldsOnACollection(collection, ...fieldNames) {
  collection.forEach(
    item => {
      fieldNames.forEach(fieldName => {
        item && (item[fieldName] = undefined)
      });
    }
  );
}

export function getNumberWithinBoundaries(
    value: number, min: number, max: number
  ): number {
  if( value < min) value = min;
  if( value > max) value = max;
  return value;
}

export function getRandomIntInclusive(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function calculateAngle(x: number, y: number): number {
  let angle: number;
  if(y >= 0) {
    angle = - Math.atan(
      x/y
    ) * (180/Math.PI);
  } else if(y < 0) {
    angle = (180/Math.PI) *
      (
        Math.atan(
          x/-y
        ) + Math.PI
      )
  }
  return angle;
}

export function calculateDistance(x: number,y: number): number {
  return Math.sqrt(
    Math.pow(x, 2) + Math.pow(y, 2)
  );
}


export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  // see https://www.typescriptlang.org/docs/handbook/mixins.html
  baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
          Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
      });
  });
}

export function isSelectedTargeted (selected: Entity, targeted: Square): boolean {
  if(selected && targeted && targeted.entity && selected.name === targeted.entity.name) {
    return true;
  }else {
    return false;
  }
}
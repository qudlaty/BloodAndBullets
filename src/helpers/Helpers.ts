import { Entity } from "../services/EntitiesValues";
import { Square } from "../services/SquaresService";

/** Takes a collection and a list of strings describing object keys. Sets all given fields on a collection to `undefined` */
export function resetGivenFieldsOnACollection(collection, ...fieldNames) {
  collection.forEach((item) => {
    fieldNames.forEach((fieldName) => {
      item && (item[fieldName] = undefined);
    });
  });
}

/** Takes a number and fits it within given boundaries, then returns it */
export function getNumberWithinBoundaries(value: number, min: number, max: number): number {
  if (value < min) value = min;
  if (value > max) value = max;
  return value;
}

/** Returns an integer between min and max */
export function getRandomIntInclusive(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Returns angle (in degrees) of a given vector */
export function calculateAngle(x: number, y: number): number {
  let angle: number;
  if (y >= 0) {
    angle = -Math.atan(x / y) * (180 / Math.PI);
  } else if (y < 0) {
    angle = (180 / Math.PI) * (Math.atan(x / -y) + Math.PI);
  }
  return angle;
}

/** Pitagorean distance between 0,0 and given coords */
export function calculateDistance(x: number, y: number): number {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

/** Mixing classess together */
export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  // see https://www.typescriptlang.org/docs/handbook/mixins.html
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
    });
  });
}

/** Checking if selected entity is on a targeted square */
export function isSelectedTargeted(selected: Entity, targeted: Square): boolean {
  if (selected && targeted && targeted.entity && selected.name === targeted.entity.name) {
    return true;
  } else {
    return false;
  }
}

/** Adding classess apropriate to the flags passed in by props */
export function turnFlagsIntoClasses(flags: object) {
  const flagsToClassess = {
    active: "active",
    isAvailableDestination: "is-available-destination",
    isChosenDestination: "is-chosen-destination",
    isBreathing: "breathing",
    isDead: "dead",
    isShooting: "shooting",
    isTargeted: "targeted",
    isLit: "is-lit",
    isInTwilightZone: "is-in-twilight-zone",
  };

  let className = "";

  Object.keys(flagsToClassess).forEach((key) => {
    if (flags[key]) {
      className += ` ${flagsToClassess[key]} `;
    }
  });
  return className;
}

import { Entity } from "services/EntitiesService";
import { Square } from "services/SquaresService";

/** @description
 * Takes a collection and a list of strings describing object keys.
 * Sets all given fields on a collection to `undefined`
 */
export function resetGivenFieldsOnACollection(collection, ...fieldNames) {
  collection.forEach((item) => {
    fieldNames.forEach((fieldName) => {
      item && (item[fieldName] = undefined);
    });
  });
}

/** @description Takes a number and fits it within given boundaries, then returns it */
export function getNumberWithinBoundaries(value: number, min: number, max: number): number {
  if (value < min) value = min;
  if (value > max) value = max;
  return value;
}

/** @description Returns a random integer between min and max */
export function getRandomIntInclusive(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** @description Returns angle (in degrees) of a given vector */
export function calculateAngle(x: number, y: number): number {
  let angle: number;
  if (y >= 0) {
    angle = -Math.atan(x / y) * (180 / Math.PI);
  } else if (y < 0) {
    angle = (180 / Math.PI) * (Math.atan(x / -y) + Math.PI);
  }
  return angle;
}

/** @description Pitagorean distance between 0,0 and given coords */
export function calculateDistance(x: number, y: number): number {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

/** @description Mixing classess together */
export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  // see https://www.typescriptlang.org/docs/handbook/mixins.html
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
    });
  });
}

/** @description Checking if selected entity is on a targeted square */
export function isSelectedTargeted(selected: Entity, targeted: Square): boolean {
  if (selected && targeted && targeted.entity && selected.name === targeted.entity.name) {
    return true;
  } else {
    return false;
  }
}

/**
 * @description
 * Adding classess apropriate to the flags passed in by props
 * @param classNameBase - if given, it is added in front of the classname with "--"
 * Eg: classNameBase--class-from-flag
 */
export function turnFlagsIntoClasses(flags: object, classNameBase?: string) {
  if(!flags) return '';
  const flagsToClassess = {
    active: "active",
    isAvailableDestination: "is-available-destination",
    isChosenDestination: "is-chosen-destination",
    isBreathing: "breathing",
    isDead: "dead",
    isShooting: "shooting",
    isTargeted: "targeted",
    isAttacked: "attacked",
    isLit: "is-lit",
    isInTwilightZone: "is-in-twilight-zone",
  };

  let className = "";

  if (classNameBase) {
    classNameBase += "--";
  } else {
    classNameBase = "";
  }

  Object.keys(flagsToClassess).forEach((key) => {
    if (flags[key]) {
      className += ` ${classNameBase}${flagsToClassess[key]}`;
    }
  });
  return className;
}

/**
 * @description
 * Creates a new array containing all the elements from a given array
 * @param array array to shallow-copy
 * @yields a new copy of the array
 */
export function newCopyOfArray(array: any[]) {
  return [].concat(array);
}

/**
 * @description
 * Returns a string with set of CSS classes
 * based on the flags found in the given square.
 * @param square a square to style
 * @yields string with all classess applicable for the given square
 */
export function getCssClassesForAGivenSquare(square: Square): string {
  if(!square) return;
  const squareClassNameBase = "square";
  let squareClassName = `${squareClassNameBase} ${square && square.squareType}`;
  squareClassName += turnFlagsIntoClasses(square, squareClassNameBase);
  if (square.entity) {
    squareClassName += turnFlagsIntoClasses(square.entity, squareClassNameBase);
  }
  return squareClassName;
}

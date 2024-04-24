import { M16, M40, L30 } from "./ItemDefinitions";
import { EntitiesService, Entity } from "services";

/**
 * @description Entities set loaded with the default map so far
 */
export const entitiesInitialValues = [
  {
    name: "Lazer Blady",
    hp: 75,
    maxHp: 100,
    icon: "🧑‍🚀",
    isFriendly: true,
    position: { x: 6, y: 8 },
    inventory: [new M16()],
    equipment: { hands: new L30() },
    actionPoints: 10,
    maxActionPoints: 10,
  },
  {
    name: "Robot",
    age: 1,
    hp: 50,
    maxHp: 50,
    icon: "🤖",
    isFriendly: true,
    isBreathing: false,
    position: { x: 2, y: 5 },
    equipment: { hands: new L30() },
    inventory: [new M16()],
    bleedingReductionPerTurn: 50,
  },
  {
    name: "Octo",
    hp: 200,
    maxHp: 200,
    icon: "🐙",
    position: { x: 8, y: 2 },
    bleedingReductionPerTurn: 0,
    bleeding: 1,
    equipment: { hands: new L30() },
  },
  {
    name: "Squid",
    hp: 100,
    maxHp: 100,
    icon: "🦑",
    position: { x: 4, y: 2 },
    equipment: { hands: new M40() },
  },
  {
    name: "Ant",
    age: 1,
    hp: 45,
    maxHp: 50,
    icon: "🐜",
    isBreathing: true,
    position: { x: 7, y: 5 },
    equipment: { hands: new M40() },
  },
  {
    name: "Henry The Spider",
    hp: 100,
    maxHp: 150,
    icon: "🕷️",
    position: { x: 9, y: 3 },
    equipment: { hands: new L30() },
  },
  {
    name: "Mosquito",
    hp: 12,
    maxHp: 20,
    icon: "🦟",
    position: { x: 0, y: 7 },
    equipment: { hands: new M16() },
    actionPoints: 1,
    maxActionPoints: 1,
  },
  {
    name: "Microbe",
    hp: 1,
    maxHp: 5,
    icon: "🦠",
    position: { x: 3, y: 8 },
    equipment: { hands: new L30() },
  },
];

// const addEntityToDefaultValues = entity => Object.assign({ ...defaultEntityValues }, entity);

// export const characterDefinitions = entitiesInitialValues
//   .map(entity => addEntityToDefaultValues(entity))
//   .map(entry => new Entity(entry));

export const characterDefinitions = EntitiesService.changeEntitiesIntoFullBlownObjects(entitiesInitialValues);

export default characterDefinitions;

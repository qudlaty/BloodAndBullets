import { M16, M40, L30 } from "./ItemDefinitions";
import { Entity } from "services";

export const entitiesInitialValues = [
  {
    name: "Lazer Blady",
    age: 60,
    hp: 75,
    maxHp: 100,
    icon: "🧑🏻",
    isBreathing: true,
    isFriendly: true,
    hasWeapon: true,
    position: { x: 4, y: 8 },
    inventory: [new M16()],
    equipment: {hands: new L30()},
    actionPoints: 2,
    maxActionPoints: 2
  },
  {
    name: "Robot",
    age: 1,
    hp: 50,
    maxHp: 50,
    icon: "🤖",
    isBreathing: false,
    position: { x: 3, y: 5 },
    equipment: {hands: new L30()},
    inventory: [],
    hasWeapon: true,
    actionPoints: 2,
    maxActionPoints: 2
  },
  {
    name: "Octo",
    age: 8,
    hp: 200,
    maxHp: 200,
    icon: "🐙",
    isBreathing: true,
    position: { x: 8, y: 2 },
    bleedingReductionPerTurn: 0,
    bleeding: 1,
    equipment: {hands: new L30()},
    inventory: [],
    hasWeapon: true,
    actionPoints: 2,
    maxActionPoints: 2
  },
  {
    name: "Squid",
    age: 5,
    hp: 100,
    maxHp: 100,
    icon: "🦑",
    isBreathing: true,
    position: { x: 5, y: 5 },
    equipment: {hands: new M40()},
    inventory: [],
    hasWeapon: true,
    actionPoints: 2,
    maxActionPoints: 2
  },
  {
    name: "Ant",
    age: 1,
    hp: 45,
    maxHp: 50,
    icon: "🐜",
    isBreathing: true,
    position: { x: 7, y: 6 },
    equipment: {hands: new M40()},
    inventory: [],
    hasWeapon: true,
    actionPoints: 2,
    maxActionPoints: 2
  },
  {
    name: "Henry The Spider",
    age: 1,
    hp: 100,
    maxHp: 150,
    icon: "🕷️",
    isBreathing: true,
    position: { x: 9, y: 3 },
    bleedingReductionPerTurn: 1,
    equipment: {hands: new L30()},
    inventory: [],
    hasWeapon: true,
    actionPoints: 2,
    maxActionPoints: 2
  },
  {
    name: "Mosquito",
    age: 1,
    hp: 12,
    maxHp: 20,
    icon: "🦟",
    isBreathing: true,
    position: { x: 2, y: 7 },
    equipment: {hands: new M16()},
    inventory: [],
    hasWeapon: true,
    actionPoints: 1,
    maxActionPoints: 1
  },
  {
    name: "Microbe",
    age: 1,
    hp: 1,
    maxHp: 5,
    icon: "🦠",
    isBreathing: true,
    position: { x: 1, y: 5 },
    equipment: {hands: new L30()},
    inventory: [],
    hasWeapon: true,
    actionPoints: 2,
    maxActionPoints: 2
  },
];

export const characterDefinitions = entitiesInitialValues.map((entry) => new Entity(entry));
export default characterDefinitions;

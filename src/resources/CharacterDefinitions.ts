import { M16, M40, L30, R40, G17, K01 } from "./ItemDefinitions";
import { EntitiesService, Entity } from "services";

/**
 * @description Entities set loaded with the default map so far
 */
export const entitiesInitialValues: Partial<Entity>[] = [
  {
    name: "Lazer Blady",
    rank: "Sergeant",
    description: "He's here to kick ass and chew bubble gum, and he's all out of gum.",
    hp: 75,
    maxHp: 100,
    icon: "🧑‍🚀",
    isFriendly: true,
    position: { x: 6, y: 8 },
    inventory: [new G17()],
    equipment: { hands: new L30() },
    actionPoints: 10,
    maxActionPoints: 10,
  },
  {
    name: "John Doe",
    rank: "Corporal",
    description: "Tough as nails. Been to many wars. He has seen things you wouldn't believe.",
    hp: 90,
    maxHp: 100,
    icon: "🧑",
    isFriendly: true,
    bleedingReductionPerTurn: 3,
    position: { x: 8, y: 9 },
    inventory: [new G17()],
    equipment: { hands: new M40() },
    actionPoints: 6,
    maxActionPoints: 6,
  },
  {
    name: "Robot",
    rank: "Asset",
    description:
      `DST-7 Security Droid. ` + //
      `Powered by an Energy Cell, it can stay in suspended animation for years ` +
      `and activate at a moment's notice to battle the intruders. Armed and armored.`,
    hp: 50,
    maxHp: 50,
    icon: "🤖",
    isFriendly: true,
    isBreathing: false,
    position: { x: 2, y: 5 },
    equipment: { hands: new R40() },
    inventory: [new K01()],
    bleedingReductionPerTurn: 50,
  },
  {
    name: "Octo",
    description:
      `Octopii are long lived and tough, ` + ///
      `but they suffer outside fluid environment and are vulnerable to bleeding.`,
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
    description:
      `Squids possess camouflage capabilities that allow them to blend with the environment and become unnoticable.` + //
      `They are not as strong as Octopii, but they are fast and they can handle heavy weapons with ease thanks to their strong tentacles.`,
    hp: 100,
    maxActionPoints: 5,
    maxHp: 100,
    icon: "🦑",
    position: { x: 4, y: 2 },
    equipment: { hands: new M40() },
  },
  {
    name: "Ant",
    description:
      `Formids are countless like grains of sand. Do not let them get out of control on your ship.` + //
      ``,
    hp: 45,
    maxHp: 50,
    icon: "🐜",
    isBreathing: true,
    position: { x: 7, y: 5 },
    equipment: { hands: new M16() },
  },
  {
    name: "Henry The Spider",
    description:
      `Friendly eight-eyed creature, helping to keep the ship bug-free. ` + //
      `Spacers say it's bad luck to kill a spider. Better keep it alive.`,
    hp: 100,
    maxHp: 150,
    maxActionPoints: 3,
    icon: "🕷️",
    position: { x: 9, y: 3 },
    equipment: { hands: new R40() },
  },
  {
    name: "Mosquito",
    description:
      `This blood sucking creature isn't very fast, but it can sustain itself on any blood it can find. ` + //
      `It's also efficient at stopping it's own bleeding. `,
    hp: 12,
    maxHp: 20,
    icon: "🦟",
    position: { x: 0, y: 7 },
    equipment: { hands: new M16() },
    actionPoints: 1,
    maxActionPoints: 1,
    bleedingReductionPerTurn: 5,
  },
  {
    name: "Microbe",
    description:
      `Space-bourne pathogens can be dangerous. ` + //
      `Luckily, they're also easily dispatched, at least in most cases. ` +
      `This specimen is enormous for a Microbe, but it is also very weak. `,
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

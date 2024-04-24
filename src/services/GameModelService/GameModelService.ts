import { SquaresService, Square } from "services/SquaresService";
import { EntitiesService, Entity } from "services/EntitiesService";

import { characterDefinitions } from "resources/CharacterDefinitions";
import intro from "resources/maps/intro.json";
import { GameActionsClassForGameComponent } from "services/GameActionsService";
import { L30, M16 } from "resources";
import { Item } from "services/ItemService";

/**
 * @description Handles loading and saving of the map and entities
 */
export class GameModelClass {
  generatedEntities;
  generatedEntitiesJSON;
  entities;
  squares;

  constructor() {
    this.entities = EntitiesService.entities;
    this.squares = SquaresService.squares;
    this.generatedEntities = [];
    this.generatedEntitiesJSON = {};
  }

  saveMap = () => {
    console.log("Alive suares:", SquaresService.squares);
    const squares: Square[] = JSON.parse(JSON.stringify(SquaresService.squares));
    const squaresProcessedForSave = squares.map(square => {
      //let newSquare = { squareType: square.squareType, entity: square.entity };

      return square;
    });
    const squaresStringified = JSON.stringify(squaresProcessedForSave);
    console.log(squaresStringified);
    const message = "Enter the name of saved map.";
    const mapName = "map00";

    const result = window.prompt(message, mapName);
    localStorage[result] = squaresStringified;
    window.prompt("Saved the following map as " + result, squaresStringified);
  };

  loadMap = (GameActions: GameActionsClassForGameComponent) => {
    const mapNames: any = Object.keys(localStorage);
    const message =
      `Enter the name of map to load.\n` +
      `Maps available in localStorage: ${mapNames}\n` +
      `Be aware item processing is not working fully yet.`;
    console.log(mapNames);
    const result = window.prompt(message, mapNames);
    if (!result) return;
    const squaresStringified = localStorage[result];
    if (!squaresStringified) return;
    console.log(squaresStringified);
    const squaresLoaded = JSON.parse(squaresStringified);
    this.loadSquaresIntoService(squaresLoaded);
    const loadedGeneratedEntities = JSON.parse(this.generatedEntitiesJSON);
    this.loadGeneratedEntitiesIntoService(loadedGeneratedEntities);
    console.log(EntitiesService.entities);
    EntitiesService.setSelected(EntitiesService.findEntityById("Lazer Blady G"));
    GameActions.setSelectedInStateAccordingToSelectedInEntitiesService();
    // GameActions.executeActions();
    //const entitiesWithinTheMap = squaresLoaded.filter(square => square.entities.length).map(square => square.entity);
    //console.log("Entities Within The Map:", entitiesWithinTheMap);

    function makeInstanceOfAWeapon(weaponRecord): Item {
      return new L30();
    }

    function processEquipmentForEntityOrEntityRecord(entity): any {
      if (entity.equipment && entity.equipment.hands) {
        entity.equipment.hands = makeInstanceOfAWeapon(entity.equipment.hands);
      }
      if (entity.inventory) {
        entity.inventory = entity.inventory.map(itemRecord => makeInstanceOfAWeapon(itemRecord));
      }
      return entity;
    }

    const entitiesProcessed = EntitiesService.entities.map(entity => processEquipmentForEntityOrEntityRecord(entity));

    console.log("ALIVE ENTITIES?", entitiesProcessed);
    this.loadEntitiesIntoService(entitiesProcessed); ///

    GameActions.setSquaresAccordingToEntities();
    GameActions.processInterface();
  };

  loadSquaresIntoService = squaresLoaded => {
    SquaresService.squares.forEach((square, index) => {
      const targetSquare = square;
      const sourceSquare = squaresLoaded[index];
      targetSquare.squareType = (sourceSquare && sourceSquare.squareType) || "floor";
      targetSquare.icon = (sourceSquare && sourceSquare.icon) || "";
      targetSquare.name = (sourceSquare && sourceSquare.name) || "";
      targetSquare.description = (sourceSquare && sourceSquare.description) || "";
    });
  };

  loadEntitiesIntoService = (entities: Entity[]) => {
    EntitiesService.entities = entities;
  };

  loadGeneratedEntitiesIntoService = (generatedEntities: any[]) => {
    EntitiesService.entities = EntitiesService.changeEntitiesIntoFullBlownObjects(generatedEntities);
  };

  loadBuiltInMap = () => {
    this.loadSquaresIntoService(intro);
  };

  loadPredefinedEntitities = () => {
    // TODO: Save and load entities together with the map?
    //console.log(this.generatedEntities, "geemnratedentites");
    console.log(characterDefinitions);
    this.loadEntitiesIntoService(characterDefinitions);
  };

  loadGeneratedEntitities = () => {
    //=load entities together with the map?
    this.loadGeneratedEntitiesIntoService(this.generatedEntitiesJSON);
  };

  //GENERATE RANDOM MAP :TODO move from here
  // create map with random squares types

  generateMAP = () => {
    function randomizeSquareTypeNumber(min: any, max: any) {
      return parseInt(Math.random() * (max - min) + min);
    }

    const arrMap = [];
    const squares = [...Array(100).keys()];
    let squareType = "wall";
    let id = 0;
    let idx = 0;
    let idy = 0;

    squares.forEach(square => {
      const ent = {
        bleedingReductionPerTurn: 1,
        isSupposedToBeBreathing: true,
        isPassable: false,
        actionPoints: 1,
        maxActionPoints: 1,
        hasWeapon: false,
        name: `Mosquito_${id}`,
        hp: 12,
        maxHp: 20,
        icon: "🦟",
        position: {
          x: idx,
          y: idy,
        },
      };

      if (squareType == "wall" || squareType == "nothing") {
        switch (randomizeSquareTypeNumber(0, 4)) {
          case 3:
            squareType = "floor";
            break;
          case 2:
            squareType = "floor";
            break;
          case 1:
            squareType = "wall";
            break;
          case 0:
            squareType = "floor";
            break;
        }
      } else {
        switch (randomizeSquareTypeNumber(0, 4)) {
          case 3:
            squareType = "floor";
            break;
          case 2:
            squareType = "floor";
            break;
          case 1:
            squareType = "wall";
            break;
          case 0:
            squareType = "nothing";
            break;
        }
      }
      const newSquare = {
        id: id,
        name: "",
        icon: "",
        squareType: squareType,
        entities: [],
        position: { x: idx, y: idy },
        description: "",
      };

      if (squareType == "floor") {
        if (
          arrMap.length > 1 &&
          (arrMap[arrMap.length - 1].entities.length != 0 || arrMap[arrMap.length - 2].entities.length != 0)
        ) {
          arrMap.push(newSquare);

          // console.log(
          //   arrMap[arrMap.length - 1].entities,
          //   "stop adding entity to floor square ",
          //   idx,
          //   idy,
          //   " if 1 or 2 squares before has entity *****"
          // );
        } else {
          newSquare.entities.push(ent);
          console.log("adding  entitty to map", squareType, newSquare, ent);
          arrMap.push(newSquare);
          this.generatedEntities.push(ent);
        }
      } else {
        arrMap.push(newSquare);
      }

      id++;
      if (id !== 0 && id % SquaresService.arenaSize == 0) {
        idx = 0;
        idy++;
      } else {
        idx++;
      }
    });
    //foreach end
    const lazerBlady = {
      isFriendly: true,
      bleedingReductionPerTurn: 1,
      isSupposedToBeBreathing: true,
      isPassable: false,
      actionPoints: 6,
      maxActionPoints: 10,
      hasWeapon: true,
      name: "Lazer Blady G",
      hp: 75,
      maxHp: 100,
      icon: "🧑‍🚀",
      position: {
        x: 6,
        y: 8,
      },
      inventory: [new M16()],
      equipment: {
        hands: new L30(),
      },
    };

    this.generatedEntities.push(lazerBlady);
    const targetSquareIndex = SquaresService.getSquareIndexFromPosition(lazerBlady.position.x, lazerBlady.position.y);
    arrMap[targetSquareIndex].entities.push(lazerBlady);
    console.log(arrMap, this.generatedEntities, "dupa blady");
    this.generatedEntitiesJSON = JSON.stringify(this.generatedEntities);
    const jsonMap = JSON.stringify(arrMap);
    localStorage.setItem("autoGenMap", jsonMap);
    this.generatedEntities = [];
    //console.log(this.generatedEntitiesJSON);
  };
}

export const GameModel = new GameModelClass();

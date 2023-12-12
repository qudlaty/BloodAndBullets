import { SquaresService, Square } from "services/SquaresService";
import { EntitiesService, Entity } from "services/EntitiesService";

import { characterDefinitions } from "resources/CharacterDefinitions";
import intro from "resources/maps/intro.json";
import { GameActionsClassForGameComponent } from "services/GameActionsService";
import { L30 } from "resources";
import { Item } from "services/ItemService";

/**
 * @description Handles loading and saving of the map and entities
 */
export class GameModelClass {
  entities;
  squares;
  selected;

  constructor() {
    this.entities = EntitiesService.entities;
    this.squares = SquaresService.squares;
  }

  saveMap = () => {
    console.log("Alive suares:", SquaresService.squares);
    const squares: Square[] = JSON.parse(JSON.stringify(SquaresService.squares));
    const squaresProcessedForSave = squares.map((square) => {
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

    const entitiesWithinTheMap = squaresLoaded.filter((square) => square.entity).map((square) => square.entity);
    console.log("Entities Within The Map:", entitiesWithinTheMap);

    function makeInstanceOfAWeapon(weaponRecord): Item {
      return new L30();
    }

    function processEquipmentForEntityRecord(entityRecord): any {
      if (entityRecord.equipment && entityRecord.equipment.hands) {
        entityRecord.equipment.hands = makeInstanceOfAWeapon(entityRecord.equipment.hands);
      }
      if (entityRecord.inventory) {
        entityRecord.inventory.map((itemRecord) => makeInstanceOfAWeapon(itemRecord));
      }
      return entityRecord;
    }

    const entitiesProcessed = entitiesWithinTheMap
      .map((entity) => processEquipmentForEntityRecord(entity))
      .map((entityRecord) => new Entity(entityRecord));

    console.log("ALIVE ENTITIES?", entitiesProcessed);
    this.loadEntitiesIntoService(entitiesProcessed); ///
    GameActions.setSquaresAccordingToEntities();
    GameActions.processInterface();
  };

  loadSquaresIntoService = (squaresLoaded) => {
    SquaresService.squares.forEach((square, index) => {
      const targetSquare = square;
      const sourceSquare = squaresLoaded[index];
      targetSquare.squareType = (sourceSquare && sourceSquare.squareType) || "floor";
      targetSquare.icon = (sourceSquare && sourceSquare.icon) || " ";
      targetSquare.name = (sourceSquare && sourceSquare.name) || " ";
      targetSquare.description = (sourceSquare && sourceSquare.description) || " ";
    });
  };

  loadEntitiesIntoService = (entities: Entity[]) => {
    EntitiesService.entities = entities;
  };

  loadBuiltInMap = () => {
    this.loadSquaresIntoService(intro);
  };

  loadPredefinedEntitities = () => {
    // TODO: Save and load entities together with the map?
    this.loadEntitiesIntoService(characterDefinitions);
  };
  //GENERATE RANDOM MAP
  // create map with random squares types
  getMap() {
    function randomizeSqureTypeNumber(min: any, max: any) {
      return parseInt(Math.random() * (max - min) + min);
    }

    const arrMap = [];
    const squares = [...Array(100).keys()];
    let squareType = "wall";
    let id = 0;
    let idx = 0;
    let idy = 0;

    squares.forEach((square) => {
      if (id != 0 && id % 10 == 0) {
        idx = 0;
        idy++;
      }
      if (squareType == "wall" || squareType == "nothing") {
        switch (randomizeSqureTypeNumber(0, 4)) {
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
        switch (randomizeSqureTypeNumber(0, 4)) {
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
      arrMap.push({
        id: id,
        name: " ",
        icon: " ",
        squareType: squareType,
        entities: [],
        position: { x: idx, y: idy },
        description: " ",
      });
      id++;
      idx++;
    });
    const jsonMap = JSON.stringify(arrMap);
    localStorage.setItem("autoGenMap", jsonMap);
  }
}

export const GameModel = new GameModelClass();

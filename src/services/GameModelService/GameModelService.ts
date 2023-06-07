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
    console.log('Alive suares:', SquaresService.squares);
    let squares: Square[] = JSON.parse(JSON.stringify(SquaresService.squares));
    let squaresProcessedForSave = squares.map((square) => {
      //let newSquare = { squareType: square.squareType, entity: square.entity };

      return square;
    });
    let squaresStringified = JSON.stringify(squaresProcessedForSave);
    console.log(squaresStringified);
    let message = "Enter the name of saved map.";
    let mapName = "map00";

    let result = window.prompt(message, mapName);
    localStorage[result] = squaresStringified;
    window.prompt("Saved the following map as " + result, squaresStringified);
  };

  loadMap = (GameActions: GameActionsClassForGameComponent) => {
    let mapNames: any = Object.keys(localStorage);
    let message = `Enter the name of map to load.\n`+
    `Maps available in localStorage: ${mapNames}\n`+
    `Be aware item processing is not working fully yet.`;
    console.log(mapNames);
    let result = window.prompt(message, mapNames);
    let squaresStringified = localStorage[result];

    console.log(squaresStringified);
    let squaresLoaded = JSON.parse(squaresStringified);
    this.loadSquaresIntoService(squaresLoaded);

    let entitiesWithinTheMap = squaresLoaded.filter(square => square.entity).map(square => square.entity);
    console.log('Entities Within The Map:', entitiesWithinTheMap);

    function makeInstanceOfAWeapon(weaponRecord): Item {
      return new L30();
    }

    function processEquipmentForEntityRecord(entityRecord): any {
      if(entityRecord.equipment && entityRecord.equipment.hands) {
        entityRecord.equipment.hands = makeInstanceOfAWeapon(entityRecord.equipment.hands)
      }
      if(entityRecord.inventory) {
        entityRecord.inventory.map(itemRecord => makeInstanceOfAWeapon(itemRecord));
      }
      return entityRecord;
    }

    let entitiesProcessed = entitiesWithinTheMap
          .map(entity => processEquipmentForEntityRecord(entity))
          .map(entityRecord => new Entity(entityRecord));

    console.log('ALIVE ENTITIES?', entitiesProcessed)
    this.loadEntitiesIntoService(entitiesProcessed);///
    GameActions.setSquaresAccordingToEntities();
    GameActions.processInterface();
  };

  loadSquaresIntoService = (squaresLoaded) => {
    SquaresService.squares.forEach((square, index) => {
      let targetSquare = square;
      let sourceSquare = squaresLoaded[index];
      targetSquare.squareType = (sourceSquare && sourceSquare.squareType) || 'floor';
      targetSquare.icon = (sourceSquare && sourceSquare.icon) || ' ';
      targetSquare.name = (sourceSquare && sourceSquare.name) || ' ';
      targetSquare.description = (sourceSquare && sourceSquare.description) || ' ';
    });
  };

  loadEntitiesIntoService = (entities: Entity[]) => {
    EntitiesService.entities = entities;
  };

  loadBuiltInMap = () => {
    this.loadSquaresIntoService(intro);
  };

  loadPredefinedEntitities = () => {// TODO: Save and load entities together with the map?
    this.loadEntitiesIntoService(characterDefinitions);
  };
}

export const GameModel = new GameModelClass();

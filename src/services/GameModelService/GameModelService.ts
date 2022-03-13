import { SquaresService, Square } from "services/SquaresService";
import { EntitiesService, Entity } from "services/EntitiesService";

import { characterDefinitions } from "resources/CharacterDefinitions";
import tutorial_map_00 from "resources/maps/tutorial_map_00.json"; // yes, it's a resource named with snake_case
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
  };

  loadMap = (GameActions: GameActionsClassForGameComponent) => {
    let mapNames: any = Object.keys(localStorage);
    let message = `Enter the name of map to load. ${mapNames}`;
    let mapName = "map00";
    console.log(mapNames);
    let result = window.prompt(message, mapNames);
    let squaresStringified = localStorage[result];

    console.log(squaresStringified);
    let squaresLoaded = JSON.parse(squaresStringified);
    this.loadMapIntoBoard(squaresLoaded);

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

    let entitiesProcessed = entitiesWithinTheMap.
    map(entity => processEquipmentForEntityRecord(entity)).
    map(entityRecord => new Entity(entityRecord));

    console.log('ALIVE ENTITIES?', entitiesProcessed)
    this.loadEntities(entitiesProcessed);///
    GameActions.setSquaresAccordingToEntities();
    GameActions.processInterface();
  };

  loadMapIntoBoard = (squaresLoaded) => {
    SquaresService.squares.forEach((square, index) => {
      let targetSquare = square;
      let sourceSquare = squaresLoaded[index];
      targetSquare.squareType = (sourceSquare && sourceSquare.squareType) || 'floor';
    });
  };

  loadEntities = (entities: Entity[]) => {
    EntitiesService.entities = entities;
  };

  loadBuiltInMap = () => {
    this.loadMapIntoBoard(intro);
  };

  loadPredefinedEntitities = () => {// TODO: Save and load entities together with the map?
    this.loadEntities(characterDefinitions);
  };
}

export const GameModel = new GameModelClass();

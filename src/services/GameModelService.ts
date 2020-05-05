import { SquaresService, Square } from "./SquaresService";
import { EntitiesService } from "./EntitiesService";
import tutorial_map_00 from "../resources/maps/tutorial_map_00.json"; // yes, it's a resource named with snake_case
import entities, { entitiesInstances } from "../resources/Entities";

class GameModelClass {
  entities;
  squares;

  constructor() {
    this.entities = EntitiesService.entities;
    this.squares = SquaresService.squares;
  }

  saveMap = () => {
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

  loadMap = () => {
    let mapNames = Object.keys(localStorage);
    let message = `Enter the name of map to load. ${mapNames}`;
    let mapName = "map00";
    let result = window.prompt(message, mapName);
    let squaresStringified = localStorage[result];

    console.log(squaresStringified);
    let squaresLoaded = JSON.parse(squaresStringified);
    this.loadMapIntoBoard(squaresLoaded);
  };

  loadMapIntoBoard = (squaresLoaded) => {
    SquaresService.squares.forEach((square, index) => {
      let targetSquare = square;
      let sourceSquare = squaresLoaded[index];
      targetSquare.squareType = sourceSquare.squareType;
    });
  };

  loadEntities = (entities) => {
    EntitiesService.entities = entitiesInstances;
  };

  loadBuiltInMap = () => {
    this.loadMapIntoBoard(tutorial_map_00);
  };

  loadPredefinedEntitities = () => {
    this.loadEntities(entitiesInstances);
  };
}

let GameModel = new GameModelClass();

export default GameModel;

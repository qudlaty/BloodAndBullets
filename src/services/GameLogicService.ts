import GameModel from "./GameModelService";

class GameLogicClass {
  run = () => {
    console.log("Running Game Logic");
    GameModel.access();
    console.log(GameModel.entities);
  };
}

const GameLogic = new GameLogicClass();
export default GameLogic;

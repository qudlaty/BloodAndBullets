import Entities from '../components/Game/EntitiesValues';

class GameModelClass {
  constructor( { Entities = [] } = {} ) {
    this.entities = Entities;
  }
  access() {
    console.log("Accessing Game Model");
    console.log(this.entities);
  }
}

let GameModel = new GameModelClass({Entities});
export default GameModel;

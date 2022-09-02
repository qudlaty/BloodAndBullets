import { GameModel, GameModelClass } from "services/GameModelService";
import { GameState } from "services/GameLogicService/GameState";

import { SquaresService, Square } from "services/SquaresService";
import { EntitiesService, Entity } from "services/EntitiesService";
import * as Helpers from "helpers";
import { MessageService } from "services/MessageService";

enum scriptTypes {
  entityPresent = 'entity-present',
  allEntitiesDead = 'all-entities-dead',
}

class ScriptsServiceClass {
  scripts = [
    {
      what: scriptTypes.entityPresent,
      where: {x: 9, y: 9},
      who: 'Lazer Blady',
      condition: 'alive', // dead, hpGreaterThan, hpLessThan, havingEquipment
      params: [],//

      result: {
        action: 'message',// 'switch power', 'open', 'spawn'
        params: ['You have reached the exit. You have won the game.']
      }
    }
  ];
  constructor() {
    console.debug(JSON.stringify(this.scripts))
  }

  runScripts = (param) => {
    this.scripts.forEach((script) => this.runScript(script));
  }

  runScript(script) {
    //runnning a script
    console.log('Running script.', script);

    if(this.isConditionFullfilled(script)) {
      this.executeResult(script);
    }
  }

  isConditionFullfilled(script): boolean {
    switch (script.what) {
      case scriptTypes.entityPresent:
        if(!script.where) break;// unless we're talking "everywhere"
        let entitiesFoundAtLocationGiven = EntitiesService.getEntitiesAtGivenPosition(script.where);
        console.log(`There are ${entitiesFoundAtLocationGiven.length} entities at ${script.where.x}, ${script.where.y}`);
        let isAnyEntityPresentAtGivenLocation = entitiesFoundAtLocationGiven.length > 0;
        if(!script.who) {
          return isAnyEntityPresentAtGivenLocation;
        } else {// we have "who"
          let isGivenEntityFoundAtGivenLocation = false;
          entitiesFoundAtLocationGiven.forEach((entityAtLocation) => {
            if(entityAtLocation.name === script.who)  {
              isGivenEntityFoundAtGivenLocation = true;
            }
          });

          return isGivenEntityFoundAtGivenLocation
        }

        break;
      default:
    }

    return false;
  }

  executeResult(script) {
    switch (script.result.action) {
      case 'message':
        MessageService.send(script.result.params[0]);
        break;
      default:
    }
  }

}

export const ScriptsService = new ScriptsServiceClass();
export default ScriptsService;
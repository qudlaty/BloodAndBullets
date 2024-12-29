import { EntitiesService, Entity } from "services/EntitiesService";
import { MessageService } from "services/MessageService";

enum scriptTypes {
  entityPresent = "entity-present",
  allEntitiesDead = "all-entities-dead",
}

class ScriptsServiceClass {
  scripts = [
    {
      what: scriptTypes.entityPresent,
      where: { x: 8, y: 8 },
      who: "Lazer Blady",
      condition: "alive", // dead, hpGreaterThan, hpLessThan, havingEquipment
      params: [], //

      result: {
        action: "message", // 'switch power', 'open', 'spawn'
        params: ["You have reached the exit. You have won the game."],
      },
    },
    {
      what: scriptTypes.entityPresent,
      where: { x: 6, y: 8 },
      who: "Lazer Blady",
      condition: "alive", // dead, hpGreaterThan, hpLessThan, havingEquipment
      params: [], //

      result: {
        action: "load-map", // 'switch power', 'open', 'spawn'
        params: ["A2"],
      },
    },
    {
      what: scriptTypes.entityPresent,
      where: { x: 4, y: 9 },
      condition: "alive", // dead, hpGreaterThan, hpLessThan, havingEquipment
      params: [], //

      result: {
        action: "heal", // 'switch power', 'open', 'spawn'
        params: [],
      },
    },
    {
      what: scriptTypes.entityPresent,
      where: { x: 5, y: 8 },
      condition: "alive", // dead, hpGreaterThan, hpLessThan, havingEquipment
      params: [], //

      result: {
        action: "move", // 'switch power', 'open', 'spawn'
        params: [{ x: 0, y: 0 }],
      },
    },
    {
      what: scriptTypes.entityPresent,
      where: { x: 0, y: 1 },
      result: {
        action: "move",
        params: [{ x: 0, y: 9 }],
      },
    },
  ];
  constructor() {
    console.debug(JSON.stringify(this.scripts));
  }

  runScripts = param => {
    this.scripts.forEach(script => this.runScript(script));
  };

  runScript(script) {
    //runnning a script
    console.log("Running script.", script);

    if (this.isConditionFullfilled(script)) {
      this.executeResult(script);
    }
  }

  isConditionFullfilled(script): boolean {
    switch (script.what) {
      case scriptTypes.entityPresent: {
        if (!script.where) break; // unless we're talking "everywhere"
        const entitiesFoundAtLocationGiven = EntitiesService.getEntitiesAtGivenPosition(script.where);
        console.log(
          `There are ${entitiesFoundAtLocationGiven.length} entities at ${script.where.x}, ${script.where.y}`
        );
        const isAnyEntityPresentAtGivenLocation = entitiesFoundAtLocationGiven.length > 0;
        if (!script.who) {
          return isAnyEntityPresentAtGivenLocation;
        } else {
          // we have "who"
          let isGivenEntityFoundAtGivenLocation = false;
          entitiesFoundAtLocationGiven.forEach(entityAtLocation => {
            if (entityAtLocation.name === script.who) {
              isGivenEntityFoundAtGivenLocation = true;
            }
          });

          return isGivenEntityFoundAtGivenLocation;
        }
      }
      default:
    }

    return false;
  }

  executeResult(script) {
    switch (script.result.action) {
      case "message":
        MessageService.send(script.result.params[0]);
        break;
      case "load-map":
        console.log("Going to loadMap", script.result.params[0]);
        // TODO: GameModel.loadMapByName(script.result.params[0]);
        break;
      case "heal": {
        console.log(`Going to heal ${script.where.x},${script.where.y}`);
        const entitiesFoundAtLocationGiven = EntitiesService.getEntitiesAtGivenPosition(script.where);
        entitiesFoundAtLocationGiven.forEach((entityAtLocation: Entity) => {
          const entity = entityAtLocation;
          MessageService.send(`Healing ${entity.name} from ${entity.hp} to ${entity.maxHp}`);

          entityAtLocation.hp = entityAtLocation.maxHp;
        });
        break;
      }
      case "move": {
        console.log(`Going to heal ${script.where.x},${script.where.y}`);
        const entitiesFoundAtLocationGiven = EntitiesService.getEntitiesAtGivenPosition(script.where);
        entitiesFoundAtLocationGiven.forEach((entityAtLocation: Entity) => {
          const entity = entityAtLocation;
          const e = entity;
          const targetDestination = script.result.params[0];
          MessageService.send(`Moving ${entity.name} from ${e.position.x}, ${e.position.y} to
          ${targetDestination.x},${targetDestination.y}`);

          //entityAtLocation.hp = entityAtLocation.maxHp;
          entity.position.x = targetDestination.x;
          entity.position.y = targetDestination.y;
        });
        break;
      }
      default:
    }
  }
}

export const ScriptsService = new ScriptsServiceClass();
export default ScriptsService;

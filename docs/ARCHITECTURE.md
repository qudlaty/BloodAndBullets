# General rethinking of Blood and Bullets architecture approach - version 1

## Background

We have started this project as a way to learn some React in a fun way, and that heavily influenced the path which it's evolution took.

- We had game state within React Component state
- We had no services to manage
- We didn't plan much for scalability or reusability
- We kinda just winged it

This approach resulted in a codebase that at times was very hard to manage (The Great Rewrite of `handleClick()`) and also didn't achieve decent separation of concerns between the displaying logic and the simulation logic, among other problems, like low code reusability in some areas.

## What would be nice to do now

- First, totally and truly decouple simulation logic and display logic
  - Simulation logic could be written in pure TypeScript, framework agnostic
- Make every component reusable and unaware of any other components
- Introduce some new concepts allowing to move the project in a playable direction with all necessary mechanics in place.

## New Concepts

- `Mission` - a set of scenes (and cutscenes as scripts within them).
- `SceneDefinition` - a combination of a
  - `Map`,
  - `InitialPosition` of our hero on a said map
    This could be `Entrance`
  - a set of `Entities`,
    - including their `Position`s and statuses
  - `Scripts` including win conditions, `CutScenes` and everything else that is required to make a working "Level/Scene"
    Scripts could also define if the hero state is copied from previous scene, or loaded from this scene definition.
    This should be writable as a JSON file.

Example `SceneDefinition` could look like:

```
scene0: {
  map: {},
  initialPosition: {},
  entities: [],
  scripts: [{
    condition: {
      type: 'OnRoomLoad',
    }
    action: {
      type: 'TransferHeroFromPreviousRoom',
      // params: {
      //  targetPositionChoice: 'initialPosition',
      // }
    }
  }],
}
```

- `Script` - an action executed upon fulfilled condition
  - `Actions` (and actionParams)
    - `LoadMission` (missionName: string, initialPosition: [number, number])
      This would be used on an Exit square
    - `GameOver` (message: string)
    - `DisplayCutScene` (sceneName: string, sceneParams: object)
    - `DisplayMessage` (message: string)
    - `DisplayDialog` (dialogId: string) // and then we need to define structure for dialogs
  - `Condition`
    - `EnemiesAlive` (lessThan: number | equalTo: number)
    - `FriendliesAlive` (greaterThan: number | equalTo: number)
    - `FriendlyWithinArea` (areaName: string)

Example script could look like

```
{
  scripts: [
    {// GameOverScript
      condition: {
        type: 'FriendliesAlive',
        params: {
          equalTo: 0,
        }
      }
      action: {
        type: 'GameOver',
        params: {
          message: 'Everyone is dead',
        }
      }
    }// /GameOverScript
  ]
}
```

Or a script to exit the current map and enter the MessHall

```
{
  scripts: [
    {// ExitToMessHall
      condition: {
        type: 'HeroInArea',
        params: {
          targetAreaName: 'exitToMessHall',
        }
      }
      action: {
        type: 'LoadMission',
        params: {
          missionName: 'MessHallE04',
          initialPosition: [4,3],
        }
      }
    }// /ExitToMessHall
  ]
}
```

## New possibilities

With abovementioned concepts of `Mission` and `Script`s we could load a particular `Mission` or a particular `Map` depending on a condition, like character entering particular area, or character activating a dialog option. This would allow for elevators, teleporters, etc.

We could also load a particular mission with a push of a button.

We could chain stuff, like loading a particular mission would first load a `CutScene` then load a mission at the end of the `CutScene`

## Crucial aspects of the new approach

We should probably focus on just one hero for now, always selected. It would simplify a lot of aspects regarding clicked stuff.

- We should separate the shape of the map from contents of the map
  - perhaps represent the shape of the map in 2d array with just numbers for cell types
  - keep entities on a separate list
- Weapons should be abstracted as a set of properties, just like Entities

```
weapon: {
  name: string
  description: string
  shotDamage: number
  bleedingApplied: number
  energyDelivered: number // in J
  magSize: number
  reloadCostInAP: number
  visualization: {
    name: 'beam',
    params: {
      color: string
      width: number
      animation: {
        name: string
        params: {

        }
      }
    }
  }
}
```

For now we could have an internal list of weapons but this type of definition allows for infinite modability (remember Liero?)

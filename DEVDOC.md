# Dev documentation

## Environment set up

### Sass support

To have sass support on Windows, you will need to install windows-build-tools first.

Run PowerShell as an Administrator and then:

`npm install --global --production windows-build-tools`

After that you can just `npm install` and SASS should be working.

## Concepts

### The concept of **tick** vs the concept of **turn**.

- **Turn** is a part of a higher-level game logic, concerning who (which side of a conflict) is allowed to execute actions. There is also a limit of how many actions you can take during a turn (action points).

- **Tick** is the smallest unit of game-time, during which the state of the game is unaltered, but the next state can be calculated.
  Transition to next tick is triggered by the timer driving the game loop.

Initially, we have a new tick every 1 second.

### Actions

- Clicking an entity while nothing is selected
- Changes the "state.selected" field
- Clicking an entity while something is selected.
- Changes the "state.selected" again, if entity is friendly
- Changes the "state.selected.targetPosition" if not
- Clicking a "Nuke all" button
- Changes hp on all entities

Question: So actions change state within a tick, how should that be related to the tick calculating next game state?

### Keeping game state in a component state?

#### Pros:

- setState updater ensures previous state change is completed
- one data model for logic and for display (this might actually be a bad thing)

#### Cons:

- recommended immutability of react.state stops us from doing OOP fully
  - too bad for immutability \o/
  
## Helpful links
https://www.reddit.com/r/roguelikedev/comments/2vptbj/faq_friday_4_world_architecture/



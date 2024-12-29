import{j as n}from"./jsx-runtime-BjgbQsUx.js";import{useMDXComponents as i}from"./index-DLZJTL_W.js";import{ao as a,aw as s}from"./index-BK1G4c8a.js";import"./index-D2MAbzvX.js";import"./index-DEBVq0NN.js";import"./iframe-DrKbE3xZ.js";import"../sb-preview/runtime.js";import"./index-CTOC-uzv.js";import"./index-D-8MO0q_.js";import"./index-CHGET4sZ.js";import"./index-DrFu-skq.js";const r=`# Dev documentation

## Environment set up

### Sass support

To have sass support on Windows, you will need to install windows-build-tools first.

Run PowerShell as an Administrator and then:

\`npm install --global --production windows-build-tools@4.0.0\`

After that you can just \`npm install\` and SASS should be working.

### Typescript version from Workspace

To read and interpret tsconfig.json file, you need to switch VSCode to the
Typescript version used by Workspace. Do that by: 0. Open a \`.ts\` file

1. Open Command Pallete \`Ctrl+Shift+P\`
2. Type part of \`TypeScript: select TypeScript Version\` to find this option and select it
3. Select \`Use Workspace Version\`
   VSCode will now properly interpret the tsconfig.json

### Auto-linting configuration

Install following plugins in Visual Studio Code:

- ESLint
- Prettier - Code formatter

The .vscode directory contained within this repo should take care of setting up Prettier as your default formatter and enabling "Format on Save" functionality.

---

## Concepts and problems

### The concept of **action** vs the concept of a **turn**.

- **Turn** is a part of a higher-level game logic, concerning who (which side of a conflict) is allowed to execute actions. There is also a limit of how many actions you can take during a turn (action points).

  - After player executes their action and ends the turn, everything else also executes actions and we again wait for player input = next turn.

- **Action** is the smallest event that is actively changing game state.

### Actions

- Clicking an entity while nothing is selected
  - Changes the "state.selected" field
- Clicking an entity while something is selected.
  - Changes the "state.selected" again, if entity is friendly
  - Changes the "state.selected.targetPosition" if not
- Clicking a "Nuke all" button
  - Changes hp on all entities
- ...

Perhaps we should talk about the following concepts:

- interface state (selection, targeting, camera position)
- instant actions (within our turn), changing the GameState, moving, shooting, inventory changes
- queued actions (like walking, shooting) that need to be animated over multiple ticks. ???

**Bonus** - Actions nicely relate to redux architecture.

---

## State Management

### Keeping game state in a component state?

#### Pros:

- setState updater ensures previous state change is completed
- one data model for logic and for display (this might actually be a bad thing)

#### Cons:

- recommended immutability of react.state stops us from doing OOP fully
  - too bad for immutability \\o/
- It is sometimes necessary to pass a callback down a hierarchy of components, so it could be called from the most nested one and alter the state in the least nested one.
  This is kinda bad and hard to maintain.

##### Current state of COMPONENT interlinking

- **Game**
  - \`onClick\` **imported here**
  - \`processInterface\` **imported here**
  - \`onInventoryClick\` **imported here**
  - **Board** - component displaying the main grid of the game\\*\\*
    - **\`onClick\`** - only used to pass down to \`Square\`
    - **SquareComponent**
      - **\`onClick\`** - consumed locally
      - **Blood** - pure component displaying the amount of blood
      - **Items** - pure component displaying items in the square
    - **EntityPawn** - calculates entity position on the map, determines animations for breathing, shooting
      - **ShootingVisualization** - gets direct access to entity
  - **MessageBox** - independent auto-scrolling message log component
  - **SelectedEntityInfo** - component framing an entity card with few classess and a button
    - **\`processInterface\`**
    - **\`onInventoryClick\`**
    - **EntityCard**
    - // TODO: Should be changed into higher-order-component
      https://reactjs.org/docs/higher-order-components.html
  - **TargetedSquareInfo** - component framing inventory list, blood counter
    - **\`processInterface\`**
    - **EntityCard**
    - **InventoryList**

## Possible alternatives:

### Context (not bad)

### Redux (nice, but not exactluy known for simplicity)

### Hooks (apparently the modern way to go)
`;function o(t){return n.jsxs(n.Fragment,{children:[n.jsx(a,{title:"Documentation/DEVDOCS"}),`
`,n.jsx(s,{children:r})]})}function C(t={}){const{wrapper:e}={...i(),...t.components};return e?n.jsx(e,{...t,children:n.jsx(o,{...t})}):o()}export{C as default};

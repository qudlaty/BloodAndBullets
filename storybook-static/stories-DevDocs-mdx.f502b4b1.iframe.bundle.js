"use strict";(self.webpackChunkBloodAndBullets=self.webpackChunkBloodAndBullets||[]).push([[772],{"./src/stories/DevDocs.mdx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>DevDocs}),__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),lib=__webpack_require__("./node_modules/@mdx-js/react/lib/index.js"),dist=__webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs");function _createMdxContent(props){return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(dist.h_,{title:"Documentation/DEVDOCS"}),"\n",(0,jsx_runtime.jsx)(dist.UG,{children:'# Dev documentation\n\n## Environment set up\n\n### Sass support\n\nTo have sass support on Windows, you will need to install windows-build-tools first.\n\nRun PowerShell as an Administrator and then:\n\n`npm install --global --production windows-build-tools@4.0.0`\n\nAfter that you can just `npm install` and SASS should be working.\n\n### Typescript version from Workspace\n\nTo read and interpret tsconfig.json file, you need to switch VSCode to the\nTypescript version used by Workspace. Do that by: 0. Open a `.ts` file\n\n1. Open Command Pallete `Ctrl+Shift+P`\n2. Type part of `TypeScript: select TypeScript Version` to find this option and select it\n3. Select `Use Workspace Version`\n   VSCode will now properly interpret the tsconfig.json\n\n### Auto-linting configuration\n\nInstall following plugins in Visual Studio Code:\n\n- ESLint\n- Prettier - Code formatter\n\nThe .vscode directory contained within this repo should take care of setting up Prettier as your default formatter and enabling "Format on Save" functionality.\n\n---\n\n## Concepts and problems\n\n### The concept of **action** vs the concept of a **turn**.\n\n- **Turn** is a part of a higher-level game logic, concerning who (which side of a conflict) is allowed to execute actions. There is also a limit of how many actions you can take during a turn (action points).\n\n  - After player executes their action and ends the turn, everything else also executes actions and we again wait for player input = next turn.\n\n- **Action** is the smallest event that is actively changing game state.\n\n### Actions\n\n- Clicking an entity while nothing is selected\n  - Changes the "state.selected" field\n- Clicking an entity while something is selected.\n  - Changes the "state.selected" again, if entity is friendly\n  - Changes the "state.selected.targetPosition" if not\n- Clicking a "Nuke all" button\n  - Changes hp on all entities\n- ...\n\nPerhaps we should talk about the following concepts:\n\n- interface state (selection, targeting, camera position)\n- instant actions (within our turn), changing the GameState, moving, shooting, inventory changes\n- queued actions (like walking, shooting) that need to be animated over multiple ticks. ???\n\n**Bonus** - Actions nicely relate to redux architecture.\n\n---\n\n## State Management\n\n### Keeping game state in a component state?\n\n#### Pros:\n\n- setState updater ensures previous state change is completed\n- one data model for logic and for display (this might actually be a bad thing)\n\n#### Cons:\n\n- recommended immutability of react.state stops us from doing OOP fully\n  - too bad for immutability \\o/\n- It is sometimes necessary to pass a callback down a hierarchy of components, so it could be called from the most nested one and alter the state in the least nested one.\n  This is kinda bad and hard to maintain.\n\n##### Current state of COMPONENT interlinking\n\n- **Game**\n  - `onClick` **imported here**\n  - `processInterface` **imported here**\n  - `onInventoryClick` **imported here**\n  - **Board** - component displaying the main grid of the game\\*\\*\n    - **`onClick`** - only used to pass down to `Square`\n    - **SquareComponent**\n      - **`onClick`** - consumed locally\n      - **Blood** - pure component displaying the amount of blood\n      - **Items** - pure component displaying items in the square\n    - **EntityPawn** - calculates entity position on the map, determines animations for breathing, shooting\n      - **ShootingVisualization** - gets direct access to entity\n  - **MessageBox** - independent auto-scrolling message log component\n  - **SelectedEntityInfo** - component framing an entity card with few classess and a button\n    - **`processInterface`**\n    - **`onInventoryClick`**\n    - **EntityCard**\n    - // TODO: Should be changed into higher-order-component\n      https://reactjs.org/docs/higher-order-components.html\n  - **TargetedSquareInfo** - component framing inventory list, blood counter\n    - **`processInterface`**\n    - **EntityCard**\n    - **InventoryList**\n\n## Possible alternatives:\n\n### Context (not bad)\n\n### Redux (nice, but not exactluy known for simplicity)\n\n### Hooks (apparently the modern way to go)\n'})]})}let DevDocs=function(props={}){let{wrapper:MDXLayout}=Object.assign({},(0,lib.ah)(),props.components);return MDXLayout?(0,jsx_runtime.jsx)(MDXLayout,Object.assign({},props,{children:(0,jsx_runtime.jsx)(_createMdxContent,props)})):_createMdxContent(props)}}}]);
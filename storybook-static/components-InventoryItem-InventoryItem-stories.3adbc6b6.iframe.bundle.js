"use strict";(self.webpackChunkBloodAndBullets=self.webpackChunkBloodAndBullets||[]).push([[264],{"./src/components/InventoryItem/InventoryItem.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{L30ShowingNoInteract:()=>L30ShowingNoInteract,M16ShowingNoDrop:()=>M16ShowingNoDrop,M37CustomInteractButtonText:()=>M37CustomInteractButtonText,M40ShorterDisplayAndCustomInteractText:()=>M40ShorterDisplayAndCustomInteractText,R40ShowingNoReload:()=>R40ShowingNoReload,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__}),__webpack_require__("./node_modules/react/index.js");var _InventoryItem__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/InventoryItem/InventoryItem.tsx"),resources__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/resources/index.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");let __WEBPACK_DEFAULT_EXPORT__={component:_InventoryItem__WEBPACK_IMPORTED_MODULE_1__.R,args:{},parameters:{storySource:{source:'import type { Meta, StoryObj } from "@storybook/react";\nimport React from "react";\nimport { InventoryItem } from "./InventoryItem";\nimport { L30, M16, M37, M40, R40 } from "resources";\n\nconst meta: Meta<typeof InventoryItem> = {\n  component: InventoryItem,\n  args: {},\n  parameters: {\n    layout: "fullscreen",\n  },\n  render: args => (\n    <div\n      style={{\n        //\n        height: "300px",\n        width: "100%",\n        background: "#191919",\n        color: "#a0a0a0",\n        fontFamily: "sans-serif",\n      }}\n    >\n      <InventoryItem {...args}></InventoryItem>\n    </div>\n  ),\n};\n\nexport default meta;\ntype Story = StoryObj<typeof meta>;\n\nexport const R40ShowingNoReload: Story = {\n  args: {\n    item: new R40(),\n  },\n};\nexport const L30ShowingNoInteract: Story = {\n  args: {\n    item: new L30(),\n    onInteract: null,\n  },\n};\nexport const M16ShowingNoDrop: Story = {\n  args: {\n    item: new M16(),\n    onDrop: null,\n  },\n};\nexport const M37CustomInteractButtonText: Story = {\n  args: {\n    item: new M37(),\n    interactButtonText: "Handle",\n  },\n};\nexport const M40ShorterDisplayAndCustomInteractText: Story = {\n  args: {\n    item: new M40(),\n    shorterDisplay: true,\n    interactButtonText: "Pick up",\n  },\n};\n',locationsMap:{"r-40-showing-no-reload":{startLoc:{col:41,line:31},endLoc:{col:1,line:35},startBody:{col:41,line:31},endBody:{col:1,line:35}},"l-30-showing-no-interact":{startLoc:{col:43,line:36},endLoc:{col:1,line:41},startBody:{col:43,line:36},endBody:{col:1,line:41}},"m-16-showing-no-drop":{startLoc:{col:39,line:42},endLoc:{col:1,line:47},startBody:{col:39,line:42},endBody:{col:1,line:47}},"m-37-custom-interact-button-text":{startLoc:{col:50,line:48},endLoc:{col:1,line:53},startBody:{col:50,line:48},endBody:{col:1,line:53}},"m-40-shorter-display-and-custom-interact-text":{startLoc:{col:61,line:54},endLoc:{col:1,line:60},startBody:{col:61,line:54},endBody:{col:1,line:60}}}},layout:"fullscreen"},render:args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div",{style:{height:"300px",width:"100%",background:"#191919",color:"#a0a0a0",fontFamily:"sans-serif"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_InventoryItem__WEBPACK_IMPORTED_MODULE_1__.R,{...args})})},R40ShowingNoReload={args:{item:new resources__WEBPACK_IMPORTED_MODULE_2__.UT}},L30ShowingNoInteract={args:{item:new resources__WEBPACK_IMPORTED_MODULE_2__.qC,onInteract:null}},M16ShowingNoDrop={args:{item:new resources__WEBPACK_IMPORTED_MODULE_2__.LQ,onDrop:null}},M37CustomInteractButtonText={args:{item:new resources__WEBPACK_IMPORTED_MODULE_2__.wI,interactButtonText:"Handle"}},M40ShorterDisplayAndCustomInteractText={args:{item:new resources__WEBPACK_IMPORTED_MODULE_2__.vE,shorterDisplay:!0,interactButtonText:"Pick up"}};R40ShowingNoReload.parameters={...R40ShowingNoReload.parameters,docs:{...R40ShowingNoReload.parameters?.docs,source:{originalSource:"{\n  args: {\n    item: new R40()\n  }\n}",...R40ShowingNoReload.parameters?.docs?.source}}},L30ShowingNoInteract.parameters={...L30ShowingNoInteract.parameters,docs:{...L30ShowingNoInteract.parameters?.docs,source:{originalSource:"{\n  args: {\n    item: new L30(),\n    onInteract: null\n  }\n}",...L30ShowingNoInteract.parameters?.docs?.source}}},M16ShowingNoDrop.parameters={...M16ShowingNoDrop.parameters,docs:{...M16ShowingNoDrop.parameters?.docs,source:{originalSource:"{\n  args: {\n    item: new M16(),\n    onDrop: null\n  }\n}",...M16ShowingNoDrop.parameters?.docs?.source}}},M37CustomInteractButtonText.parameters={...M37CustomInteractButtonText.parameters,docs:{...M37CustomInteractButtonText.parameters?.docs,source:{originalSource:'{\n  args: {\n    item: new M37(),\n    interactButtonText: "Handle"\n  }\n}',...M37CustomInteractButtonText.parameters?.docs?.source}}},M40ShorterDisplayAndCustomInteractText.parameters={...M40ShorterDisplayAndCustomInteractText.parameters,docs:{...M40ShorterDisplayAndCustomInteractText.parameters?.docs,source:{originalSource:'{\n  args: {\n    item: new M40(),\n    shorterDisplay: true,\n    interactButtonText: "Pick up"\n  }\n}',...M40ShorterDisplayAndCustomInteractText.parameters?.docs?.source}}};let __namedExportsOrder=["R40ShowingNoReload","L30ShowingNoInteract","M16ShowingNoDrop","M37CustomInteractButtonText","M40ShorterDisplayAndCustomInteractText"]},"./src/components/InfoPanelSwitchButton/InfoPanelSwitchButton.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{p:()=>InfoPanelSwitchButton_InfoPanelSwitchButton});var react=__webpack_require__("./node_modules/react/index.js"),InfoPanel=__webpack_require__("./src/components/InfoPanel/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function InfoPanelSwitchButton_InfoPanelSwitchButton(props){let[isPanelOpen,setIsPanelOpen]=(0,react.useState)(!1),switchPanelState=()=>{console.log("Panel",isPanelOpen),setIsPanelOpen(previousValue=>!previousValue)};return(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("button",{className:"info-panel-switch-button",onClick:switchPanelState,children:"ⓘ"}),isPanelOpen&&(0,jsx_runtime.jsx)(InfoPanel.V,{...props,onClose:switchPanelState})]})}try{InfoPanelSwitchButton_InfoPanelSwitchButton.displayName="InfoPanelSwitchButton",InfoPanelSwitchButton_InfoPanelSwitchButton.__docgenInfo={description:"",displayName:"InfoPanelSwitchButton",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},item:{defaultValue:null,description:"",name:"item",required:!0,type:{name:"Item"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/InfoPanelSwitchButton/InfoPanelSwitchButton.tsx#InfoPanelSwitchButton"]={docgenInfo:InfoPanelSwitchButton_InfoPanelSwitchButton.__docgenInfo,name:"InfoPanelSwitchButton",path:"src/components/InfoPanelSwitchButton/InfoPanelSwitchButton.tsx#InfoPanelSwitchButton"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/InfoPanelSwitchButton/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{p:()=>_InfoPanelSwitchButton__WEBPACK_IMPORTED_MODULE_0__.p});var _InfoPanelSwitchButton__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/InfoPanelSwitchButton/InfoPanelSwitchButton.tsx")},"./src/components/InfoPanel/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{V:()=>_InfoPanel__WEBPACK_IMPORTED_MODULE_0__.V});var _InfoPanel__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/InfoPanel/InfoPanel.tsx")},"./src/components/InventoryItem/InventoryItem.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{R:()=>InventoryItem_InventoryItem}),__webpack_require__("./node_modules/react/index.js");var services=__webpack_require__("./src/services/index.ts"),LinearDisplay=__webpack_require__("./src/components/LinearDisplay/index.ts"),InfoPanelSwitchButton=__webpack_require__("./src/components/InfoPanelSwitchButton/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function InventoryItem_InventoryItem(props){let reloadButton,dropButton,interactButton,ammoCounter;let{item}=props,componentClassName="inventory-item";if(props.onDrop&&(dropButton=(0,jsx_runtime.jsx)("button",{className:"\n          ".concat(componentClassName+"__button","\n          ").concat(componentClassName+"__button-drop","\n        "),onClick:()=>{props.onDrop(item.name)},children:"Drop ↘"})),props.onInteract&&(interactButton=(0,jsx_runtime.jsx)("button",{className:"\n          ".concat(componentClassName+"__button","\n          ").concat(componentClassName+"__button-interact","\n        "),onClick:()=>props.onInteract(item.name),children:props.interactButtonText||"Interact"})),item instanceof services.mq){if(!item.reload||!props.onReload||item instanceof services.qS)reloadButton=null;else{let buttonClassName="".concat(componentClassName,"__button-reload");0===item.charges||"empty"===item.charges?buttonClassName+=" ".concat(buttonClassName,"--empty"):item.charges<item.maxCharges&&(buttonClassName+=" ".concat(buttonClassName,"--partial"));let finalButtonClassName="".concat(componentClassName,"__button")+" "+buttonClassName;reloadButton=(0,jsx_runtime.jsxs)("button",{className:finalButtonClassName,onClick:()=>{props.onReload&&props.onReload(item),props.processInterface&&props.processInterface()},children:["Reload (",item.reloadCostInAP,"AP)"]})}ammoCounter=item.reload&&props.shorterDisplay?" (".concat(item.charges,")"):(0,jsx_runtime.jsx)(LinearDisplay.O,{className:"full",label:item.type==services.vD.energy?"Charges":"Rounds",current:item.charges,max:item.maxCharges})}return(0,jsx_runtime.jsxs)("div",{className:"inventory-item",children:[(0,jsx_runtime.jsxs)("div",{className:"inventory-item__body",children:[(0,jsx_runtime.jsx)("span",{children:item.name}),ammoCounter,(0,jsx_runtime.jsx)(InfoPanelSwitchButton.p,{item:item})]},item.name),(0,jsx_runtime.jsxs)("div",{className:"inventory-item__button-group",children:[reloadButton,interactButton,dropButton]})]},item.id)}try{InventoryItem_InventoryItem.displayName="InventoryItem",InventoryItem_InventoryItem.__docgenInfo={description:"",displayName:"InventoryItem",props:{item:{defaultValue:null,description:"",name:"item",required:!0,type:{name:"Item"}},interactButtonText:{defaultValue:null,description:"",name:"interactButtonText",required:!1,type:{name:"string"}},shorterDisplay:{defaultValue:null,description:"",name:"shorterDisplay",required:!1,type:{name:"boolean"}},onDrop:{defaultValue:null,description:"",name:"onDrop",required:!1,type:{name:"(itemName: string) => any"}},onReload:{defaultValue:null,description:"",name:"onReload",required:!1,type:{name:"(weapon: RangedWeapon) => any"}},onInteract:{defaultValue:null,description:"",name:"onInteract",required:!1,type:{name:"(itemName: string) => any"}},processInterface:{defaultValue:null,description:"",name:"processInterface",required:!1,type:{name:"() => any"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/InventoryItem/InventoryItem.tsx#InventoryItem"]={docgenInfo:InventoryItem_InventoryItem.__docgenInfo,name:"InventoryItem",path:"src/components/InventoryItem/InventoryItem.tsx#InventoryItem"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/LinearDisplay/LinearDisplay.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>LinearDisplay_LinearDisplay}),__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function LinearDisplay_LinearDisplay(props){let className="linear-display ".concat(props.className||""),percentage=~~(100*props.current/props.max),overload=percentage>100,negative=percentage<0;overload&&(percentage=100,className+=" linear-display--overloaded"),negative&&(percentage=0);let progressStyle={width:"".concat(percentage,"%")},title=props.title||"".concat(props.current,"/").concat(props.max),amount=props.current,divider=1;props.max>=40&&props.max<100?divider=5:props.max>=100&&(divider=10);let gridSize=100/(amount/=divider),color="rgba(200,200,200,0.4)";return color="black",Object.assign(progressStyle,{backgroundSize:"".concat(gridSize,"% 100%"),backgroundImage:"\n      linear-gradient(to left, ".concat(color," 1px, transparent 1px)\n    ")}),(0,jsx_runtime.jsxs)("div",{className:className,children:[(0,jsx_runtime.jsxs)("div",{className:"linear-display__label",children:[props.label,props.label?":":""," "]}),(0,jsx_runtime.jsx)("div",{className:"linear-display__bar-container",title:title,children:(0,jsx_runtime.jsx)("div",{className:"linear-display__bar-progress",style:progressStyle,children:(0,jsx_runtime.jsxs)("span",{className:"linear-display__bar-progress-text",children:[props.current,overload?"/"+props.max:""," "]})})}),(0,jsx_runtime.jsx)("div",{children:" "})]})}try{LinearDisplay_LinearDisplay.displayName="LinearDisplay",LinearDisplay_LinearDisplay.__docgenInfo={description:"",displayName:"LinearDisplay",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},current:{defaultValue:null,description:"",name:"current",required:!0,type:{name:"number"}},max:{defaultValue:null,description:"",name:"max",required:!0,type:{name:"number"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/LinearDisplay/LinearDisplay.tsx#LinearDisplay"]={docgenInfo:LinearDisplay_LinearDisplay.__docgenInfo,name:"LinearDisplay",path:"src/components/LinearDisplay/LinearDisplay.tsx#LinearDisplay"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/LinearDisplay/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{O:()=>_LinearDisplay__WEBPACK_IMPORTED_MODULE_0__.O});var _LinearDisplay__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/components/LinearDisplay/LinearDisplay.tsx")}}]);
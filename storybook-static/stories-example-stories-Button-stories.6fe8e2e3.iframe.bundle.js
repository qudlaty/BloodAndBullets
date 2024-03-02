"use strict";(self.webpackChunkBloodAndBullets=self.webpackChunkBloodAndBullets||[]).push([[301],{"./src/stories/example-stories/Button.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Large:()=>Large,LargeRed:()=>LargeRed,Primary:()=>Primary,Secondary:()=>Secondary,Small:()=>Small,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});let __WEBPACK_DEFAULT_EXPORT__={title:"Example/Button",component:__webpack_require__("./src/stories/example-components/Button.tsx").z,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{backgroundColor:{control:"color"}}},Primary={args:{primary:!0,label:"Button"}},Secondary={args:{label:"Button"}},Large={args:{size:"large",label:"Button"}},Small={args:{size:"small",label:"Button"}},LargeRed={args:{size:"large",label:"Button",backgroundColor:"red"}};Primary.parameters={...Primary.parameters,docs:{...Primary.parameters?.docs,source:{originalSource:'{\n  args: {\n    primary: true,\n    label: "Button"\n  }\n}',...Primary.parameters?.docs?.source}}},Secondary.parameters={...Secondary.parameters,docs:{...Secondary.parameters?.docs,source:{originalSource:'{\n  args: {\n    label: "Button"\n  }\n}',...Secondary.parameters?.docs?.source}}},Large.parameters={...Large.parameters,docs:{...Large.parameters?.docs,source:{originalSource:'{\n  args: {\n    size: "large",\n    label: "Button"\n  }\n}',...Large.parameters?.docs?.source}}},Small.parameters={...Small.parameters,docs:{...Small.parameters?.docs,source:{originalSource:'{\n  args: {\n    size: "small",\n    label: "Button"\n  }\n}',...Small.parameters?.docs?.source}}},LargeRed.parameters={...LargeRed.parameters,docs:{...LargeRed.parameters?.docs,source:{originalSource:'{\n  args: {\n    size: "large",\n    label: "Button",\n    backgroundColor: "red"\n  }\n}',...LargeRed.parameters?.docs?.source}}};let __namedExportsOrder=["Primary","Secondary","Large","Small","LargeRed"]},"./src/stories/example-components/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{z:()=>Button}),__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");let Button=_ref=>{let{primary=!1,size="medium",backgroundColor,label,...props}=_ref;return(0,jsx_runtime.jsx)("button",{type:"button",className:["storybook-button","storybook-button--".concat(size),primary?"storybook-button--primary":"storybook-button--secondary"].join(" "),style:{backgroundColor},...props,children:label})};try{Button.displayName="Button",Button.__docgenInfo={description:"Primary UI component for user interaction",displayName:"Button",props:{primary:{defaultValue:{value:"false"},description:"Is this the principal call to action on the page?",name:"primary",required:!1,type:{name:"boolean"}},backgroundColor:{defaultValue:null,description:"What background color to use",name:"backgroundColor",required:!1,type:{name:"string"}},size:{defaultValue:{value:"medium"},description:"How large should the button be?",name:"size",required:!1,type:{name:"enum",value:[{value:'"small"'},{value:'"medium"'},{value:'"large"'}]}},label:{defaultValue:null,description:"Button contents",name:"label",required:!0,type:{name:"string"}},onClick:{defaultValue:null,description:"Optional click handler",name:"onClick",required:!1,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stories/example-components/Button.tsx#Button"]={docgenInfo:Button.__docgenInfo,name:"Button",path:"src/stories/example-components/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}}}]);
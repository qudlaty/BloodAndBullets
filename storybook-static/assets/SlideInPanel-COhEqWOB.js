import{j as e}from"./jsx-runtime-BjgbQsUx.js";import{r as m}from"./index-DEBVq0NN.js";function p({title:n,children:a,className:i,initiallyOpen:t}){const[r,o]=m.useState(t),s="slide-in-panel",l=`
    ${s} 
    ${s}${r?"--shown":"--hidden"} 
    ${i||""}
  `,d=()=>{o(c=>!c)};return e.jsxs("div",{className:l,children:[e.jsx("div",{className:"slide-in-panel__tab",onClick:d,title:n,children:n}),e.jsx("div",{className:"slide-in-panel__content",children:a})]})}p.__docgenInfo={description:"A panel that slides in from the right",methods:[],displayName:"SlideInPanel",props:{className:{required:!1,tsType:{name:"string"},description:""},title:{required:!1,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"union",raw:"ReactNode | ReactNode[]",elements:[{name:"ReactNode"},{name:"Array",elements:[{name:"ReactNode"}],raw:"ReactNode[]"}]},description:""},initiallyOpen:{required:!0,tsType:{name:"boolean"},description:""}}};export{p as S};

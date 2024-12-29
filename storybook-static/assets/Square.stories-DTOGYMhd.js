import{j as d}from"./jsx-runtime-BjgbQsUx.js";import{d as b}from"./FancyButton-CvFMwiez.js";import"./InventoryItem-D8StE-3N.js";import"./InfoPanel-PTV2Oowe.js";import"./SlideInPanel-BwJf2swz.js";import{v as J}from"./v4-CQkTLCs1.js";const{addons:Q}=__STORYBOOK_MODULE_PREVIEW_API__,{ImplicitActionsDuringRendering:X}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__,{global:O}=__STORYBOOK_MODULE_GLOBAL__;var Z="storybook/actions",ee=`${Z}/action-event`,te={depth:10,clearOnStoryChange:!0,limit:50},W=(e,t)=>{let r=Object.getPrototypeOf(e);return!r||t(r)?r:W(r,t)},re=e=>!!(typeof e=="object"&&e&&W(e,t=>/^Synthetic(?:Base)?Event$/.test(t.constructor.name))&&typeof e.persist=="function"),oe=e=>{if(re(e)){let t=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));t.persist();let r=Object.getOwnPropertyDescriptor(t,"view"),o=r==null?void 0:r.value;return typeof o=="object"&&(o==null?void 0:o.constructor.name)==="Window"&&Object.defineProperty(t,"view",{...r,value:Object.create(o.constructor.prototype)}),t}return e},se=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?J():Date.now().toString(36)+Math.random().toString(36).substring(2);function ne(e,t={}){let r={...te,...t},o=function(...m){var l,g;if(t.implicit){let y=(l="__STORYBOOK_PREVIEW__"in O?O.__STORYBOOK_PREVIEW__:void 0)==null?void 0:l.storyRenders.find(p=>p.phase==="playing"||p.phase==="rendering");if(y){let p=!((g=window==null?void 0:window.FEATURES)!=null&&g.disallowImplicitActionsInRenderV8),_=new X({phase:y.phase,name:e,deprecated:p});if(p)console.warn(_);else throw _}}let Y=Q.getChannel(),F=se(),U=5,u=m.map(oe),$=m.length>1?u:u[0],G={id:F,count:0,data:{name:e,args:$},options:{...r,maxDepth:U+(r.depth||3),allowFunction:r.allowFunction||!1}};Y.emit(ee,G)};return o.isAction=!0,o.implicit=t.implicit,o}const ae={component:b,argTypes:{onClick:{action:"clicked"}},render:e=>d.jsx(d.Fragment,{children:d.jsx("div",{style:ie,children:d.jsx(b,{...e})})})},ie={fontSize:"40px"},s={args:{squareId:0,blood:10,items:[],itemsNumber:5}},n={args:{squareId:0,blood:0,items:[],itemsNumber:0}},a={args:{squareId:0,blood:5,items:[],itemsNumber:1}},i={args:{squareId:0,blood:20,items:[],itemsNumber:5}},c={args:{squareId:0,onClick:ne("clicked"),blood:40,items:[],itemsNumber:5}};var f,S,E,h,I;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    squareId: 0,
    blood: 10,
    items: [],
    itemsNumber: 5
  }
}`,...(E=(S=s.parameters)==null?void 0:S.docs)==null?void 0:E.source},description:{story:"A typical square",...(I=(h=s.parameters)==null?void 0:h.docs)==null?void 0:I.description}}};var R,v,j,D,q;n.parameters={...n.parameters,docs:{...(R=n.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    squareId: 0,
    blood: 0,
    items: [],
    itemsNumber: 0
  }
}`,...(j=(v=n.parameters)==null?void 0:v.docs)==null?void 0:j.source},description:{story:"Just an empty square",...(q=(D=n.parameters)==null?void 0:D.docs)==null?void 0:q.description}}};var N,w,A,P,T;a.parameters={...a.parameters,docs:{...(N=a.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    squareId: 0,
    blood: 5,
    items: [],
    itemsNumber: 1
  }
}`,...(A=(w=a.parameters)==null?void 0:w.docs)==null?void 0:A.source},description:{story:"Light amount of blood",...(T=(P=a.parameters)==null?void 0:P.docs)==null?void 0:T.description}}};var x,L,V,B,C;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    squareId: 0,
    blood: 20,
    items: [],
    itemsNumber: 5
  }
}`,...(V=(L=i.parameters)==null?void 0:L.docs)==null?void 0:V.source},description:{story:"Heavy amount of blood",...(C=(B=i.parameters)==null?void 0:B.docs)==null?void 0:C.description}}};var H,k,z,K,M;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    squareId: 0,
    onClick: action("clicked"),
    blood: 40,
    items: [],
    itemsNumber: 5
  }
}`,...(z=(k=c.parameters)==null?void 0:k.docs)==null?void 0:z.source},description:{story:"Super Heavy amount of blood and an action attached",...(M=(K=c.parameters)==null?void 0:K.docs)==null?void 0:M.description}}};const ce=["Default","Empty","Light","Heavy","SuperHeavy"],ye=Object.freeze(Object.defineProperty({__proto__:null,Default:s,Empty:n,Heavy:i,Light:a,SuperHeavy:c,__namedExportsOrder:ce,default:ae},Symbol.toStringTag,{value:"Module"}));export{i as H,a as L,ye as S};

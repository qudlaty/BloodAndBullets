import{j as r}from"./jsx-runtime-BjgbQsUx.js";import{D as a,B as l}from"./FancyButton-gAOkaTTZ.js";import"./InventoryItem-Bcjw4VTU.js";import"./InfoPanel-D_MNkzzn.js";import"./SlideInPanel-COhEqWOB.js";import{Twenty as p}from"./Board.stories-HVMhFoCy.js";import"./index-D2MAbzvX.js";import"./index-DEBVq0NN.js";import"./InfoPanelSwitchButton-BT22HSZM.js";const i={fontSize:"40px",width:300,height:300,border:"1px solid white",overflow:"hidden",position:"relative"},b={component:a,render:e=>r.jsx("div",{style:i,children:r.jsx(a,{...e})})},n={args:{children:[]}},s=e=>r.jsx("div",{style:i,children:r.jsx(a,{...e,children:r.jsx("pre",{children:"Lorem ipsum dolor sit amet"})})}),o=e=>r.jsx("div",{style:i,children:r.jsx(a,{...e,children:r.jsx(l,{...p.args,size:10})})}),t=e=>r.jsx("div",{style:i,children:r.jsx(a,{...e,children:r.jsx(l,{...p.args,size:10,isRotated:!0})})}),d=e=>r.jsx("div",{style:i,children:r.jsx(a,{...e,centeredOn:".square:nth-child(4)",children:r.jsx(l,{...p.args,size:10,isRotated:!0})})}),c={args:{children:["L"]}};s.__docgenInfo={description:"",methods:[],displayName:"SimpleText"};o.__docgenInfo={description:"",methods:[],displayName:"WithBoard"};t.__docgenInfo={description:"",methods:[],displayName:"WithBoardRotated"};d.__docgenInfo={description:"",methods:[],displayName:"WithBoardRotatedCenteredOnTarget"};var m,g,h;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    children: []
  }
}`,...(h=(g=n.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var u,y,S;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`args => <div style={containerStyle}>\r
    <DragScrollArea {...args}>\r
      <pre>Lorem ipsum dolor sit amet</pre>\r
    </DragScrollArea>\r
  </div>`,...(S=(y=s.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var x,B,j;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`args => <div style={containerStyle}>\r
    <DragScrollArea {...args}>\r
      <Board {...Twenty.args as BoardProps} size={10}></Board>\r
    </DragScrollArea>\r
  </div>`,...(j=(B=o.parameters)==null?void 0:B.docs)==null?void 0:j.source}}};var v,R,f;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`args => <div style={containerStyle}>\r
    <DragScrollArea {...args}>\r
      <Board {...Twenty.args as BoardProps} size={10} isRotated={true}></Board>\r
    </DragScrollArea>\r
  </div>`,...(f=(R=t.parameters)==null?void 0:R.docs)==null?void 0:f.source}}};var D,T,_;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`args => <div style={containerStyle}>\r
    <DragScrollArea {...args} centeredOn=".square:nth-child(4)">\r
      <Board {...Twenty.args as BoardProps} size={10} isRotated={true}></Board>\r
    </DragScrollArea>\r
  </div>`,...(_=(T=d.parameters)==null?void 0:T.docs)==null?void 0:_.source}}};var A,W,w;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    children: ["L"]
  }
}`,...(w=(W=c.parameters)==null?void 0:W.docs)==null?void 0:w.source}}};const k=["Empty","SimpleText","WithBoard","WithBoardRotated","WithBoardRotatedCenteredOnTarget","Light"];export{n as Empty,c as Light,s as SimpleText,o as WithBoard,t as WithBoardRotated,d as WithBoardRotatedCenteredOnTarget,k as __namedExportsOrder,b as default};

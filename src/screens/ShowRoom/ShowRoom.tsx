import React from "react";
import { HudPanel, Grid, Controls, EmojiMapper, HpBar, InventoryItem, LinearDisplay, SquareComponent } from "components";
import "./ShowRoom.scss";
import { DragScrollArea } from "components/DragScrollArea";
import { M16 } from "resources";

const noop = ()=>{}

export class ShowRoom extends React.Component<void, void> {
  constructor(props: void) {
    super(props);
  }

  showRoomList = [
    { name: "Square",
      content: <SquareComponent squareId={1} onClick={noop} blood={7} items={[]} itemsNumber={3}/>
    },
    { name: "Controls",
      content: <Controls keys={["q","e"]} onKeyPress={(e)=>{console.log('ehlo', e)}}></Controls>
    },
    { name: "EmojiMapper",
      content: <> 🛢️ => <EmojiMapper emoji="🛢️"/>, 🕷️ => <EmojiMapper emoji="🕷️"/> </>
    },
    { name: "HpBar 66/100",
      content: <HpBar current={66} max={100} color="green"></HpBar>
    },
    { name: "HpBar 80/100 white",
      content: <HpBar current={66} max={100} color="white"></HpBar>
    },

    { name: "HpBar 0/100",
      content: <HpBar current={0} max={100} color="green"></HpBar>
    },
    { name: "HpBar -20/100",
      content: <HpBar current={-20} max={100} color="green"></HpBar>
    },
    { name: "HpBar 150/100",
      content: <HpBar current={150} max={100} color="green"></HpBar>
    },

    { name: "InventoryItem",
      content: <InventoryItem item={ new M16()} onDrop={noop} onReload={noop} onClick={noop} processInterface={noop}/>
    },
    { name: "LinearDisplay 66/100",
      content: <LinearDisplay title="Title" label="Label" current={66} max={100}></LinearDisplay>
    },
    { name: "LinearDisplay 0/10",
      content: <LinearDisplay title="Title" label="Label" current={0} max={10}></LinearDisplay>
    },
    { name: "LinearDisplay 20/25",
      content: <LinearDisplay title="Title" label="Label" current={20} max={25}></LinearDisplay>
    },
    { name: "LinearDisplay 30/25",
      content: <LinearDisplay title="Title" label="Label" current={30} max={25}></LinearDisplay>
    },
    { name: "LinearDisplay -3/25",
      content: <LinearDisplay title="Title" label="Label" current={-3} max={25}></LinearDisplay>
    },
    { name: "LinearDisplay with no label",
      content: <LinearDisplay current={13} max={20}></LinearDisplay>
    },


  ];



  render() {
    const theListToRender = this.showRoomList.map(
      item => item.name ?
        <li>
          <span className="description">
            {item.name}
          </span>
          <div className="content">
            {item.content}
          </div>
        </li>
        : null
    );
    return <div className="show-room">
      <desc>
      Show Room to present some of our components.
      <p>Be aware than this exposed some problems with the components working in isolation from the context they were designed for. A great opportunity for improvements.</p>
      </desc>
      <ul>
        {theListToRender}
      </ul>
   </div>;
  }
}
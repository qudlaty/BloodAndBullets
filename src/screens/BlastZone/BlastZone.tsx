import React from "react";
import { HudPanel, Grid, Controls } from "components";
import "./BlastZone.scss";
import { DragScrollArea } from "components/DragScrollArea";

interface BlastZoneState {
  gridX: number,
  gridY: number,
}
export class BlastZone extends React.Component<void, BlastZoneState> {
  constructor(props: void) {
    super(props);
    this.state = {
      gridX: 0,
      gridY: 0,
    };
  }
  componentDidMount() {
  }

  onControlPress(key) {
    let deltaX = 0;
    let deltaY = 0;
    switch(key) {
      case "w":
        deltaY = -1;
        break;
      case "s":
        deltaY = 1;
        break;

      case "a":
        deltaX = -1;
        break;
      case "d":
        deltaX = 1;
        break;
    }

    console.log(key);
    this.setState(prevState => {
      return {
        gridX: prevState.gridX + deltaX,
        gridY: prevState.gridY + deltaY
      };
    });
  }

  render() {

    const controls = <Controls
      keys={['W', 'S', 'A', 'D']}
      onKeyPress={(e) => this.onControlPress(e)}
      ></Controls>;
    const console = <></>;
    const statusIndicators = <></>;

    return <div className="blast-zone">
      <div className="top-row">
        <HudPanel title="Controls">
          {controls}
        </HudPanel>
        <HudPanel title="Console">
          {console}
        </HudPanel>
        <HudPanel title="Status Indicators">
          {statusIndicators}
        </HudPanel>
      </div>
      <div className="mid-row">
        <HudPanel title="Tactical Grid">
          <DragScrollArea>
            <Grid width={100} height={100} startAt={[this.state.gridX,this.state.gridY]}></Grid>
          </DragScrollArea>
        </HudPanel>
      </div>

      <div className="bottom-row">
        <HudPanel title="OhWell">
          <span>:)</span>
        </HudPanel>
      </div>
    </div>;
  }
}
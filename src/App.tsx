import React from "react";
import { Game } from "./components";
import { BlastZone }  from "screens/BlastZone";
import { ShowRoom } from "screens/ShowRoom";

import "App.scss";

interface AppState {
  loadedScene: string
}

const availableScreensList = [
  'Game',
  'BlastZone',
  'ShowRoom',
]

export default class App extends React.Component<void, AppState> {

  scenes:{} = {
    Game,
    BlastZone,
    ShowRoom,
  }
  SelectedScene = null;
  constructor(props: void) {
    super(props);
    this.state = {
      loadedScene: 'Game'
    }
  }
  componentDidMount() {
  }

  handleChange = (e) => {
    // e.target.value;
    console.log(e)
    console.log(e.target)
    console.log(e.target.value)
    const sceneToLoad = e.target.value;
    this.setState(prevState => {return {loadedScene: sceneToLoad}});
  }

  render() {
    let SelectedScene = this.scenes[this.state.loadedScene];

    const availableScreenSwitchOptions = availableScreensList.map(
      item => <option value={item}>{item}</option>
    );
    return <div className="app">

      <div className="meta-bar">

        <div className="app-name">
          <span className="be">B</span>lood and <span className="be">B</span>u<span className="el">ll</span>ets
        </div>

        <div className="screen-switch">
          <span>Select screen: </span>
          <select value={this.state.loadedScene} onChange={(e)=>this.handleChange(e)}>
            {availableScreenSwitchOptions}
          </select>
        </div>

      </div>

      <SelectedScene/>

    </div>
  }
}
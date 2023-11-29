import React, { ReactElement } from "react";
import { Game } from "./components";
import { BlastZone }  from "screens/BlastZone";
import { ShowRoom } from "screens/ShowRoom";

import "App.scss";

interface AppState {
  activeSceneName: string
}

const availableScreenNames = [
  'Game',
  'BlastZone',
  'ShowRoom',
]

export default class App extends React.Component<void, AppState> {

  sceneComponents:{} = {
    Game,
    BlastZone,
    ShowRoom,
  }

  SelectedSceneComponent = null;

  constructor(props: void) {
    super(props);
    this.state = {
      activeSceneName: 'Game'
    }
  }

  componentDidMount() {
  }

  handleChange = (e) => {
    const nameOfSelectedScene = e.target.value;
    this.setState(prevState => { return { activeSceneName: nameOfSelectedScene }});
  }



  render() {
    let SelectedScene = this.sceneComponents[this.state.activeSceneName];

    const availableScreenSwitchOptions = availableScreenNames.map(
      stringToOption
    );
    return <div className="app">

      <div className="meta-bar">

        <div className="app-name">
          <span className="be">B</span>lood and <span className="be">B</span>u<span className="el">ll</span>ets
        </div>

        <div className="screen-switch">
          <span>Select screen: </span>
          <select value={this.state.activeSceneName} onChange={this.handleChange}>
            {availableScreenSwitchOptions}
          </select>
        </div>

      </div>

      <SelectedScene/>

    </div>
  }
}

/**
 * @description
 * Makes a dropdown option out of a given string
 * @param item a string to put into value and innerText
 * @returns an option element with given value and text
 */
export const stringToOption = (item: string): ReactElement => <option key={item} value={item}>{item}</option>
import React, { ReactElement } from "react";
import { Game } from "./components";
import { BlastZone } from "screens/BlastZone";
import { ShowRoom } from "screens/ShowRoom";

import "App.scss";

interface AppState {
  activeSceneName: string;
}

const availableSceneNames = ["Game", "BlastZone", "ShowRoom"];

export default class App extends React.Component<void, AppState> {
  sceneComponents: object = {
    Game,
    BlastZone,
    ShowRoom,
  };

  SelectedSceneComponent = null;

  constructor(props: void) {
    super(props);
    this.state = {
      activeSceneName: "Game",
    };
  }

  componentDidMount() {}

  handleSelectSceneChange = event => {
    const nameOfSelectedScene = event.target.value;
    this.setState({ activeSceneName: nameOfSelectedScene });
  };

  render() {
    const SelectedScene = this.sceneComponents[this.state.activeSceneName];

    const availableSceneSwitchOptions = availableSceneNames.map(stringToOption);
    return (
      <div className="app">
        <div className="meta-bar">
          <div className="app-name">
            <span className="be">B</span>lood and <span className="be">B</span>u<span className="el">ll</span>ets
          </div>

          <div className="scene-switch">
            <span>Select scene: </span>
            <select value={this.state.activeSceneName} onChange={this.handleSelectSceneChange}>
              {availableSceneSwitchOptions}
            </select>
          </div>
        </div>

        <SelectedScene />
      </div>
    );
  }
}

/**
 * @description
 * Makes a dropdown option out of a given string
 * @param item a string to put into value and innerText
 * @returns an option element with given value and text
 */
export const stringToOption = (item: string): ReactElement => (
  <option key={item} value={item}>
    {item}
  </option>
);

import React from "react";
import { Game } from "./components";
import { BlastZone }  from "screens/BlastZone";
interface AppState {
  loadedScene: string
}
export default class App extends React.Component<void, AppState> {

  scenes:{} = {
    BlastZone,
    Game,
  }
  SelectedScene = null;
  constructor(props: void) {
    super(props);
    this.state = {
      loadedScene: 'Game'
    }
    this.handleChange.bind(this);
  }
  componentDidMount() {
  }

  handleChange(e) {
    // e.target.value;
    console.log(e)
    console.log(e.target)
    console.log(e.target.value)
    const sceneToLoad = e.target.value;
    this.setState(prevState => {return {loadedScene: sceneToLoad}});
  }

  render() {
    let SelectedScene = this.scenes[this.state.loadedScene];
    return <div className="app">
      <div className="meta-bar">
        <div className="screen-switch">
          <span>Select screen: </span>
          <select value={this.state.loadedScene} onChange={(e)=>this.handleChange(e)}>
            <option value="BlastZone">BlastZone</option>
            <option value="Game">Game</option>
          </select>
        </div>
      </div>
      <SelectedScene/>
    </div>
  }
}
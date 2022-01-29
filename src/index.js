import React from "react";
import { render } from "react-dom";
import Game from "./components/Game";
import BlastZone from "./screens/BlastZone";
import App from "./App";

import "./style.scss";

// Rendering the top-level Game component
// render(<Game />, document.getElementById("root"));
render(<App />, document.getElementById("root"));

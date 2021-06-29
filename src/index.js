import React from "react";
import { render } from "react-dom";
import Game from "./components/Game";
import BlastZone from "./screens/BlastZone";

import "./style.scss";

// Rendering the top-level Game component
// render(<Game />, document.getElementById("root"));
render(<BlastZone />, document.getElementById("root"));

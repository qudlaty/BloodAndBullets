import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./style.scss";

// Rendering the top-level App component
// eslint-disable-next-line no-undef

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);

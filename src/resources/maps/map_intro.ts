import { Map, Square } from "services";
import intro from "resources/maps/intro.json";

export const MapIntro: Map = {
  id: "map_intro_001",
  name: "Intro Map",
  description:
    "This is the prototype map for the game. " +
    "This instance is created to ease the transition to the new map format.",
  dimensions: {
    x: 10,
    y: 10,
  },
  squares: intro as unknown as Square[], // Cast to Square[], but this needs rethinking
};

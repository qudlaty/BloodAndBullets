import { SquaresService, Square } from "services/SquaresService";
//import { EntitiesService, Entity } from "services/EntitiesService";
//import { characterDefinitions } from "resources/CharacterDefinitions";

// Importing map resources

import mapA from "resources/maps/mapA.json";
import mapB from "resources/maps/mapB.json";

/**
 * @description
 * Holds ALL the information necessary to display a Map.
 * A `Map` is essentially just a place.
 * Only data about the shape of a location is stored here.
 */
export type Map = {
  id: string;
  name: string;
  description?: string;
  dimensions: {
    x: number;
    y: number;
  };
  squares: Square[]; // Array of squares that make up the map
  // WARNING: These are just raw JSON structures, not instances of Square.
};

/**
 * The `MapService` class is responsible for managing the map's state, loading, and saving maps.
 */
export class MapServiceClass {
  loadedMap: Map;
}

export const MapService = new MapServiceClass();

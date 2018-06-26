import gameObjectsStructure from "./gameObjects";
import { SaveStructureItem } from "../types";
import { SaveGame } from "oni-save-parser";

const saveStructure: SaveStructureItem<SaveGame> = {
  gameObjects: gameObjectsStructure
};
export default saveStructure;

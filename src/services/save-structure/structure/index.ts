import gameObjectsStructure from "./gameObjects";
import { SaveStructureItem } from "../types";
import { SaveGame } from "oni-save-parser";

const saveStructure: SaveStructureItem<SaveGame> = {
  $editor: "save-root",
  $title: (obj: SaveGame) => `${obj.header.gameInfo.baseName} [save file]`,
  gameObjects: gameObjectsStructure
};
export default saveStructure;

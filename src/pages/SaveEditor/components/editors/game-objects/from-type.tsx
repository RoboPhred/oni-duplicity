import { SaveGame } from "oni-save-parser";

import DefaultGameObjectEditor from "./DefaultGameObjectEditor";

import MinionEditor from "./MinionEditor";
import GeyserEditor from "./GeyserEditor";

export function editorFromGameObjectType(
  type: string,
  path: string[],
  saveGame: SaveGame
): React.ComponentType<{}> {
  switch (type) {
    case "minion":
      return MinionEditor;
    case "geyser":
      return GeyserEditor;
  }
  return DefaultGameObjectEditor;
}

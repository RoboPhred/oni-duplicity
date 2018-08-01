import { SaveGame } from "oni-save-parser";

import DefaultGameObjectEditor from "./DefaultGameObjectEditor";

import MinionEditor from "./MinionEditor";

export function editorFromGameObjectType(
  type: string,
  path: string[],
  saveGame: SaveGame
): React.ComponentType<{}> {
  switch (type) {
    case "Minion":
      return MinionEditor;
  }
  return DefaultGameObjectEditor;
}

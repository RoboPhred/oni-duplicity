import { GameObjectBehavior, SaveGame } from "oni-save-parser";

import { get } from "lodash-es";

import { SaveStructureItem } from "@/services/save-structure/types";

export const defaultBehavior: SaveStructureItem<GameObjectBehavior> = {
  $title(behavior: GameObjectBehavior) {
    return behavior.name;
  },

  templateData: {
    $editor: "template-object",
    $editorProps(_: any, path: string[], saveGame: SaveGame) {
      const behavior = get(saveGame, path.slice(0, path.length - 1));
      if (!behavior) {
        return {};
      }
      return {
        templateName: behavior.name
      };
    }
  } as SaveStructureItem<{}>
};

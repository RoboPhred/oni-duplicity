import { GameObjectBehavior, SaveGame } from "oni-save-parser";

import { get, forEach } from "lodash-es";

import { SaveStructureDef } from "../../types";

export const defaultBehavior: SaveStructureDef<GameObjectBehavior> = {
  $uiPathName(behavior: GameObjectBehavior) {
    return behavior.name;
  },

  $uiChildren(behavior: GameObjectBehavior) {
    const children: string[][] = [];
    if (behavior.templateData) {
      forEach(behavior.templateData, (_, key) => {
        children.push(["templateData", key]);
      });
    }
    if (behavior.extraData) {
      children.push(["extraData"]);
    }
    return children.length > 0 ? children : false;
  },

  templateData: {
    $editor: "template-object",
    // TODO: set $editorDeep and pass a TypeInfo object as props.
    //  or have templateObject resolve it with a templateSubPath
    $editorProps(_: any, path: string[], saveGame: SaveGame) {
      // 'gameObjects', '1', 'gameObjects', '6', 'behaviors', '4'
      // 6 items deep
      const behavior = get(saveGame, path.slice(0, 6));
      if (!behavior) {
        return {};
      }
      return {
        templateName: behavior.name
      };
    }
  } as SaveStructureDef<{}>
};

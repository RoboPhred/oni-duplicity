import { GameObjectBehavior, SaveGame } from "oni-save-parser";

import { get, forEach } from "lodash-es";

import { SaveStructureDef } from "../../types";

export const defaultBehavior: SaveStructureDef<GameObjectBehavior> = {
  $uiPathName(behavior: GameObjectBehavior) {
    return behavior.name;
  },

  $uiChildren(behavior: GameObjectBehavior) {
    const children: string[][] = [];
    if (
      behavior.templateData &&
      Object.keys(behavior.templateData).length > 0
    ) {
      // TODO: Enable when template editor is established on templateData '*' children (recursively).
      // forEach(behavior.templateData, (_, key) => {
      //   children.push(["templateData", key]);
      // });
      children.push(["templateData"]);
    }
    if (behavior.extraData) {
      children.push(["extraData"]);
    }
    return children.length > 0 ? children : false;
  },

  $advanced(behavior: GameObjectBehavior) {
    const { templateData, extraData } = behavior;
    const hasTemplateData =
      templateData && Object.keys(templateData).length > 0;
    const hasExtraData = extraData;
    const hasData = hasTemplateData || hasExtraData;
    // We are only 'advanced' (hidden) if we do not have any data to show
    return !hasData;
  },

  templateData: {
    $editor: "template-object",
    $uiPathName: false,

    // TODO: Handle '*' with an object that gets the template editor
    //  set up with the correct template path, and references itself
    //  for its own '*' recursively.

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

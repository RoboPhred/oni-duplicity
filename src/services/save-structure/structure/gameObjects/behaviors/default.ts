import { GameObjectBehavior, SaveGame } from "oni-save-parser";

import { get, forEach, isObject } from "lodash-es";

import { SaveStructureDef } from "../../types";

const defaultTemplateDataObj: SaveStructureDef<{}> = {
  $editor: "template-object",
  $uiPathName: false,

  $uiChildren(value: any) {
    let keys = (isObject(value) && Object.keys(value)) || [];
    keys = keys.filter(x => isObject(value[x]));
    if (keys.length === 0) {
      return false;
    }
    return keys.map(x => [x]);
  },

  $editorProps(_: any, path: string[], saveGame: SaveGame) {
    // 'gameObjects', '1', 'gameObjects', '6', 'behaviors', '4'
    // 6 items deep
    const behavior = get(saveGame, path.slice(0, 6));
    const templatePath = path.slice(7);
    if (!behavior) {
      return {};
    }
    return {
      templateName: behavior.name,
      templatePath,
      valuePathHack: path
    };
  }
};
defaultTemplateDataObj["*"] = defaultTemplateDataObj;

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
      // children.push(["templateData"]);
      forEach(behavior.templateData, (_, key) => {
        if (isObject(behavior.templateData[key])) {
          children.push(["templateData", key]);
        }
      });
    }
    if (behavior.extraData) {
      children.push(["extraData"]);
    }
    return children.length > 0 ? children : false;
  },

  $advanced(behavior: GameObjectBehavior) {
    return true;

    // const { templateData, extraData } = behavior;
    // const hasTemplateData =
    //   templateData && Object.keys(templateData).length > 0;
    // const hasExtraData = extraData != null;
    // const hasData = hasTemplateData || hasExtraData;
    // // We are only 'advanced' (hidden) if we do not have any data to show
    // return !hasData;
  },

  $editor: "template-object",
  $editorProps(_: any, path: string[], saveGame: SaveGame) {
    // 'gameObjects', '1', 'gameObjects', '6', 'behaviors', '4'
    // 6 items deep
    const behavior = get(saveGame, path);
    if (!behavior) {
      return {};
    }
    return {
      templateName: behavior.name,
      templatePath: [],
      valuePathHack: [...path, "templateData"]
    };
  },

  templateData: {
    $uiPathName: false,

    "*": defaultTemplateDataObj

    // TODO: Handle '*' with an object that gets the template editor
    //  set up with the correct template path, and references itself
    //  for its own '*' recursively.
  } as SaveStructureDef<{}>
};

import {
  GameObjectBehavior,
  SaveGame,
  getTypeCode,
  SerializationTypeCode,
  TypeTemplate,
  TypeInfo,
  LIST_TYPES
} from "oni-save-parser";

import { get, forEach, isObject } from "lodash-es";

import { getLastSaveItemOfType } from "../../../utils";

import { SaveStructureDef } from "../../types";

const defaultBehaviorTemplateDataObj: SaveStructureDef<{}> = {
  $type: "template-object",
  $subType(_: any, path: string[], saveGame: SaveGame) {
    const found = getLastSaveItemOfType("template-object", path, saveGame);
    if (!found) {
      return null;
    }

    const { templates } = saveGame;

    // Check that the template exists
    let template: TypeTemplate | undefined = templates.find(
      x => x.name === found.item.name
    );
    if (!template) {
      return null;
    }

    // +1 for templateData
    const subPath = path.slice(found.path.length + 1);

    // Chase the path up the template to see if we have entered
    //  any sub-templates.

    for (let i = 0; i < subPath.length; i++) {
      const part = subPath[i];

      const member =
        template.fields.find(x => x.name === part) ||
        template.properties.find(x => x.name === part);
      if (!member) {
        break;
      }

      const typeInfo: TypeInfo = member.type;
      const code = getTypeCode(typeInfo.info);

      if (code === SerializationTypeCode.UserDefined) {
        template = templates.find(x => x.name === typeInfo.templateName);
        if (template == null) {
          // Unknown template.
          return null;
        }
      } else if (LIST_TYPES.indexOf(code) !== -1) {
        i++;

        if (
          getTypeCode(typeInfo.subTypes![0].info) ===
          SerializationTypeCode.UserDefined
        ) {
          const arrayTypeInfo = typeInfo.subTypes![0];
          template = templates.find(x => x.name === arrayTypeInfo.templateName);
          if (template == null) {
            // Unknown template.
            return null;
          }
        }
      } else if (code === SerializationTypeCode.Dictionary) {
        i++;
        if (
          getTypeCode(typeInfo.subTypes![1].info) ===
          SerializationTypeCode.UserDefined
        ) {
          const arrayTypeInfo = typeInfo.subTypes![1];
          template = templates.find(x => x.name === arrayTypeInfo.templateName);
          if (template == null) {
            // Unknown template.
            return null;
          }
        }
      }
    }

    return template.name;
  },

  $uiPathName: false,

  $uiChildren(value: any) {
    let keys = (isObject(value) && Object.keys(value)) || [];
    keys = keys.filter(x => isObject(value[x]));
    if (keys.length === 0) {
      return false;
    }
    return keys.map(x => [x]);
  }
};
defaultBehaviorTemplateDataObj["*"] = defaultBehaviorTemplateDataObj;

export const defaultBehavior: SaveStructureDef<GameObjectBehavior> = {
  $type: "game-object-behavior",
  $subType(value: GameObjectBehavior) {
    return value.name;
  },

  $advanced: true,

  $uiPathName(behavior: GameObjectBehavior) {
    return behavior.name;
  },

  $uiChildren(behavior: GameObjectBehavior) {
    const children: string[][] = [];
    if (
      behavior.templateData &&
      Object.keys(behavior.templateData).length > 0
    ) {
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

  templateData: {
    $uiPathName: false,
    $type: "template-object",
    $subType(_: any, path: string[], saveGame: SaveGame) {
      const gameObject = get(
        saveGame,
        path[path.length - 2]
      ) as GameObjectBehavior;
      return gameObject ? gameObject.name : null;
    },

    "*": defaultBehaviorTemplateDataObj

    // TODO: Handle '*' with an object that gets the template editor
    //  set up with the correct template path, and references itself
    //  for its own '*' recursively.
  } as SaveStructureDef<{}>
};

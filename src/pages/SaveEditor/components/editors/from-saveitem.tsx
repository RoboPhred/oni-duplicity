import * as React from "react";

import { SaveGame } from "oni-save-parser";

import { getSaveItemType } from "@/services/save-structure";

import { editorFromGameObjectType } from "./game-objects";

import DefaultObjectEditor from "./DefaultObjectEditor";
import DefaultGameObjectEditor from "./game-objects/DefaultGameObjectEditor";

import SaveRootEditor from "./SaveRootEditor";
import TemplateObjectEditor from "./TemplateObjectEditor";
import GameObjectGroupList from "./GameObjectGroupList";
import GameObjectList from "./GameObjectList";

export function editorFromSaveItem(
  path: string[],
  saveGame: SaveGame
): React.ComponentType<{}> {
  const itemType = getSaveItemType(path, saveGame);
  if (itemType == null) {
    return DefaultObjectEditor;
  }
  switch (itemType.type) {
    case "save-root":
      return SaveRootEditor;
    case "template-object":
      return itemType.subType
        ? () => <TemplateObjectEditor templateName={itemType.subType!} />
        : DefaultObjectEditor;
    case "game-object-group-list":
      return GameObjectGroupList;
    case "game-object-group":
      return GameObjectList;
    case "game-object-list":
      return () => <GameObjectList isFlatList={true} />;
    case "game-object":
      return (
        (itemType.subType &&
          editorFromGameObjectType(itemType.subType, path, saveGame)) ||
        DefaultGameObjectEditor
      );
    case "game-object-behavior":
      return itemType.subType
        ? () => <TemplateObjectEditor templateName={itemType.subType!} />
        : DefaultObjectEditor;
  }

  return DefaultObjectEditor;
}

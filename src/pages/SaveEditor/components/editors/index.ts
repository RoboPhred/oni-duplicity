import DefaultObjectEditor from "./DefaultObjectEditor";

import SaveRootEditor from "./SaveRootEditor";
import TemplateObjectEditor from "./TemplateObjectEditor";
import GameObjectGroupList from "./GameObjectGroupList";
import GameObjectList from "./GameObjectList";

import DefaultGameObjectEditor from "./game-objects/DefaultGameObjectEditor";
import MinionEditor from "./game-objects/MinionEditor";
import GeyserEditor from "./game-objects/GeyserEditor";

const editors: Record<string, React.ComponentClass<any>> = {
  "save-root": SaveRootEditor,
  "game-object-group-list": GameObjectGroupList,
  "game-object-list": GameObjectList,
  "template-object": TemplateObjectEditor,
  "game-object-default": DefaultGameObjectEditor,
  "game-object-minion": MinionEditor,
  "game-object-geyser": GeyserEditor
};

export function getEditor(
  editorType: string | null
): React.ComponentClass<any> {
  if (!editorType) {
    return DefaultObjectEditor;
  }

  return editors[editorType] || DefaultObjectEditor;
}

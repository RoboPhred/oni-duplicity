import DefaultObjectEditor from "./DefaultObjectEditor";

import SaveRootEditor from "./SaveRootEditor";
import TemplateObjectEditor from "./TemplateObjectEditor";
import GameObjectGroupList from "./GameObjectGroupList";
import GameObjectList from "./GameObjectList";
import GameObjectEditor from "./GameObjectEditor";
import DuplicantEditor from "./DuplicantEditor";

const editors: Record<string, React.ComponentClass<any>> = {
  "save-root": SaveRootEditor,
  "game-object-group-list": GameObjectGroupList,
  "game-object-list": GameObjectList,
  "template-object": TemplateObjectEditor,
  "game-object-default": GameObjectEditor,
  "game-object-minion": DuplicantEditor
};

export function getEditor(
  editorType: string | null
): React.ComponentClass<any> {
  if (!editorType) {
    return DefaultObjectEditor;
  }

  return editors[editorType] || DefaultObjectEditor;
}

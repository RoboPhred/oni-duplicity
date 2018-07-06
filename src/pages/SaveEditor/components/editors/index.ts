import DefaultObjectEditor from "./DefaultObjectEditor";

import DuplicantEditor from "./DuplicantEditor";
import GameObjectGroupList from "./GameObjectGroupList";
import GameObjectList from "./GameObjectList";
import SaveRootEditor from "./SaveRootEditor";
import TemplateObjectEditor from "./TemplateObjectEditor";

const editors: Record<string, React.ComponentClass<any>> = {
  "save-root": SaveRootEditor,
  "game-object-group-list": GameObjectGroupList,
  "game-object-list": GameObjectList,
  "template-object": TemplateObjectEditor,
  minion: DuplicantEditor
};

export function getEditor(
  editorType: string | null
): React.ComponentClass<any> {
  if (!editorType) {
    return DefaultObjectEditor;
  }

  return editors[editorType] || DefaultObjectEditor;
}

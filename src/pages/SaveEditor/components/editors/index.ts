import DefaultObjectEditor from "./DefaultObjectEditor";

import DuplicantEditor from "./DuplicantEditor";
import GameObjectGroupsEditor from "./GameObjectGroupsEditor";
import SaveRootEditor from "./SaveRootEditor";
import TemplateObjectEditor from "./TemplateObjectEditor";

const editors: Record<string, React.ComponentClass<any>> = {
  "save-root": SaveRootEditor,
  "game-object-groups": GameObjectGroupsEditor,
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

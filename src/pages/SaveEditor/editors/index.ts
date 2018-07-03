import DefaultObjectEditor from "./DefaultObjectEditor";

import SaveRootEditor from "./SaveRootEditor";
import DuplicantEditor from "./DuplicantEditor";

const editors: Record<string, React.ComponentClass> = {
  "save-root": SaveRootEditor,
  minion: DuplicantEditor
};

export function getEditor(editorType: string | null): React.ComponentClass {
  if (!editorType) {
    return DefaultObjectEditor;
  }

  return editors[editorType] || DefaultObjectEditor;
}

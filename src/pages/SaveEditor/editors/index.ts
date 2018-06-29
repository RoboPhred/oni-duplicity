import DefaultObjectEditor from "./DefaultObjectEditor";

import SaveRootEditor from "./SaveRootEditor";

const editors: Record<string, React.ComponentClass> = {
  "save-root": SaveRootEditor
};

export function getEditor(editorType: string | null): React.ComponentClass {
  if (!editorType) {
    return DefaultObjectEditor;
  }

  return editors[editorType] || DefaultObjectEditor;
}

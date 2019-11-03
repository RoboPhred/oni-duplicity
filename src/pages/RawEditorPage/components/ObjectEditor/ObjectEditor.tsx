import * as React from "react";
import { get } from "lodash";
import { SaveGame } from "oni-save-parser";

import { getSegmentEditor } from "../../editor-data";

import Editors from "../FieldEditor";

export interface ObjectEditorProps {
  saveGame: SaveGame;
  path: string[];
}

const ObjectEditor: React.FC<ObjectEditorProps> = ({ saveGame, path }) => {
  const target = path.length > 0 ? get(saveGame, path) : saveGame;
  const editors: Record<string, string> = React.useMemo(
    () =>
      Object.keys(target).reduce(
        (obj, key) => {
          const editor = getSegmentEditor(saveGame, [...path, key]);
          if (editor) {
            obj[key] = editor;
          }
          return obj;
        },
        {} as Record<string, string>
      ),
    [target]
  );

  const editorFields = Object.keys(editors)
    .sort()
    .map(key => {
      const editorType = editors[key];
      if (editorType === "undefined") {
        return null;
      }
      const EditorField = Editors[editorType];
      if (!EditorField) {
        return (
          <div key={key}>
            {`${key}: No editor available for type ${editorType}.`}
          </div>
        );
      }
      return (
        <div key={key}>
          <EditorField path={[...path, key]} />
        </div>
      );
    }).filter(x => x != null);

  return <div>{editorFields}</div>;
};

export default ObjectEditor;

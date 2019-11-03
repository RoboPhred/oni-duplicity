import * as React from "react";
import { last } from "lodash";

import CommitTextField from "@/components/CommitTextField";

import { UnconnectedEditorProps } from "../EditorProps";

const TextFieldEditor: React.FC<UnconnectedEditorProps> = ({
  path,
  value,
  onValueChanged
}) => {
  const label = last(path)!;
  return (
    <CommitTextField
      label={label}
      value={String(value)}
      onCommit={onValueChanged}
    />
  );
};

export default TextFieldEditor;

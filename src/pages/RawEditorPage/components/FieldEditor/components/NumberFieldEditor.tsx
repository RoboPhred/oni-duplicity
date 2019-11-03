import * as React from "react";
import { last } from "lodash";

import CommitTextField from "@/components/CommitTextField";

import { UnconnectedEditorProps } from "../EditorProps";

const NumberFieldEditor: React.FC<UnconnectedEditorProps> = ({
  path,
  value,
  onValueChanged
}) => {
  const label = last(path)!;
  return (
    <CommitTextField
      type="number"
      label={label}
      value={String(value)}
      onCommit={onValueChanged}
    />
  );
};

export default NumberFieldEditor;

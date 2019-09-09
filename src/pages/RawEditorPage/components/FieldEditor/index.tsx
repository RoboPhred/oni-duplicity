import * as React from "react";

import TextFieldEditor from "./components/TextFieldEditor";
import NumberFieldEditor from "./components/NumberFieldEditor";

import connectEditor from "./editor-connector";
import { EditorProps } from "./EditorProps";

const Editors: Record<string, React.ComponentType<EditorProps>> = {
  string: connectEditor(TextFieldEditor),
  number: connectEditor(NumberFieldEditor)
};

export default Editors;

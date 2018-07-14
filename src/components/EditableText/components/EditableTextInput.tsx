import styled from "@/theme";

import { TextCssProps, text } from "@/theme";

export type EditableTextProps = TextCssProps;
const EditableTextInput = styled<EditableTextProps, "input">("input")`
  ${text};
  font-size: inherit;
  background: none;
  border: none;
`;
EditableTextInput.displayName = "EditableTextInput";
export default EditableTextInput;

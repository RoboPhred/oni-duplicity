import styled from "@/style";

import { TextCssProps, text } from "@/style";

export type EditableTextProps = TextCssProps;
const EditableTextInput = styled<EditableTextProps, "input">("input")`
  ${text};
  font-size: inherit;
  background: none;
  border: none;
`;
EditableTextInput.displayName = "EditableTextInput";
export default EditableTextInput;

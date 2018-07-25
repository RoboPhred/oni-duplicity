import styled from "@/style";

import { TextProps, text } from "@/style";

export type EditableTextProps = TextProps;
const EditableTextInput = styled<EditableTextProps, "input">("input")`
  ${text};
  font-size: inherit;
  background: none;
  border: none;
`;
EditableTextInput.displayName = "EditableTextInput";
export default EditableTextInput;

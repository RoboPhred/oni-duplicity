import styled from "styled-components";

import { TextProps as ThemeTextProps, text } from "@/theme";

export type TextProps = ThemeTextProps;
const EditableTextInput = styled<TextProps, "input">("input")`
  ${text};
  font-size: inherit;
  background: none;
  border: none;
`;
EditableTextInput.displayName = "EditableTextInput";
export default EditableTextInput;

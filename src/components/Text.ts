import styled from "styled-components";

import { TextProps as ThemeTextProps, text } from "@/theme";

export type TextProps = ThemeTextProps;
const Text = styled<TextProps, "span">("span")`
  ${text};
`;
Text.displayName = "Text";
export default Text;

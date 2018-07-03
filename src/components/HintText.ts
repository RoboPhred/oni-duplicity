import styled from "styled-components";

import { Intent, TextProps as ThemeTextProps, text, getTheme } from "@/theme";

export type TextProps = ThemeTextProps;
const HintText = styled<TextProps, "span">("span")`
  ${text};
  font-size: ${props => getTheme(props).fontSizes[0]}px;
`;
HintText.displayName = "HintText";
HintText.defaultProps = {
  intent: Intent.Hint
} as TextProps;
export default HintText;

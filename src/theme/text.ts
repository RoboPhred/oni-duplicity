import * as CSS from "csstype";
import { css } from "styled-components";
import { Intent, getTheme } from "./theme";

export interface TextProps {
  intent?: Intent;
  wordWrap?: CSS.WordWrapProperty;
  wordBreak?: CSS.WordBreakProperty;
}

export const text = css<TextProps>`
  color: ${props => getTheme(props).colors.intent[props.intent || "default"]};
  word-wrap: ${props => props.wordWrap || "inherit"};
  word-break: ${props => props.wordBreak || "inherit"};
`;

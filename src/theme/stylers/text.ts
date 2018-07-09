import * as CSS from "csstype";

import { css } from "../styled";

import { IntentColorProps, intentColor } from "./intent-color";

export interface TextProps extends IntentColorProps {
  wordWrap?: CSS.WordWrapProperty;
  wordBreak?: CSS.WordBreakProperty;
}

export const text = css<TextProps>`
  ${intentColor};
  word-wrap: ${props => props.wordWrap || "inherit"};
  word-break: ${props => props.wordBreak || "inherit"};
`;

import { css } from "styled-components";

import { Intent, getTheme } from "./theme";

import { TextProps, text } from "./text";

export interface LinkProps extends TextProps {}

export const link = css<LinkProps>`
  ${text};
  text-decoration: underline;
  cursor: pointer;
`;

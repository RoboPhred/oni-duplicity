import { TextProps, text } from "./text";
import { css } from "../styled";

export interface LinkProps extends TextProps {}

export const link = css<LinkProps>`
  ${text};
  text-decoration: underline;
  cursor: pointer;
`;

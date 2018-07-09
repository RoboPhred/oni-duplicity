import { css } from "../styled";
import { TextProps, text } from "./text";

export interface LinkProps extends TextProps {}

export const link = css<LinkProps>`
  ${text};
  text-decoration: underline;
  cursor: pointer;
`;

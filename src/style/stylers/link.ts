import { css } from "@/style/styled";
import { TextCssProps, text } from "@/style/stylers/text";

export interface LinkProps extends TextCssProps {}

export const link = css<LinkProps>`
  ${text};
  text-decoration: underline;
  cursor: pointer;
`;

import { css } from "@/theme/styled";
import { TextCssProps, text } from "@/theme/stylers/text";

export interface LinkProps extends TextCssProps {}

export const link = css<LinkProps>`
  ${text};
  text-decoration: underline;
  cursor: pointer;
`;

import { TextProps, text, css } from "@/style";

export interface LinkProps extends TextProps {}

export const link = css<LinkProps>`
  ${text};
  text-decoration: underline;
  cursor: pointer;
`;

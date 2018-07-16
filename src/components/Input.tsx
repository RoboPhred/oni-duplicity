import { WidthProps, width } from "styled-system";

import styled, { TextCssProps, getTheme, text, css } from "@/theme";

// Note: Should extend TextCssProps, but doing so causes some odd typing issues
//  Props will somehow demand but refuse 'ref'
export interface InputStyleProps extends TextCssProps, WidthProps {}

export const inputStyle = css<InputStyleProps>`
  ${text};
  ${width};
  padding: 2px;
  background-color: ${props => getTheme(props).colors.bg.panel};
  border: ${props => getTheme(props).borders[1]};
  border-color: ${props => getTheme(props).colors.intent.secondary};
  &:focus {
    border-color: ${props => getTheme(props).colors.intent.primary};
    outline: none;
  }
  &:invalid {
    border-color: ${props => getTheme(props).colors.intent.dangerous};
  }
`;

const Input = styled<InputStyleProps, "input">("input")`
  ${inputStyle};
`;
Input.displayName = "Input";

export type InputProps = StyledComponentProps<typeof Input>;
export default Input;

import * as React from "react";

import styled, { Space, FontSize, Radius } from "@/style";

import { Intent, getTheme, intentFill } from "@/style";

export interface ButtonProps {
  intent?: Intent;
  onClick?(e: React.MouseEvent<HTMLDivElement>): void;
}

const Button = styled<ButtonProps, "button">("button")`
  ${intentFill};
  border: none;
  border-radius: ${props => getTheme(props).radii[Radius.Button]}px;
  margin: ${props => getTheme(props).space[Space.Small]}px;
  font-size: ${props => getTheme(props).fontSizes[FontSize.Button]}px;
`;
Button.displayName = "Button";
export default Button;

import * as React from "react";

import styled from "styled-components";

import { Intent, getTheme, intentFill } from "@/theme";

export interface ButtonProps {
  intent?: Intent;
  onClick?(e: React.MouseEvent<HTMLDivElement>): void;
}

const Button = styled<ButtonProps, "button">("button")`
  ${intentFill};
  border: none;
  border-radius: ${props => getTheme(props).radii[1]}px;
  margin: ${props => getTheme(props).space[1]}px;
  font-size: ${props => getTheme(props).fontSizes[1]}px;
`;
Button.displayName = "Button";
export default Button;

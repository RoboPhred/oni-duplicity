import * as React from "react";

import styled from "styled-components";

import { Intent, getTheme } from "@/theme";

export interface ButtonProps {
  intent?: Intent;
  onClick?(e: React.MouseEvent<HTMLDivElement>): void;
}

/* border: ${props => getTheme(props).borders[1]}; */
const Button = styled<ButtonProps, "button">("button")`
  border: none;
  border-radius: ${props => getTheme(props).radii[1]}px;
  margin: ${props => getTheme(props).space[1]}px;
  font-size: ${props => getTheme(props).fontSizes[1]}px;
  color: ${props =>
    getTheme(props).colors.textIntent[props.intent || "default"]};
  background-color: ${props =>
    getTheme(props).colors.intent[props.intent || "default"]};
`;
Button.displayName = "Button";
export default Button;
